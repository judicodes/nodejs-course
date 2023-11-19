import { readFile, writeFile } from "fs";
import { get } from "superagent";

const readFilePromise = (file: string) => {
  return new Promise((resolve, reject) => {
    readFile(file, (err, data) => {
      if (err) {
        reject("I could not find that file 😢");
      }
      resolve(data);
    });
  });
};

const writeFilePromise = (file: string, data: string) => {
  return new Promise((resolve, reject) => {
    writeFile(file, data, (err) => {
      if (err) {
        reject("Could not write file 😢");
      }
      resolve("success");
    });
  });
};

// Promise-based solution

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFilePromise("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog image saved to file!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Async/Await solution

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Promise = get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Promise = get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Promise = await get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Promise, res2Promise, res3Promise]);
    const images = all.map((el) => el.body.message);
    await writeFilePromise("dog-img.txt", images.join("\n"));
    console.log("Random dog image saved to file!");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: READY 🐶";
};

// console.log("1: Will get dog pics!");
// getDogPic()
//   .then((x) => console.log(x))
//   .catch((err) => console.log("ERROR 💥"));
// console.log("3: Done getting dog pics!");

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics!");
  } catch (err) {
    console.log("ERROR 💥");
  }
})();
