import { useEffect, useState } from "react";

const SingleImage = ({ id }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`https://darshboard.com/wp-json/wp/v2/media/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setImage(data);
      })
      .catch((error) => console.error("Error fetching image:", error));
  }, [id]);

  if (!image) return <p>Loading...</p>;

  return (
    <div>
      <img src={image.source_url} alt={image.title.rendered} width="200" />
    </div>
  );
};

export default SingleImage;
