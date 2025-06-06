import { useState, useEffect } from "react";

const ImageComponent = ({ imageId }) => {
  const [imageData, setImageData] = useState({ src: "", alt: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageId) return;

    fetch(`https://darshboard.com/wp-json/wp/v2/media/${imageId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch image");
        return res.json();
      })
      .then((data) => {
        setImageData({
          src: data.source_url,
          alt: data.alt_text || "No description",
        });
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        setError("Image not found");
      });
  }, [imageId]);

  if (error) return <span style={{ color: "red" }}>{error}</span>;

  return imageData.src ? (
    <img src={imageData.src} alt={imageData.alt} />
  ) : (
    <p>Loading...</p>
  );
};

export default ImageComponent;
