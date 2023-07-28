const express = require("express");
const app = express();
const db = require("./db/db.json");
const cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "a12345",
  database: "careplanner",
});

connection.query("SELECT * FROM user", (err, res, fields) => {
  if (err) throw err;
  // console.log("user 는 : ", res);
});

function sql(sql) {
  const query = sql;
  connection.query(query, (err, res, fields) => {
    if (err) throw err;
    return res;
  });
}

// sql(`INSERT INTO user (id, name, email) VALUES (2,'jack','jack@mail.com')`);

const server = app.listen(3000, () => {
  console.log("server started. port 3000.");
});

app.use(cors());

app.get("/test/:api", (req, res) => {
  const { api } = req.params;

  console.log("get");

  const result = db.find((item) => item.id === api);

  if (result) {
    console.log(result);
    res.send(result);
  }
});

// POST 요청을 처리하는 라우터를 생성한다
app.post("/api/:data", (req, res) => {
  // 요청 바디에서 데이터를 추출한다
  const { data } = req.params;
  console.log(data);

  res.send("Success");
});

const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://www.youtube.com/";
// axios
//   .get(url)
//   .then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const ogTitle = $('meta[property="og:title"]').attr("content");
//     const ogDescription = $('meta[property="og:description"]').attr("content");
//     const ogImage = $('meta[property="og:image"]').attr("content");
//     // Display the Open Graph values on your site
//     console.log(`Title: ${ogTitle}`);
//     console.log(`Description: ${ogDescription}`);
//     console.log(`Image: ${ogImage}`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

async function crawlOpenGraph(url) {
  try {
    const response = await axios.get(url);
    console.log(response);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const ogTags = doc.querySelectorAll('meta[property^="og:"]');
    const ogData = {};
    ogTags.forEach((tag) => {
      const property = tag.getAttribute("property").replace("og:", "");
      const content = tag.getAttribute("content");
      ogData[property] = content;
    });
    // console.log("og data : ", ogData);
    return ogData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

crawlOpenGraph(url);

// app.get("/test/:api", (req, res) => {
//   const { api } = req.params;

//   console.log("get");

//   for (let i = 0; i < db.length; i++) {
//     if (db[i].id === api) {
//       console.log(db[i]);
//       res.send(db[i]);
//     }
//   }
// });

// const server = app.listen(3000, () => {
//   console.log("server started. port 3000.");
// });

// app.use(cors());

// app.get("/test/:api", (req, res) => {
//   const { api } = req.params;

//   console.log("get");

//   for (let i = 0; i < db.length; i++) {
//     if (db[i].id === api) {
//       console.log(db[i]);
//       res.send(db[i]);
//     }
//   }
// });
