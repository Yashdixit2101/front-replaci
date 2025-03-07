import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import ImageList from "./components/ImageList";
import "./App.css";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleUploadSuccess = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="app-container">
      <div className="upload-box">
        <ImageUploader onUploadSuccess={handleUploadSuccess} />
        <ImageList key={refresh} />
      </div>
    </div>
  );
};

export default App;
