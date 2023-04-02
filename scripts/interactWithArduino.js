import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const port = new SerialPort({
    path: "COM3",
    baudRate: 9600,
    parser: new ReadlineParser("\n"),
});
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

export let temperature = null;
export let humidity = null;

parser.on("data", (data) => {
    try {
        temperature = data.substr(0, 5);
        humidity = data.substr(5, 10);
        port.close();
    } catch (error) {
        console.error(`Error parsing data: ${data}`);
    }
});
