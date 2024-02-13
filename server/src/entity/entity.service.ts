import { Injectable } from '@nestjs/common';
import { BlobOptions } from 'buffer';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import {
  SQL_FILE,
  SQL_IMAGE_PRODUCT,
  SQL_OTP,
  SQL_PRODUCT,
  SQL_MANAGER_USERS,
  SQL_USER,
  SQL_WAGES_PRODUCT,
  SQL_WAGES_TYPE,
  SQL_COLOR_TYPE,
  SQL_UNIT_TYPE,
  SQL_METAL_TYPE,
  SQL_CATEGORY_TYPE,
  SQL_PRODUCT_TYPE,
  SQL_ROLE_TYPE,
  SQL_WAGES_METAL,
  SQL_FILE_TYPE,
} from './entity.interface';
import { HostConst } from 'src/common/constance';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from 'src/common/entities/otp.entity';
import { Repository } from 'typeorm';
import {
  IUpdateImageProduct,
  IUpdateProduct,
  IUpdateWages,
} from 'src/users/users.interface';

@Injectable()
export class EntityService {
  constructor(@InjectClient() private readonly connection: Connection) {}

  /*------- OTP -------*/

  async findOneOtp(
    mobile: string,
    mobile_code: string,
  ): Promise<false | SQL_OTP> {
    const query = `
      SELECT *
      FROM OTP
      WHERE OTP.mobile = ${mobile} AND OTP.mobile_code = ${mobile_code}
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async insertOtp(
    mobile: string,
    mobile_code: string,
    otp_code: string,
  ): Promise<boolean> {
    const query = `
      INSERT INTO talajalali.otp (mobile, mobile_code, otp, expires) 
      VALUES (${mobile}, ${mobile_code}, ${otp_code}, DEFAULT)
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.affectedRows) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async updateOtp(
    mobile: string,
    mobile_code: string,
    otp_code: string,
  ): Promise<boolean> {
    const query = `
      UPDATE OTP
      SET OTP.otp = ${otp_code}
      WHERE OTP.mobile_code = ${mobile_code} AND OTP.mobile = ${mobile}
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.changedRows) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async setUsedOtp(mobile: string, mobile_code: string, isUsed: number = 1) {
    const query = `
    UPDATE OTP
    SET OTP.isUsed = ${isUsed}
    WHERE OTP.mobile_code = ${mobile_code} AND OTP.mobile = ${mobile}
  `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.changedRows) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  /*------- USER -------*/

  async findUserByMobile(
    mobile: string,
    mobile_code: string,
    showCol: Array<keyof SQL_USER> = [],
  ): Promise<false | SQL_USER> {
    const query = `
    SELECT user.user_id, mobile, mobile_code, family, password, birth_date, city_code, address, email, CONCAT(domain, path) AS path, user.name, mime_type, file_type, role_type
    FROM user
    JOIN file ON file.file_id = user.profile
    JOIN file_type ON file.file_type_id = file_type.file_type_id
    JOIN user_role ON user.user_id = user_role.user_id
    JOIN role_type ON user_role.role_type_id = role_type.role_type_id
    WHERE user.mobile = ${mobile} AND user.mobile_code = ${mobile_code}
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) {
        const manager = await this.findUserManagerById(res[0][0].user_id);
        res[0][0] = { ...res[0][0], manager };
        if (showCol.length === 0) return res[0][0];
        for (let i in showCol) {
          delete res[0][0]?.[showCol[i]];
        }
        return res[0][0];
      }
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async findUserManagerById(
    user_id: number,
    showCol: Array<keyof SQL_MANAGER_USERS> = [],
  ): Promise<false | SQL_MANAGER_USERS[]> {
    const query = `
    SELECT responsibility, manager_type
    FROM user_manager
    JOIN manager_type ON user_manager.manager_type_id = manager_type.manager_type_id
    WHERE user_id = ${user_id}
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) {
        if (showCol.length === 0) return res[0];
        for (let j in res[0]) {
          for (let i in showCol) {
            delete res[0][j]?.[showCol[i]];
          }
        }
        return res[0];
      }
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async insertUser(
    mobile: string,
    mobile_code: string,
    name: string,
    family: string,
    password: string,
  ): Promise<boolean> {
    const query = `
    INSERT INTO talajalali.user (mobile, mobile_code, name, family, password, profile) 
    VALUES (${mobile}, ${mobile_code}, "${name}", "${family}", "${password}", 1)
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.affectedRows) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async findRoleTypeById(id: number): Promise<false | SQL_ROLE_TYPE> {
    const query = `
    SELECT *
    FROM role_type
    WHERE role_type_id = ${id}
  `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  /*------- FILE -------*/

  async findFile(
    name: string,
    path: string,
    domain: string,
    file_type_id: number,
  ): Promise<SQL_FILE | false> {
    const query = `
    SELECT name, CONCAT(domain, path) AS path, mime_type, file_type
    FROM file
    JOIN file_type ON file.file_type_id = file_type.file_type_id
    WHERE file.name = "${name}" AND file.path = "${path}" AND file.domain = "${domain}" AND file.file_type_id = ${file_type_id}
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async findImages(
    showCol: Array<keyof SQL_FILE> = [],
  ): Promise<SQL_FILE[] | false> {
    let query: string = '';
    query = 
    `SELECT name, CONCAT(domain, path) AS path, mime_type, file_type, file_id
     FROM file
     JOIN file_type
     WHERE file.file_type_id = file_type.file_type_id 
      AND file_type.file_type = "image"
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) {
        if (showCol.length === 0) return res[0];
        for (let i in showCol) {
          delete res[0][0]?.[showCol[i]];
        }
        return res[0][0];
      }
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async findImageById(id: number) {
    const query = 
    `SELECT name, CONCAT(domain, path) AS path, mime_type, file_type, file_id
     FROM file
     JOIN file_type ON file.file_type_id = file_type.file_type_id 
     WHERE file_type.file_type = "image" AND file.file_id = ${id}
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async findFileTypeById(id: number): Promise<false | SQL_FILE_TYPE> {
    const query = `SELECT *
     FROM file_type
     WHERE file_type.file_type_id = ${id}
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async insertFile(
    name: string,
    path: string,
    domain: string,
    file_type_id: number,
  ): Promise<boolean> {
    const query = `
    INSERT INTO file (name, path, domain, file_type_id) 
    VALUES ("${name}", "${path}", "${domain}", ${file_type_id})
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.affectedRows) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  /*------- PRODUCT -------*/

  async findProductById(
    id: number,
    showCol: Array<keyof SQL_PRODUCT> = [],
  ): Promise<SQL_PRODUCT | false> {
    const query = `
      SELECT product_id, weight, coefficient_variation, title, meta_description, description, isAvailable, can_order, metal_type, product_type, category_type
      FROM product
      JOIN metal_type
      JOIN product_type
      JOIN category_type
      WHERE product.product_id = ${id}
        AND product.metal_type_id = metal_type.metal_type_id
        AND product.product_type_id = product_type.product_type_id
        AND product.category_type_id = category_type.category_type_id
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) {
        if (showCol.length === 0) return res[0][0];
        for (let i in showCol) {
          delete res[0][0]?.[showCol[i]];
        }
        return res[0][0];
      }
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async findAllProducts(
    limit: number,
    from: number,
    showCol: Array<keyof SQL_PRODUCT> = [],
  ): Promise<SQL_PRODUCT[] | false> {
    const query = `
      SELECT product_id, weight, coefficient_variation, title, meta_description, description, isAvailable, can_order, metal_type, product_type, category_type
      FROM product
      JOIN metal_type
      JOIN product_type
      JOIN category_type
      WHERE product.metal_type_id = metal_type.metal_type_id
        AND product.product_type_id = product_type.product_type_id
        AND product.category_type_id = category_type.category_type_id
      LIMIT ${from}, ${limit}
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) {
        if (showCol.length === 0) return res[0];
        for (let i in showCol) {
          delete res[0]?.[showCol[i]];
        }
        return res[0];
      }
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async findWagesProductById(
    id: number,
    role?: string,
    showCol: Array<keyof SQL_WAGES_PRODUCT> = [],
  ) {
    const query = role
      ? `
      SELECT name, family, wages, wages_type, role_type
      FROM wages_metal
      JOIN wages_type ON wages_metal.wages_type_id = wages_type.wages_type_id
      JOIN user ON wages_metal.user_id = user.user_id
      JOIN role_type ON wages_metal.for_role = role_type.role_type_id
      WHERE wages_metal.product_id = ${id} AND role_type = "${role}"
      `
      : `
      SELECT name, family, wages, wages_type, role_type
      FROM wages_metal
      JOIN wages_type ON wages_metal.wages_type_id = wages_type.wages_type_id
      JOIN user ON wages_metal.user_id = user.user_id
      JOIN role_type ON wages_metal.for_role = role_type.role_type_id
      WHERE wages_metal.product_id = ${id}
      `;

    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) {
        if (showCol.length === 0) return res[0];
        for (let j in res[0]) {
          for (let i in showCol) {
            delete res[0][j]?.[showCol[i]];
          }
        }
        return res[0];
      }
      return false;
    } catch (error) {
      console.log(2);
      console.log(error.message);
      return false;
    }
  }

  async findCommentProductById(id: number) {}

  async findProductTypeById(id: number): Promise<false | SQL_PRODUCT_TYPE> {
    const query = `
    SELECT *
    FROM product_type
    WHERE product_type_id = ${id}
  `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async insertProduct(
    category_type_id: number,
    weight: number,
    coefficient_variation: number,
    title: string,
    meta_description: string,
    description: string,
    isAvailable: number,
    can_order: number,
    product_type_id: number,
    metal_type_id: number,
  ): Promise<false | number> {
    const query = `
    INSERT INTO product (category_type_id, weight, coefficient_variation, title, meta_description, description, isAvailable, can_order, product_type_id, metal_type_id) 
    VALUES (${category_type_id}, ${weight}, ${coefficient_variation}, "${title}", "${meta_description}", "${description}", ${isAvailable}, ${can_order}, ${product_type_id}, ${metal_type_id})
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.affectedRows) return res[0].insertId;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async insertImageProduct(
    product_id: number,
    file_id: number,
    color_type_id: number,
    unit_type_id: number,
    size_x?: number,
    size_y?: number,
  ): Promise<boolean> {
    let query: string = '';
    if (size_x && size_y)
      query = `
      INSERT INTO image_product (product_id, file_id, color_type_id, unit_type_id, size_x, size_y) 
      VALUES (${product_id}, ${file_id}, ${color_type_id}, ${unit_type_id}, ${size_x}, ${size_y})
      `;
    else if (size_x && !size_y)
      query = `
      INSERT INTO image_product (product_id, file_id, color_type_id, unit_type_id, size_x) 
      VALUES (${product_id}, ${file_id}, ${color_type_id}, ${unit_type_id}, ${size_x})
      `;
    else if (!size_x && size_y)
      query = `
      INSERT INTO image_product (product_id, file_id, color_type_id, unit_type_id, size_y) 
      VALUES (${product_id}, ${file_id}, ${color_type_id}, ${unit_type_id}, ${size_y})
      `;
    else if (!size_x && !size_y)
      query = `
      INSERT INTO image_product (product_id, file_id, color_type_id, unit_type_id) 
      VALUES (${product_id}, ${file_id}, ${color_type_id}, ${unit_type_id})
      `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.affectedRows) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async deleteProductById(id: number): Promise<boolean> {
    const query = `
      DELETE FROM product
      WHERE product.product_id = ${id}
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async findCountProducts(): Promise<number | false> {
    const query = `
      SELECT COUNT(*) AS count
      FROM product
    `;
    try {
      const res = await this.connection.query(query);
      return res[0][0]?.count;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async updateProduct(data: IUpdateProduct): Promise<boolean> {
    const { product_id, ...options } = data;
    let setQuery = '';
    for (let i in options) {
      setQuery += `${i} = "${options[i]}", `;
    }
    setQuery = setQuery.slice(0, -2);
    const query = `UPDATE product
                   SET ${setQuery}
                   WHERE  product_id = ${product_id}`;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.affectedRows > 0) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  /*------- CATEGORY -------*/

  async findCategoryTypeById(id: number): Promise<false | SQL_CATEGORY_TYPE> {
    const query = `
    SELECT *
    FROM category_type
    WHERE category_type_id = ${id}
  `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  /*------- METAL -------*/

  async findMetalTypeById(id: number): Promise<false | SQL_METAL_TYPE> {
    const query = `
    SELECT *
    FROM metal_type
    WHERE metal_type_id = ${id}
  `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  /*------- UNIT -------*/

  async findUnitTypeById(id: number): Promise<false | SQL_UNIT_TYPE> {
    const query = `
    SELECT *
    FROM unit_type
    WHERE unit_type_id = ${id}
  `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  /*------- WAGES -------*/

  async findWagesMetalById(
    user_id: number,
    product_id: number,
    for_role: number,
    wages_type_id: number,
  ): Promise<false | SQL_WAGES_METAL> {
    const query = `
    SELECT *
    FROM wages_metal
    WHERE user_id = ${user_id} AND product_id = ${product_id} AND for_role = ${for_role} AND wages_type_id = ${wages_type_id}
  `;
    try {
      const res = await this.connection.query(query);
      console.log(res[0]);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async findWagesTypeById(id: number): Promise<false | SQL_WAGES_TYPE> {
    const query = `
    SELECT *
    FROM wages_type
    WHERE wages_type_id = ${id}
  `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async insertWagesMetal(
    product_id: number,
    wages_type_id: number,
    user_id: number,
    wages: number,
    for_role: number,
  ): Promise<boolean> {
    const query = `
    INSERT INTO wages_metal (product_id, wages_type_id, user_id, wages, for_role) 
    VALUES (${product_id}, ${wages_type_id}, ${user_id}, ${wages}, ${for_role})
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.affectedRows) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async updateWage(data: IUpdateWages, userId: number): Promise<boolean> {
    const { product_id, for_role, ...options } = data;
    let setQuery = '';
    for (let i in options) {
      setQuery += `${i} = "${options[i]}", `;
    }
    setQuery = setQuery.slice(0, -2);
    const query = `UPDATE wages_metal
                   SET ${setQuery}
                   WHERE  product_id = ${product_id} AND user_id = ${userId} AND for_role = ${for_role}`;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.affectedRows > 0) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async deleteWagesProductById(
    user_id: number,
    for_role: number,
    product_id: number,
    wages_type_id: number,
  ): Promise<boolean> {
    const query = `DELETE FROM wages_metal
     WHERE user_id = ${user_id}
      AND for_role = ${for_role}
      AND product_id = ${product_id}
      AND wages_type_id = ${wages_type_id}
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.affectedRows > 0) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  /*------- COLOR -------*/

  async findColorTypeById(id: number): Promise<false | SQL_COLOR_TYPE> {
    const query = `
    SELECT *
    FROM color_type
    WHERE color_type_id = ${id}
  `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  /*------- IMAGE PRODUCT -------*/

  async findImageProductById(
    product_id: number,
    file_id: number,
    color_type_id: number,
    unit_type_id: number,
    size_x?: number,
    size_y?: number,
  ): Promise<SQL_IMAGE_PRODUCT[] | false> {
    let query = '';
    if (!!size_x && !!size_y) {
      query = `SELECT *
              FROM image_product
              WHERE product_id = ${product_id} 
              AND file_id = ${file_id}
              AND color_type_id = ${color_type_id}
              AND unit_type_id = ${unit_type_id}
              AND size_x = ${size_x}
              AND size_y = ${size_y}
              `;
    } else if (!!!size_x && !!size_y) {
      query = `SELECT *
              FROM image_product
              WHERE product_id = ${product_id} 
              AND file_id = ${file_id}
              AND color_type_id = ${color_type_id}
              AND unit_type_id = ${unit_type_id}
              AND size_x IS NULL
              AND size_y = ${size_y}
              `;
    } else if (!!size_x && !!!size_y) {
      query = `SELECT *
              FROM image_product
              WHERE product_id = ${product_id} 
              AND file_id = ${file_id}
              AND color_type_id = ${color_type_id}
              AND unit_type_id = ${unit_type_id}
              AND size_x = ${size_x}
              AND size_y IS NULL
              `;
    } else if (!!!size_x && !!!size_y) {
      query = `SELECT *
              FROM image_product
              WHERE product_id = ${product_id} 
              AND file_id = ${file_id}
              AND color_type_id = ${color_type_id}
              AND unit_type_id = ${unit_type_id}
              AND size_x IS NULL
              AND size_y IS NULL
              `;
    }
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) return res[0][0];
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async findImagesProductById(
    id: number,
    showCol: Array<keyof SQL_IMAGE_PRODUCT> = [],
  ): Promise<SQL_IMAGE_PRODUCT[] | false> {
    const query = `SELECT product_id, size_x, size_y, CONCAT(domain, path) AS path, name, mime_type, file_type, unit_type, color_type
                   FROM image_product
                   JOIN file
                   JOIN file_type
                   JOIN unit_type
                   JOIN color_type
                   WHERE image_product.product_id = ${id} 
                     AND image_product.file_id = file.file_id
                     AND file.file_type_id = file_type.file_type_id
                     AND image_product.unit_type_id = unit_type.unit_type_id
                     AND image_product.color_type_id = color_type.color_type_id
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.length > 0) {
        if (showCol.length === 0) return res[0];
        for (let j in res[0]) {
          res[0][j].path = HostConst.DOMAIN + res[0][j].path;
          for (let i in showCol) {
            delete res[0][j]?.[showCol[i]];
          }
        }
        return res[0];
      }
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async updateImageProductById(data: IUpdateImageProduct): Promise<boolean> {
    const { product_id, modify, target } = data;
    !modify.size_x && (modify.size_x = null);
    !modify.size_y && (modify.size_y = null);
    let query = `UPDATE image_product
                   SET file_id = ${modify.file_id}, color_type_id = ${modify.color_type_id}, unit_type_id = ${modify.unit_type_id}, size_x = ${modify.size_x}, size_y = ${modify.size_y}
                   WHERE product_id = ${product_id} 
                    AND file_id = ${target.file_id}
                    AND color_type_id = ${target.color_type_id}
                    AND unit_type_id = ${target.unit_type_id}
    `;
    if (target.size_x && target.size_y) {
      query += `AND size_x = ${target.size_x} AND size_y = ${target.size_y}`;
    } else if (!target.size_x && target.size_y) {
      query += `AND size_x IS NULL AND size_y = ${target.size_y}`;
    } else if (target.size_x && !target.size_y) {
      query += `AND size_x = ${target.size_x} AND size_y IS NULL`;
    } else if (!target.size_x && !target.size_y) {
      query += `AND size_x IS NULL AND size_y IS NULL`;
    }
    try {
      const res = await this.connection.query(query);
      if (res[0]?.affectedRows > 0) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async deleteImagesProductById(
    color_type_id: number,
    file_id: number,
    product_id: number,
  ): Promise<boolean> {
    const query = `DELETE FROM wages_metal
     WHERE product_id = ${product_id}
      AND color_type_id = ${color_type_id}
      AND file_id = ${file_id}
    `;
    try {
      const res = await this.connection.query(query);
      if (res[0]?.affectedRows > 0) return true;
      return false;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
