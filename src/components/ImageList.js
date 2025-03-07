import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ImageList.css";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Fixed number of items per page

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
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image. Please try again.");
    }
  };

  // View image in full screen
  const handleView = (imageUrl) => {
    window.open(imageUrl, "_blank"); // Open image in a new tab
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = images.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const nextPage = () => {
    if (currentPage < Math.ceil(images.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="image-list-container">
      <div className="image-preview">
        {currentImages.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.image_url} alt="Uploaded" className="image-thumb" />
            <div className="hover-overlay">
              <button className="view-button" onClick={() => handleView(image.image_url)}>
                <FaEye />
              </button>
              <button className="remove-button" onClick={() => handleDelete(image.id)}>
                <FaTimes />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <FaArrowLeft />
        </button>
        <span>
          Page {currentPage} of {Math.ceil(images.length / itemsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(images.length / itemsPerPage)}
        >
          <FaArrowRight />
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ImageList;