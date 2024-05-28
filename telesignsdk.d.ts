declare module "telesignsdk" {
  class TeleSignSDK {
    constructor(customerId: string, apiKey: string);
    sms: {
      message(
        callback: (error: any, responseBody: any) => void,
        phoneNumber: string,
        message: string,
        messageType: string
      ): void;
    };
  }
  export = TeleSignSDK;
}
