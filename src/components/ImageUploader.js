import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import "./ImageUploader.css";

const ImageUploader = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post("http://localhost:8000/api/upload/", formData);
      onUploadSuccess();
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="image-uploader">
      <FaUpload size={40} className="upload-icon" />
      <p>Max file size: 5MB, accepted: jpg | png | gif</p>
      <label className="upload-btn">
        Choose images
        <input type="file" onChange={handleFileChange} accept="image/*" hidden />
      </label>
      <button onClick={handleUpload} className="upload-btn">
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
