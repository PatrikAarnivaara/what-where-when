const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { cloudinary } = require("./utils/cloudinary");
const cors = require("cors");
const Building = require("./models/building");

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to the Database.");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection Error : " + err);
});

app.get("/api/buildings", function (req, res) {
  Building.find(function (err, buildings) {
    res.json(buildings);
  });
});

/* app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:arch-style")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
}); */

app.post("/api/upload", async (req, res) => {
  /* console.log("Server: ", req.body.file); */
  /* Save the response in variable and include it
  in mongoDB request to be able to separate into two
  try/catch blocks */

  const requestFile = {}
  try {
    const fileStr = req.body.file;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "ml_default",
    });
    console.log("Server", uploadResponse);
    /* res.json({ msg: "HI CLOUDINARY!" }); */

    let building = new Building({
      url: uploadResponse.url,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
    });
    building
      .save()
      .then((building) => {
        res.send(building);
      })
      .catch(function (err) {
        res.status(422).send("Building add failed");
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
