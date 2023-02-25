import { API_BASE_URL_DEV } from './../src/utils/constants';
const AWS = require('aws-sdk')
const ses = new AWS.SES({
  accessKeyId: 'key',
  secretAccessKey: 'secret_key',
  region: 'ap-northeast-1' // replace with your AWS region
})
const express = require('express');
const dotenv = require('dotenv');
const { v4: uuid } = require('uuid')
const { Pool } = require('pg')

dotenv.config();

const app = express();
const port = process.env.PORT
const conn = process.env.DB_CONFIG

const pool = new Pool({
  conn
})

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.post(API_BASE_URL_DEV + '/auth/local-email-login', async (req, res) => {
  const { email } = req.body
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000)
  const code = uuid()
  await saveVerificationCode(email, code, now, expiresAt)
  await sendVerificationCodeEmail(email, code)
  res.join({message: 'Verification code has been sent to your email.'})
})

async function saveVerificationCode(email, code, createdAt, expiresAt) {
  const client = await pool.connect()
  try {
    await client.query(`
      INSERT INTO verification_codes (email, code, created_at, expires_at)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO UPDATE SET
        code = $2,
        created_at = $3,
        expires_at = $4
    `, [email, code, createdAt, expiresAt])
  } finally {
    client.release()
  }
}

async function sendVerificationCodeEmail(email, code) {
  const params = {
    Destination: { ToAddress: [email] },
    Message: {
      Body: {
        Html: {
          Data: `Your verification code is: <b>${code}</b>. <br><br>This code will expire in 2 hours.`
        }
      },
      Subject: {Data: 'Verification code for your account'}
    },
    Source: 'hurima.dev@gmail.com'
  }
  await ses.sendMail(params).promise()
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
