import jwt from "jsonwebtoken"; 

const JWT_TOKEN = process.env.JWT_SECRET!;

export function createSessionToken(userId:string){
    return jwt.sign({ userId }, JWT_TOKEN, {expiresIn: "1h"});
}

export function verifySessionToken(token: string) {
  try {
    return jwt.verify(token, JWT_TOKEN);
  } catch {
    return null;
  }
}