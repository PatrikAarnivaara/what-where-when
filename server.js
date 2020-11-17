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

app.get("/api/predictions", function (req, res) {
  Building.find(function (err, buildings) {
    res.json(buildings);
  });
});

app.get("/api/predictions/:id", function (req, res) {
  Building.findById(req.params.id, function (err, building) {
    if (!building) {
      res.status(404).send("No result found");
    } else {
      res.json(building);
    }
  });
});

app.post("/api/upload", async (req, res) => {
  /* console.log("Server: ", req.body.file); */
  /* Save the response in variable and include it
  in mongoDB request to be able to separate into two
  try/catch blocks */

  const requestFile = {};
  try {
    const fileStr = req.body.file;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "ml_default",
    });
    /* res.json({ msg: "HI CLOUDINARY!" }); */

    let building = new Building({
      url: uploadResponse.url,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      publicId: uploadResponse.public_id,
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

app.delete("/api/predictions/:id", function (req, res) {
  Building.findById(req.params.id, function (err, building) {
    if (!building) {
      res.status(404).send("Building not found");
    } else {
      cloudinary.uploader.destroy(building.publicId);
      Building.findByIdAndRemove(req.params.id)
        .then(function () {
          res.status(200).json("Building deleted");
        })
        .catch(function (err) {
          res.status(400).send("Building delete failed.");
        });
    }
  });
  /* console.log(publicId)
  cloudinary.uploader.destroy(publicId); */
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
