import { useEffect, RefObject } from "react";

const useOutsideClick = (ref: RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if ref exists and target is outside the element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    // Add event listener for mousedown on document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]); // Include both ref and handler in dependency array
};
export default useOutsideClick;
