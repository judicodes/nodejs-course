import { createReadStream, readFile } from "fs";
import { createServer } from "http";

const server = createServer();

server.on("request", (req, res) => {
  // Solution 1
  //   readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data.toString());
  //   });

  // Solution 2: Streams

  //   const readable = createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   readable.on("end", () => {
  //     res.end();
  //   });

  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });

  // Solution 3: Pipe operator
  const readable = createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "localhost", () => {
  console.log("Waiting for requests...");
});
