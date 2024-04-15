import SmsRetriever from 'react-native-sms-retriever';

class SmsManager {
  constructor() {
    if (SmsManager.instance) {
      return SmsManager.instance;
    }
    SmsManager.instance = this;
  }

  async requestPhoneNumber() {
    try {
      const phoneNumber = await SmsRetriever.requestPhoneNumber();
      SmsRetriever.removeSmsListener();
      return phoneNumber;
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  }

  async startSmsRetriever() {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          SmsRetriever.removeSmsListener();
        });
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  }
}

const smsManager = new SmsManager();
export default smsManager;
