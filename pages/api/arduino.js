import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { MongoClient } from "mongodb";

const port = new SerialPort({
    path: "COM3",
    baudRate: 9600,
    parser: new ReadlineParser("\n"),
});
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

const uri =
    "mongodb+srv://eliethellier4:aVHm1TrM5XkG6X7n@mydbs.m7gdljz.mongodb.net/dhtTemp?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default async (req, res) => {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        let data = null;
        parser.on("data", (line) => {
            try {
                data = line;
                console.log(`Received data: ${line}`);
            } catch (error) {
                console.error(`Error parsing data: ${line}`);
            }
        });

        // Wait for data to be received before sending response and inserting into MongoDB
        await new Promise((resolve) => {
            const interval = setInterval(() => {
                if (data) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });

        // Parse the data and insert into MongoDB
        const temperature = data.substr(0, 5);
        const humidity = data.substr(5, 10);
        const collection = client.db().collection("tempHum"); // Replace with your collection name
        const result = await collection.insertOne({
            Temperature: parseFloat(temperature),
            Humidity: parseFloat(humidity),
            Time: new Date(),
        });
        console.log(`Inserted data with id ${result.insertedId}`);

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    } finally {
        // Close the MongoDB client
        await client.close();
        console.log("Disconnected from MongoDB");
        // Close the serial port
        await port.close();
        console.log("Closed serial port");
        // Close the server
        await res.end();
        console.log("Closed server");
    }
};
