import { CFaNumerical } from "@/constant/FaNumerical";
import { CRegFloatFa } from "@/constant/regex";

function parseEnNum(num: string): string | null {
  if (CRegFloatFa.test(num)) return null;
  const converted = num
    .split("")
    .map((val) =>
      CFaNumerical[val as keyof typeof CFaNumerical]
        ? CFaNumerical[val as keyof typeof CFaNumerical]
        : val
    );
  const join: string = converted.join("");
  return join;
}

export default parseEnNum;
