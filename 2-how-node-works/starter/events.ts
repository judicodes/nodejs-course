import { EventEmitter } from "events";
import { createServer } from "http";

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Judi");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 12);

/* ********************************************************************************************* */

const server = createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request received!");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "localhost", () => {
  console.log("Waiting for requests...");
});
