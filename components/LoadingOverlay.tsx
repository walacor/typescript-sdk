import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  setupStage: string;
  loading: boolean;
  isConfigured: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ setupStage, loading, isConfigured }) => {
  const [progress, setProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const sessionConfigured = sessionStorage.getItem("userConfigured");

    if (sessionConfigured === "true" || isConfigured) {
      setShowOverlay(false);
      return;
    }

    switch (setupStage) {
      case "Setting Up User...":
        setProgress(20);
        break;
      case "Creating Schemas...":
        setProgress(50);
        break;
      case "Adding Permissions...":
        setProgress(80);
        break;
      case "Done":
        setProgress(100);
        setTimeout(() => {
          setShowOverlay(false);
          sessionStorage.setItem("userConfigured", "true");
        }, 2000);
        break;
      default:
        setProgress(0);
    }
  }, [setupStage, isConfigured]);

  if (!loading || !showOverlay || isConfigured) return null;

  return (
    <motion.div
      className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-8"
      initial={{ opacity: 0 }} // Fade in effect
      animate={{ opacity: 1 }} // During showing
      exit={{ opacity: 0 }} // Fade out effect
      transition={{ duration: 0.5 }} // Duration of fade-in and fade-out
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.95 }} // Shrink and fade on entry
        animate={{ opacity: 1, scale: 1 }} // Fully show and expand to normal size
        exit={{ opacity: 0, scale: 0.95 }} // Shrink and fade on exit
        transition={{ duration: 0.3 }} // Duration of the content animation
      >
        <div className="flex items-center justify-center mb-4">
          <svg className="animate-spin w-8 h-8 text-primary mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h1.5M12 4v1.5M19.5 12H21M12 19.5V21M16.24 7.76l-1.06 1.06M7.76 16.24l1.06-1.06M16.24 16.24l-1.06-1.06M7.76 7.76l1.06 1.06" />
          </svg>
          <h4 className="text-2xl ml-2 text-gray-800 animate-pulse">{setupStage}</h4>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 transition-all duration-500">
          <motion.div className="bg-primary h-4 rounded-full transition-all" style={{ width: `${progress}%` }} transition={{ ease: "easeOut", duration: 0.5 }}></motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingOverlay;
