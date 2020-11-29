const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { cloudinary } = require("./utils/cloudinary");
const cors = require("cors");
const bodyParser = require("body-parser");
const Building = require("./models/building");
/* require("./tensor/classify")(); */

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cors());
/* Is body parser necessary? */
app.use(bodyParser.json());

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

app.patch("/api/edit/:id", async (req, res, next) => {
  try {
    await Building.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.send(console.log("Prediction updated."));
  } catch (error) {
    next(error.message);
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
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
