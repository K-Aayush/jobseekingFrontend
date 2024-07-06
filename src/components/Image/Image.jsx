import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/base-url/upload/uploaded-files");
        const data = response.data;
        console.log(data);
        if (data.success && Array.isArray(data.uploadsWithBase64)) {
          setImages(data.uploadsWithBase64);
        } else {
          console.error("Unexpected data structure:", data);
          setImages([]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages([]);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Images</h1>
      <ul className="flex justify-between gap-2 w-full">
        {images.map((image) => (
          <li key={image._id}>
            <img
              src={`data:${image.contentType};base64,${image.data}`}
              alt={images.filename}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
