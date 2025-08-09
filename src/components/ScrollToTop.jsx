import { FloatButton } from "antd";
import React, { useState, useEffect } from "react";
import { IoArrowUpOutline } from "react-icons/io5";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 100px
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isVisible && (
        <FloatButton
          icon={<IoArrowUpOutline/>}
          type="primary"
          style={{ insetInlineEnd: 40, insetBlockEnd: 40 }}
          onClick={scrollToTop}
        />
      )}
    </div>
  );
};

export default ScrollToTop;
