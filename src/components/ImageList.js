import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import "./ImageList.css";

const ImageList = () => {
  const [images, setImages] = useState([]);

  // Fetch images from the backend
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/images/");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Delete an image
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/images/${id}/`);
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="image-preview">
      {images.map((image) => (
        <div key={image.id} className="image-item">
          <img src={image.image_url} alt="Uploaded" className="image-thumb" />
          <FaTimes
            className="remove-icon"
            onClick={() => handleDelete(image.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;