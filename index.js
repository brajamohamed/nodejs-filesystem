const express = require("express");
const app = express();
app.use(express.json());

const fs = require("fs");
const path = require("path");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/createfile", (req, res) => {
  const currentdate = new Date();
  const date = currentdate.toISOString().replace(/:/g, "-").split("T")[0];
  const time = currentdate.toISOString().replace(/:/g, "-").split("T")[1];
  const filename = `${date}-${time}.txt`;
  const filepath = path.join(__dirname, "/files", filename);
  const fileContent = currentdate.toString();
  try {
    fs.writeFile(filepath, fileContent, (error) => {
      if (error) {
        console.log("Error while creating File");
        return res
          .status(500)
          .send({ message: "Internal server Error", filepath });
      }
      return res.status(200).send({ message: "File created successfully" });
    });
  } catch {
    res.status(500).send("Internal server Error");
  }
});

app.get("/readfiles", (req, res) => {
  const filepath = path.join(__dirname, "/files");

  fs.readdir(filepath, (error, files) => {
    if (error) {
      console.log("Error while getting files");
      res.status(500).send({ message: "Error reading files" });
    }

    res.status(200).json({ files });
  });
});

app.listen(4000, () => {
  console.log("App is running on PORT 4000");
});
