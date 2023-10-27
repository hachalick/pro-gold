import { CPropImageConst } from "@/constant/product.cont";
import { CRegFloatEn, CRegFloatFa, CRegTags } from "@/constant/regex";
import {
  IClientProduct,
  IProduct,
  IProductAdmin,
} from "@/interface/product.interface";
import React from "react";
import parseEnNum from "./parseEnNum";
import { FetchData } from "@/services/api";

export class FormAddProductHandler extends FetchData {
  private event: any;
  private setMessage: React.Dispatch<React.SetStateAction<string>>;
  private setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  private file: File | undefined;
  private setData: React.Dispatch<React.SetStateAction<IClientProduct>>;
  private data: IClientProduct;
  private backupPathImageProduct: string;

  constructor(
    event: any,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>,
    file: File | undefined,
    setData: React.Dispatch<React.SetStateAction<IClientProduct>>,
    data: IClientProduct
  ) {
    super();
    this.event = event;
    this.setMessage = setMessage;
    this.setFile = setFile;
    this.file = file;
    this.setData = setData;
    this.data = data;
    this.backupPathImageProduct = "";
  }

  public changeHandler() {
    if (this.event.target.files && this.event.target) {
      this.validateFile();
    } else if (
      this.event.target.name === "minWeight" ||
      this.event.target.name === "maxWeight" ||
      this.event.target.name === "shopkeeperWages" ||
      this.event.target.name === "spreaderWages" ||
      this.event.target.name === "wholesalerWages" ||
      this.event.target.name === "housewifeWages" ||
      this.event.target.name === "size"
    ) {
      this.parseEnNumber();
    } else if (this.event.target.name === "tags") {
      const tags = this.event.target.value.split(' ').join('');
      /(#([a-zA-Z0-9\u0600-\u06FF]+_?){0,} ?)+/.test(this.event.target.value) &&
        this.setData((val) => ({
          ...val,
          [this.event.target.name]: this.event.target.value,
        }));
    } else {
      this.setData((val) => ({
        ...val,
        [this.event.target.name]: this.event.target.value,
      }));
    }
  }

  private validateFile() {
    if (!this.event.target.files[0]) return false;
    if (CPropImageConst.MAX_SIZE_KB < this.event.target.files[0].size) {
      this.setMessage("حجم فایل باید کمتر از 1 مگ باشد");
      return;
    }
    const ext = this.event.target.files[0].name.split(".").pop();
    if (!CPropImageConst.TYPES.includes(ext.toLowerCase())) {
      this.setMessage("فرمت فایل باید jpg | jpeg | webp | png باشد");
      return;
    }
    this.setMessage("");
    const imgTag: any = document.getElementById("previewImageProduct");
    imgTag.src = URL.createObjectURL(this.event.target.files[0]);
    imgTag.onload = () => {
      URL.revokeObjectURL(this.event.target.files[0]);
    };
    this.setFile(this.event.target.files[0]);
  }

  private parseEnNumber() {
    (CRegFloatEn.test(this.event.target.value) ||
      CRegFloatFa.test(this.event.target.value) ||
      this.event.target.value === "") &&
      this.setData((val) => ({
        ...val,
        [this.event.target.name]: parseEnNum(this.event.target.value),
      }));
  }

  public async submitHandler(defaultData: IClientProduct) {
    if (this.backupPathImageProduct) {
      this.data = { ...this.data, path: this.backupPathImageProduct };
      const resultCreate = await this.createProduct(this.data);
      if (resultCreate.err) this.setMessage(resultCreate.err.message);
      else if (resultCreate.res) this.setMessage(resultCreate.res.message);
    }
    if (this.file && this.validateData()) {
      const formData = new FormData();
      formData.append("image", this.file);
      const result = await this.uploadImageProduct(formData);
      if (result.err) this.setMessage(result.err.message);
      else if (result.res) {
        let path = result.res.data.path || this.backupPathImageProduct;
        this.backupPathImageProduct = path;
        if (!path) {
          const listImage = await this.getListUploadedImagesProduct();
          if (listImage.res) {
            const storagePath = listImage.res.data.pop();
            if (storagePath !== undefined) path = storagePath;
          }
        }
        this.data = { ...this.data, path };
        const resultCreate = await this.createProduct(this.data);
        if (resultCreate.err) this.setMessage(resultCreate.err.message);
        else if (resultCreate.res) {
          this.setMessage(resultCreate.res.message);
          this.setData(defaultData);
        }
      }
    } else if(!this.file) this.setMessage("عکس بارگذاری کنید");
  }

  private validateData(): boolean {
    const testTags = CRegTags.test(this.data.tags);
    console.log(this.data)
    if (!testTags) {
      this.setMessage("نوع نوشتار تگ پذیرفته نیست");
      return false;
    } else if (this.data.minWeight >= this.data.maxWeight) {
      this.setMessage("کف اجرت از سقف اجرت باید کمتر باشد");
      return false;
    } else if (parseFloat(this.data.spreaderWages) >= parseFloat(this.data.wholesalerWages)) {
      this.setMessage("اجرت بنکدار از اجرت پخش کننده باید بیشتر باشد");
      return false;
    } else if (parseFloat(this.data.wholesalerWages) >= parseFloat(this.data.shopkeeperWages)) {
      this.setMessage("اجرت مغازه دار از اجرت بنکدار باید بیشتر باشد");
      return false;
    } else if (parseFloat(this.data.shopkeeperWages) >= parseFloat(this.data.housewifeWages)) {
      this.setMessage("اجرت خانگی از اجرت مغازه دار باید بیشتر باشد");
      return false;
    }
    return true;
  }
}

export class CardProfileProductsHandler extends FetchData {
  private setData: React.Dispatch<React.SetStateAction<boolean>>;

  constructor(setData: React.Dispatch<React.SetStateAction<boolean>>) {
    super();
    this.setData = setData;
  }

  public async deleteHandlerById(id: string) {
    const result = await this.deleteProduct(id);
    if (result.res) this.setData(result.res);
  }
}

export class FormListProductsHandler extends FetchData {
  private setListProducts: React.Dispatch<
    React.SetStateAction<IProductAdmin[]>
  >;
  private setShowListProducts: React.Dispatch<
    React.SetStateAction<IProductAdmin[]>
  >;
  constructor(
    setListProducts: React.Dispatch<React.SetStateAction<IProductAdmin[]>>,
    setShowListProducts: React.Dispatch<React.SetStateAction<IProductAdmin[]>>
  ) {
    super();
    this.setListProducts = setListProducts;
    this.setShowListProducts = setShowListProducts;
  }
  public async getProduct(key: string) {
    const result = await this.getProductsAdmin(key);
    if (result.res) {
      this.setListProducts(result.res);
      this.setShowListProducts(result.res);
    }
  }
}

export class ContainerCardProductsHandler extends FetchData {
  constructor() {
    super();
  }
  public async getListProduct(key: string): Promise<IProduct[] | null> {
    const result = await this.getProducts(key);
    return result.res;
  }
}

export class ContainerCardProductHandler extends FetchData {
  constructor() {
    super();
  }
  public async findByIdProduct(id: string): Promise<IProduct | null> {
    const result = await this.findProductById(id);
    return result.res;
  }
}
