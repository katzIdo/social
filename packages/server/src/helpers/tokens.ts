import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { JWT_SECRET } from './config';

export const encryptPassword = (password: string) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          (err) ? reject(err) : resolve(hash);
        })
      }

    })
  })

export const comparePassword = (password: string, hash: Buffer) =>
  new Promise(async (resolve, reject) => {
    try {
      const isMatch = await bcrypt.compare(password, hash)
      resolve(isMatch)
    } catch (err) {
      reject(err)
    }
  })

export const getToken = (payload: any) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.NODE_ENV !== 'production' ? 24 * 60 * 60 * 1000 : 5 * 60* 1000,
  })
  return token
}

export const getPayload = (token: string) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log('payload', payload)
    return { loggedIn: true, payload };
  } catch (err) {
    // Add Err Message
    return { loggedIn: false }
  }
}
