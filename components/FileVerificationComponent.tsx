import React, { useState } from "react";
import { useVerifyFileMetadata } from "@/hooks/file/useVerifyFileMetadata";
import { useStoreFile } from "@/hooks/file/useStoreFile";
import { FileData } from "@/types/schema";

const FileVerificationComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<string | null>(null);
  const [fileData, setFileData] = useState<FileData | null>(null);

  const { result: verificationResult, error: verificationError, loading: verificationLoading, verifyMetadata } = useVerifyFileMetadata(metadata);
  const { result: storageResult, error: storageError, loading: storageLoading, storeFile } = useStoreFile(fileData);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const extractedMetadata = `File name: ${selectedFile.name}, Size: ${selectedFile.size} bytes, Last modified: ${new Date(selectedFile.lastModified)}`;
      setMetadata(extractedMetadata);
    }
  };

  const handleVerifyMetadata = async () => {
    await verifyMetadata();

    if (verificationResult && typeof verificationResult === "object" && verificationResult.data && verificationResult.data.fileInfo) {
      const { fileInfo } = verificationResult.data;

      const preparedFileData: FileData = {
        fileInfo: {
          file: {
            UID: "fipjsda90fsda",
            size: fileInfo.file.size || 0,
            Status: fileInfo.file.Status || "received",
            FH: fileInfo.file.FH || "",
          },
          fileSignature: fileInfo.fileSignature || "",
          fileHash: fileInfo.fileHash || "",
          totalEncryptedChunkFile: fileInfo.totalEncryptedChunkFile || 0,
        },
      };

      setFileData(preparedFileData);
    } else {
      console.warn("Verification result does not contain expected file information.");
    }
  };

  return (
    <div>
      <h1>File Metadata Verification and Storage</h1>
      <input type="file" onChange={handleFileChange} />

      <button onClick={handleVerifyMetadata} disabled={!metadata || verificationLoading}>
        {verificationLoading ? "Verifying..." : "Verify Metadata"}
      </button>

      {verificationError && <p style={{ color: "red" }}>Verification Error: {verificationError.message}</p>}

      {verificationResult && (
        <div>
          <h2>Verification Result:</h2>
          {typeof verificationResult === "object" ? <pre>{JSON.stringify(verificationResult, null, 2)}</pre> : <p>{verificationResult}</p>}
        </div>
      )}

      <br />
      {fileData ? (
        <div>
          <h2>File Data:</h2>
          <pre>{JSON.stringify(fileData, null, 2)}</pre>
        </div>
      ) : (
        "No file data available"
      )}
      <br />

      {/* Store file button is only enabled after fileData is prepared */}
      <button onClick={storeFile} disabled={!fileData || storageLoading}>
        {storageLoading ? "Storing..." : "Store File"}
      </button>

      {storageError && (
        <p style={{ color: "red" }}>
          Storage Error: {storageError.message} {storageError.response?.data && `- Server response: ${JSON.stringify(storageError.response.data)}`}
        </p>
      )}

      {storageResult && (
        <div>
          <h2>Storage Result:</h2>
          {typeof storageResult === "object" ? <pre>{JSON.stringify(storageResult, null, 2)}</pre> : <p>{storageResult}</p>}
        </div>
      )}
    </div>
  );
};

export default FileVerificationComponent;
