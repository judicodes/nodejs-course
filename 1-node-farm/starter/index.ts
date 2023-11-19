import { readFileSync } from "fs";
import { IncomingMessage, ServerResponse, createServer } from "http";
import { parse } from "url";
import Product from "./model/product.interface";
import replaceTemplate from "./modules/replaceTemplate";
import slugify from "slugify";


/**
 * FILES
 */

// Blocking synchronous file operations
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInput);

// const textOutput = `This is what we know about the avocado: ${textInput}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOutput);

// // Non-blocking asynchronous file operations with callbacks
// fs.readFile("./txt/start.txt", "utf-8", (err: string, data1: string) => {
//   if (err) {
//     return console.log("Error! 💥");
//   }
//   fs.readFile(`txt/${data1}.txt`, "utf-8", (err: string, data2: string) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err: string, data3: string) => {
//       console.log(data3);
//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err: string) => {
//           console.log("Your file has been written! 🤩");
//         }
//       );
//     });
//   });
// });

// Non-blocking asynchronous file operations with async/await
// TODO

/**
 * HTTP SERVER
 */

const templateOverview = readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateProduct = readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const templateCard = readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const data = readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject: Product[] = JSON.parse(data);
const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs)

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const { query, pathname } = parse(req.url || "/", true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    const cardsHTML = dataObject
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);

    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    const product = dataObject[query.id as unknown as number];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-test-header": "testtttt"
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000...");
});
