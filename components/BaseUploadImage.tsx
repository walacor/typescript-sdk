"use client";

import React, { useState, ChangeEvent } from "react";
import axios from "axios";

interface BaseUploadImageProps {
  onUpload: (url: string) => void;
}

const BaseUploadImage: React.FC<BaseUploadImageProps> = ({ onUpload }) => {
  const [message, setMessage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const image = reader.result as string;
        const imageName = `image-${Date.now()}`;
        try {
          const response = await axios.post("/api/uploadImage", {
            imageName,
            image,
          });

          setMessage(response.data.message);
          setImageUrl(response.data.imageUrl);
          onUpload(response.data.imageUrl);
        } catch (error) {
          setMessage("Failed to upload image.");
          console.error("Error uploading image:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Upload Image to Blog</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {message && <p>{message}</p>}
      {imageUrl && (
        <div>
          <p>Image URL:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
          <br />
          <img
            src={imageUrl}
            alt="Uploaded Image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default BaseUploadImage;
