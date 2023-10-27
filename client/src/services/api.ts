import { UrlsEnum } from "@/enum/urls.enum";
import {
  IClientProduct,
  IProduct,
  IProductAdmin,
} from "@/interface/product.interface";
import {
  IResponseCreateProduct,
  IResponseListUploadedImagesProduct,
  IResponseUploadImage,
} from "@/interface/response.interface";
import axios from "axios";

export class FetchData {
  protected async deleteProduct(
    id: string
  ): Promise<{ res: boolean | null; err: boolean | null }> {
    try {
      await axios.delete(`${process.env.BASE_URL}${UrlsEnum.DELETE_PRODUCT}`, {
        params: { id },
      });
      return { res: true, err: null };
    } catch (error) {
      return { res: null, err: false };
    }
  }

  protected async uploadImageProduct(formDataImage: FormData): Promise<{
    res: IResponseUploadImage | null;
    err: { message: string } | null;
  }> {
    try {
      const response: IResponseUploadImage = (
        await axios.post(
          `${process.env.BASE_URL}${UrlsEnum.UPLOAD_IMAGE_PRODUCT}`,
          formDataImage
        )
      ).data;
      return { res: response, err: null };
    } catch (error: any) {
      const message: string = error.response.data.message;
      return { res: null, err: { message } };
    }
  }

  protected async createProduct(data: IClientProduct): Promise<{
    res: IResponseCreateProduct | null;
    err: { message: string } | null;
  }> {
    try {
      const result: IResponseCreateProduct = (
        await axios.post(
          `${process.env.BASE_URL}${UrlsEnum.CREATE_PRODUCT}`,
          data
        )
      ).data;
      return { res: result, err: null };
    } catch (error: any) {
      const message: string = error.response.data.message;
      return { res: null, err: { message } };
    }
  }

  protected async getListUploadedImagesProduct(): Promise<{
    res: IResponseListUploadedImagesProduct | null;
    err: { message: string } | null;
  }> {
    try {
      const result: IResponseListUploadedImagesProduct = await axios.get(
        `${process.env.BASE_URL}${UrlsEnum.UPLOAD_IMAGE_PRODUCT}`
      );
      return { res: result, err: null };
    } catch (error: any) {
      const message: string = error.response.data.message;
      return { res: null, err: { message } };
    }
  }

  protected async findProductById(id: string): Promise<{
    res: IProduct | null;
    err: { message: string } | null;
  }> {
    try {
      const data = await (
        await fetch(
          `${process.env.BASE_URL}${UrlsEnum.FIND_BY_ID_PRODUCT}?id=${id}`,
          {
            method: "GET",
            next: { revalidate: 5 },
          }
        )
      ).json();
      return { res: data, err: null };

    } catch (error) {
      console.log(error);
      const message: string = "";
      return { res: null, err: { message } };
    }
  }

  protected async getProducts(key: string): Promise<{
    res: IProduct[] | null;
    err: { message: string } | null;
  }> {
    try {
      const data = await (
        await fetch(
          `${process.env.BASE_URL}${UrlsEnum.GET_OVERALL_PRODUCTS}?key=${key}`,
          {
            method: "GET",
            next: { revalidate: 5 },
          }
        )
      ).json();
      return { res: data, err: null };
    } catch (error: any) {
      console.log(error);
      const message: string = "";
      return { res: null, err: { message } };
    }
  }

  protected async getProductsAdmin(key: string): Promise<{
    res: IProductAdmin[] | null;
    err: { message: string } | null;
  }> {
    try {
      const data = await (
        await fetch(
          `${process.env.BASE_URL}${UrlsEnum.GET_OVERALL_PRODUCTS_ADMIN}?key=${key}`,
          {
            method: "GET",
            next: { revalidate: 5 },
          }
        )
      ).json();
      return { res: data, err: null };
    } catch (error: any) {
      console.log(error);
      const message: string = "";
      return { res: null, err: { message } };
    }
  }
}
