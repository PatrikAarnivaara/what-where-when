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

// PATCH
/* app.patch("/api/streams/:id", requireLogin, async (req, res) => {
  console.log("REQ DATA: ",req.data)
  
  const { title, description } = req.body;
  console.log("Object: ", title, description)
  res.status(404).send("Sorry can't find that!")

  const stream = new Stream({
    title,
    description,
  });

  console.log("STREAM",stream)
  
  //------> OK ------> ERROR

  try {
    await Stream.findByIdAndUpdate(req.params.id, stream);
    await Stream.save();
    //res.send(stream);
  } catch (err) {
    res.status(500).send(err);
  }
  
}); */

app.patch("/api/edit/:id", async (req, res) => {
  /* console.log(req.params.id)*/
  /* console.log(req.params.id);
  
  const { title, description } = req.body;

  const building = new Building({
    title,
    description,
  }); */

  /* 
    const fileStr = req.body.file;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "ml_default",
    }); */

  /* Change to localDate... so it updates. */
  /* const building = new Building({
      url: uploadResponse.url,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      publicId: uploadResponse.public_id,
    }); */

  try {
    await Building.findOneAndUpdate(req.params.id, req.body);
    await Building.save();
    res.send(building);
  } catch (err) {
    res.status(500).send(err);
  }

  /* Building.updateOne(req.params.id, req.body)
    .then(function () {
      res.json("Prediction updated");
      consol.log(res.json(done));
    })
    .catch(function (err) {
      res.status(422).send("Prediction update failed.");
      console.log(res.status(422).send("Prediction update failed."));
    }); */
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
