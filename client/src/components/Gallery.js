import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";

const Gallery = () => {
  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      console.log(data);
      setImageIds(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      <h5>Images in Cloudinary folder:</h5>
      {imageIds &&
        imageIds.map((imageId, index) => (
          <Image
            key={index}
            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
            publicId={imageId}
            width="300"
            crop="scale"
          />
        ))}
    </div>
  );
};

export default Gallery;
