import { SendEmailCommandInput, SESv2Client } from '@aws-sdk/client-sesv2';
const AWS = require('aws-sdk')
const ses = new AWS.SESv2Client({
    endpoint: 'http://localhost:8000',
    region: 'ap-northeast-1',
    credentials: {
        accessKeyId: 'dummy',
        secretAccessKey: 'dummy'
    }
})

const input: SendEmailCommandInput = {
    FromEmailAddress: 'from@example.com',
    Destination: { ToAddresses: ['to@example.com'] },
    Content: {
        Simple: {
            Subject: {
                Data: 'Verify your account'
            },
            Body: {
                Text: {
                    Data: `Welcome to Hurima! click the link below and complete logging in`
                }
            }
        }
    }
}