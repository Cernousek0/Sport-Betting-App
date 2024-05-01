import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';
import { Base64 } from 'js-base64';


interface RequestBody {
        key: string;
        email: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { key, email } = req.body as RequestBody;
  if(key !== process.env.EXTERNAL_API_KEY) {res.status(401).json({ error: 'Unauthorized' }); }
  
  const hashedEmail = Base64.encodeURI(email); 
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    const mailOptions = {
      from: "martanek500game@gmail.com",
      to: "martincerny@volny.cz",
      subject: 'Email Verification',
      text: `You are receiving this because you (or someone else) have requested the verification of your email address.\n\n go to this link to verify your email address\n\n http://localhost:3000/verify-email?e=${hashedEmail}\n\n`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ status: 'Success' });
      }
    });
  }
  catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });

  }
}