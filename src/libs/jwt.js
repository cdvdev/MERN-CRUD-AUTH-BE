import { config } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                payload,
            },
                config.SECRET_KEY,
            {
                expiresIn: "1d"
            }, 
            (error, token) => {
                if(error) reject("jwt"+error);
                resolve(token);
                // if(error) console.log(error);
                // res.json({ token });
            }
        );
    })
    
}
