export class ValidationData {
  protected value: string | number | boolean | [] | object;
  private message: string = "";
  constructor(value: string | number | boolean | [] | object) {
    this.value = value;
  }
  string() {
    if (typeof this.value === "string") {
      const validationString = new ValidationString(this.value);
      const obj = {
        max: function (max: number) {
          validationString.max(max);
          return obj;
        },
        min: function (min: number) {
          validationString.min(min);
          return obj;
        },
      };
      return obj;
    } else {
      throw new Error("جنس مقدار string باید باشد");
    }
  }
  number() {}
  array() {}
  object() {}
}

class ValidationString {
  private value: string;
  constructor(value: string) {
    this.value = value;
  }
  max(max: number) {
    if (max <= this.value.length) {
      throw new Error(`تعداد حروف باید کمتر از ${max} باشد`);
    }
  }
  min(min: number) {
    if (min >= this.value.length) {
      throw new Error(`تعداد حروف باید بیشتر از ${min} باشد`);
    }
  }
}
