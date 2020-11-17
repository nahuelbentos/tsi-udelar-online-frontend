const express = require("express");
const app = express();
const path = require("path");

const fileDirectory = path.resolve(__dirname, "./dist/udelar-online-frontend")

app.use(express.static(fileDirectory));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: fileDirectory }, (err) => {
    res.end();

    if (err) throw err;
  });
});

app.listen(80, () =>
  console.log(`App listening at https://udelaronline.web.elasticloud.uy`)
);
