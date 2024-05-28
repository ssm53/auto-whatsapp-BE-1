import jwt from "jsonwebtoken";
// import "dotenv/config";

const userAccessTokenSecret = process.env.APP_SECRET;

export function signUserAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, userAccessTokenSecret, {}, (err, token) => {
      if (err) {
        reject("Something went wrong");
      }
      resolve(token);
    });
  });
}
