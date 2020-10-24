const express = require("express");
const app = express();
const { cloudinary } = require("./utils/cloudinary");
const cors = require("cors");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:arch-style")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  console.log(resources)
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });
    console.log(uploadResponse);
    res.json({ msg: "HI CLOUDINARY!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
