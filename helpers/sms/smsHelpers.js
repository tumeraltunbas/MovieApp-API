import AWS from "aws-sdk";
import randomInteger from "random-int";

export const sendSms = (phoneNumber, message) => {
    
    const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS, AWS_REGION} = process.env;

     AWS.config.update({
        region: AWS_REGION,
        apiVersion: "lastest",
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS
        }
    });

    const parameters = {PhoneNumber: phoneNumber, Message: message}
    
    return new AWS.SNS()
    .publish(parameters)
    .promise()
    .then()
    .catch(err => console.log(err));
    
}

export const sendPhoneCodeHelper = async(user) => 
{

    const {PHONE_CODE_EXPIRES} = process.env;

    const randomInt = randomInteger(111111,999999);
    
    user.phoneCode = randomInt;
    user.phoneCodeExpires =  new Date(Date.now() + Number(PHONE_CODE_EXPIRES)); //5 minutes

    await user.save();

    await sendSms(user.phoneNumber, `Your phone code is ${user.phoneCode}. This code is valid for 5 minutes.`);

}