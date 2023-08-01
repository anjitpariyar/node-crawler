import connectDb from "./db/Dbconnect";
import IDestination from "./model/Destination.modal";
import DestinationAdd from "./controller/Destination";
const fs = require("fs");

const getStarted = async () => {
  connectDb();
  fs.readFile("./destinationData.json", "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      process.exit(0);
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);
    console.log("parse");
    try {
      const resp: any = await DestinationAdd(jsonData.data);
      console.log("response", resp);
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

getStarted();
