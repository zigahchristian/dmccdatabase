import React from "react";
import MediaUpload from "./MediaUpload";

const Camera = () => {
  const handleFileSelect = (file: File) => {
    console.log("Selected file:", file);
    // Handle the file upload here (e.g., send to server)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Upload or Take a Photo
        </h1>
        <MediaUpload onFileSelect={handleFileSelect} />
      </div>
    </div>
  );
};

export default Camera;
