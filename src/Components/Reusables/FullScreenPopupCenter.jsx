import { useEffect } from "react";
import { useApplicationManager } from "../../contexts/ApplicationContext";
import { motion } from "framer-motion";

const FullScreenPopupCenter = () => {
  const { fullScreenPopCenter, deactivatePopupCenter } =
    useApplicationManager();
  // Adding ESC to disable the popup: Keyboard control -> Good UX
  useEffect(() => {
    // Add an event listener to listen for the ESC key press
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        // Call the deactivatePopupCenter function when ESC is pressed
        deactivatePopupCenter();
      }
    };
    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);
    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [deactivatePopupCenter]);
  const childComponentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.2 } },
  };

  if (!fullScreenPopCenter.isActive) {
    return;
  }
  return (
    <motion.div
      className="w-screen h-screen fixed top-0 left-0 bg-[#0a0a0a4f] backdrop-blur-md z-[10000000] flex justify-center items-end overflow-y-scroll"
      onClick={deactivatePopupCenter}
      initial={{ backdropFilter: "blur(0px)" }}
      animate={{ backdropFilter: "blur(10px)", transition: { duration: 0.05 } }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={childComponentVariants}
        className="absolute z-[150] w-full h-full flex justify-center items-center"
      >
        {fullScreenPopCenter.component}
      </motion.div>
    </motion.div>
  );
};

export default FullScreenPopupCenter;
