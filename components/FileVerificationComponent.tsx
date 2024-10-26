import React, { useState } from "react";
import { useVerifyFile } from "@/hooks/file/useVerifyFile";

const FileVerificationComponent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { result, error, loading } = useVerifyFile(selectedFile as File);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <h1>File Verification</h1>
      <input type="file" onChange={handleFileChange} />

      <button onClick={() => setSelectedFile(selectedFile)} disabled={!selectedFile || loading}>
        {loading ? "Verifying..." : "Verify File"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {result && <p>Verification Result: {result}</p>}
    </div>
  );
};

export default FileVerificationComponent;
