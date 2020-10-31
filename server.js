const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { cloudinary } = require("./utils/cloudinary");
const cors = require("cors");
const Building = require("./models/building");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
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

app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:arch-style")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  /* console.log("Upload response:", resources.public_id); */
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

app.post("/api/upload", async (req, res) => {
  /* console.log("Server: ", req.body.file); */
  try {
    const fileStr = req.body.file;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });
    console.log("Server", uploadResponse);
    /* res.json({ msg: "HI CLOUDINARY!" }); */

    //POST to MongoDB

    let building = new Building({
      url: uploadResponse.public_id,
      title: req.body.title,
      description: req.body.desc,
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
