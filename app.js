import express from "express";
import cors from "cors"; // Import the cors middleware
import prisma from "./src/utils/prisma.js";
import morgan from "morgan";
import usersRouter from "./src/controllers/users.controllers.js";
import authUserRouter from "./src/controllers/authUser.controllers.js";
// const TeleSignSDK = require("telesignsdk"); // telesign
// Load telesignsdk dynamically
// const TeleSignSDK = await import("telesignsdk"); // telesign

const app = express();
app.use(morgan("combined"));
app.use(cors()); // Use the cors middleware to allow cross-origin requests
app.use(express.json()); // Add this middleware to parse JSON in request bodies
app.use("/users", usersRouter);
app.use("/auth-user", authUserRouter);

app.post("/new-individual-sms", async (req, res) => {
  const data = req.body;

  // Replace the defaults below with your Telesign authentication credentials or pull them from environment variables.
  const customerId = "87496022-E224-4C86-886D-D239FC187402";
  const apiKey =
    "AzjJnOCJKnFZNxWUMVbJR5lUG201W5GVafqFmn2XpXY0D9dbm0NqN4Q0bZYEJsSai/ycKh52/MFAxBhbQidBNWw==";

  // Set the default below to your test phone number or pull it from an environment variable.
  // In your production code, update the phone number dynamically for each transaction.
  // const phoneNumber = "60123397028";
  const phoneNumber = data.number;

  // Set the message text and type.
  // const message = "Please rate us at - https://review-landing-page.pages.dev/";
  const message = data.message;
  const messageType = "ARN";

  // Dynamically import TeleSignSDK
  const TeleSignSDKModule = await import("telesignsdk");
  const TeleSignSDK = TeleSignSDKModule.default;

  // Instantiate a messaging client object.
  const client = new TeleSignSDK(customerId, apiKey);

  // Define the callback.
  function smsCallback(error, responseBody) {
    // Display the response body in the console for debugging purposes.
    // In your production code, you would likely remove this.
    if (error === null) {
      console.log("\nResponse body:\n" + JSON.stringify(responseBody));
    } else {
      console.error("Unable to send SMS. Error:\n\n" + error);
    }
  }

  // Make the request and capture the response.
  client.sms.message(smsCallback, phoneNumber, message, messageType);
});

export default app;
