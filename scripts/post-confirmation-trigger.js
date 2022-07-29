const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {

    const cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

    const addUserParams = {
        GroupName: 'practitioner',  //set GroupName value to our custom attribute value
        UserPoolId: event.userPoolId,
        Username: event.userName,
    };

    try {
        await cognitoIdentityServiceProvider.adminAddUserToGroup(addUserParams).promise();
        callback(null, event);
    } catch (e) {
        callback(e);
    }

};