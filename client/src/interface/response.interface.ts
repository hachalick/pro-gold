export interface IResponseUploadImage {
  message: string;
  data: { path: string };
}

export interface IResponseCreateProduct {
  message: string;
}

export interface IResponseListUploadedImagesProduct {
  message: string;
  data: string[]
}

