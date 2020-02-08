const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

let requestCount = 1;

const myMiddleware = (req, res, next) => {
  console.log(`this is request no: ${requestCount}`);
  requestCount = requestCount + 1;
  if (requestCount > 6) {
    res.status(429).end();
  } else return next();
};

const port = 3000;

app.listen(port, () => console.log(`server started at port ${port}`));

app.post("/messages", myMiddleware, (req, res) => {
  if (req.body.hasOwnProperty("text")) {
    if (req.body.text.length) {
      return res.send({ message: req.body.text });
    } else res.status(400).end();
  } else res.status(400).end();
});
