"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import axios from "axios";
import BaseLoader from "./BaseLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftRotate,
  faCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";

interface BaseUploadImageProps {
  onUpload: (url: string) => void;
}

const BaseUploadImage: React.FC<BaseUploadImageProps> = ({ onUpload }) => {
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorSolution, setErrorSolution] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTimedOut, setIsTimedOut] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);

    setUploadedImageUrl("");
    setMessage("");
    setIsError(false);
    setErrorSolution("");
    setIsLoading(true);
    setIsTimedOut(false);

    if (selectedFile) {
      const timeoutId = setTimeout(() => {
        setIsTimedOut(true);
        setIsLoading(false);
        setMessage("Upload timed out. Please try again.");
      }, 10000);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const image = reader.result as string;
        const imageName = `image-${Date.now()}`;
        try {
          const response = await axios.post("/api/uploadImage", {
            imageName,
            image,
          });

          clearTimeout(timeoutId);
          setMessage("Image uploaded successfully!");
          setIsError(false);
          setErrorSolution("");
          setUploadedImageUrl(response.data.imageUrl);
          onUpload(response.data.imageUrl);
        } catch (error: any) {
          clearTimeout(timeoutId);
          let errorMessage = "Failed to upload image.";
          let solutionMessage = "";

          if (error.response && error.response.status) {
            const status = error.response.status;
            if (status === 413) {
              errorMessage = "The image is too large to upload.";
              solutionMessage = `
                The image is too large. Try resizing it using:
                <ul>
                  <li>
                    TinyJPG: <a href="https://tinyjpg.com/" target="_blank" rel="noopener noreferrer" style="color:blue;">https://tinyjpg.com/</a>
                  </li>
                  <li>
                    Image Resizer: <a href="https://imageresizer.com/" target="_blank" rel="noopener noreferrer" style="color:blue;">https://imageresizer.com/</a>
                  </li>
                </ul>`;
            } else if (status === 400) {
              errorMessage = error.response.data.error || errorMessage;
              if (errorMessage.includes("Unsupported file type")) {
                solutionMessage = "Please upload a JPEG, PNG, or GIF image.";
              } else if (errorMessage.includes("not a valid image")) {
                solutionMessage =
                  "The uploaded file is not a valid image. Please check the file and try again.";
              }
            } else {
              solutionMessage =
                "Please try again or contact support if the problem persists.";
            }
          }
          setMessage(errorMessage);
          setIsError(true);
          setErrorSolution(solutionMessage);
          console.error("Error uploading image:", error);
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (file) {
      handleFileChange({
        target: { files: [file] },
      } as unknown as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div>
      <h2>Upload Image to Blog</h2>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      {isLoading && (
        <p className="flex gap-1 items-center">
          <span>Loading...</span>
          <BaseLoader />
        </p>
      )}
      {message && !isLoading && (
        <div style={{ color: isError ? "red" : "green" }}>
          <p>
            {isError ? (
              <FontAwesomeIcon className="scale-75" icon={faX} />
            ) : (
              <FontAwesomeIcon icon={faCheck} />
            )}{" "}
            {message}
          </p>
          {isError && (
            <div
              dangerouslySetInnerHTML={{ __html: errorSolution }}
              style={{ color: "black" }}
            />
          )}
          {isTimedOut && (
            <div>
              <button
                onClick={handleRetry}
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "5px",
                }}
              >
                <FontAwesomeIcon icon={faArrowLeftRotate} />
                <span className="ml-1">Try Again</span>
              </button>
            </div>
          )}
        </div>
      )}
      {uploadedImageUrl && !isLoading && (
        <div>
          <img
            src={uploadedImageUrl}
            alt="Uploaded Image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default BaseUploadImage;
