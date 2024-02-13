import * as Kavenegar from 'kavenegar';

export async function sendOtp(mobile: string, otp: string): Promise<boolean> {
  let isSend: boolean = false;
  const apikey = process.env.API_KEY_KAVENEGAR;
  const api = Kavenegar.KavenegarApi({
    apikey,
  });
  await api.VerifyLookup(
    {
      receptor: mobile,
      token: `${otp}`,
      template: 'VerifyUser',
    },
    function (response, status) {
      if (status % 100 == 2) isSend = true;
      console.log(response);
      console.log(status);
    },
  );
  return isSend;
}

export function createOtp(length: number): string {
  let otp = '';
  const char = '0923167548';
  const charLength = char.length;
  for (var i = 0; i < length; i++) {
    otp += char.charAt(Math.floor(Math.random() * charLength));
  }
  return otp;
}
