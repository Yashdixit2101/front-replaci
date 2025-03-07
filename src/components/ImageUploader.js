import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import "./ImageUploader.css";

const ImageUploader = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Loader state

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning("Please select a file first!", { position: "top-center" }); // Toast for no file selected
      return;
    }

    setIsUploading(true); // Start loader

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("http://localhost:8000/api/upload/", formData);
      console.log("Upload response:", response.data); // Debugging
      toast.success("Image uploaded successfully!", { position: "top-center" }); // Success toast
      onUploadSuccess();
      setSelectedFile(null);
      setFileName("");
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.", { position: "top-center" }); // Error toast
    } finally {
      setIsUploading(false); // Stop loader
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
      {fileName && <p>Selected file: {fileName}</p>}
      {previewUrl && (
        <div className="image-preview">
          <img src={previewUrl} alt="Selected" style={{ maxWidth: "100%", maxHeight: "200px" }} />
        </div>
      )}
      <button onClick={handleUpload} className="upload-btn" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
      {isUploading && <div className="loader"></div>} {/* Loader */}
      <ToastContainer position="top-center" autoClose={3000} /> {/* Toast container */}
    </div>
  );
};

export default ImageUploader;