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
            console.log(`Received data: ${line}`);
            try {
                data = line;
                console.log(`Received data: ${line}`);
                port.close();
            } catch (error) {
                console.error(`Error parsing data: ${line}`);
                port.close();
            }
        });

        // Wait for data to be received before sending response and inserting into MongoDB
        await new Promise((resolve) => {
            const interval = setInterval(() => {
                if (data) {
                    console.log("Data received");
                    clearInterval(interval);
                    resolve();
                }
            }, 1000);
        });

        // Parse the data and insert into MongoDB
        const temperature = await data.substr(0, 5);
        const humidity = await data.substr(5, 10);
        const collection = client.db().collection("tempHum");
        const result = await collection.insertOne({
            Temperature: parseFloat(temperature),
            Humidity: parseFloat(humidity),
            Time: new Date(),
        });
        console.log(`Inserted data with id ${result.insertedId}`);

        await res.status(200).json(data);
    } catch (error) {
        console.error(error);
        await res.status(500).send(error.message);
    } finally {
        await client.close();
    }
};
