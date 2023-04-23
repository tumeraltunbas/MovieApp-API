import AWS from "aws-sdk";

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