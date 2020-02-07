const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const port = 3000;

app.listen(port, () => console.log(`server started at port ${port}`));

app.post("/messages", (req, res) => {
  return res.send({ message: req.body.text });
});
