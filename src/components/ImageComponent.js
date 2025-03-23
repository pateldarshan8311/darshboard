import { useState, useEffect } from "react";

const ImageComponent = ({ imageId }) => {
  const [imageData, setImageData] = useState({ src: "", alt: "" });

  useEffect(() => {
    fetch("https://darshboard.com/wp-json/wp/v2/media")
      .then((res) => res.json())
      .then((data) => {
        const image = data.find((img) => img.id === imageId);
        if (image) {
          setImageData({
            src: image.source_url,
            alt: image.alt_text || "No description",
          });
        }
      })
      .catch((error) => console.error("Error fetching image:", error));
  }, [imageId]);

  return imageData.src ? (
    <img src={imageData.src} alt={imageData.alt} />
  ) : (
    <p>Loading...</p>
  );
};

export default ImageComponent;
