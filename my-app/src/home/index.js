import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Page } from "./styled";

const ArtworksComponent = ({ artwork_ids }) => {
  const [artworksData, setArtworksData] = useState([]);
  const api_url = "/129883";

  useEffect(() => {
    const makeApiRequests = async () => {
      try {
        const responses = await Promise.all(
          artwork_ids.map((id) =>
            fetch(`${api_url}${id}`).then((response) => response.json())
          )
        );

        const newArtworksData = responses.map((response) => response.data);
        setArtworksData(newArtworksData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    makeApiRequests();
  }, [api_url, artwork_ids]);

  return (
    <Page>
      <div id="artworks-container">
        {artworksData.map((artwork) => (
          <div key={artwork.id}>
            <h3>{artwork.title}</h3>
            <p>{artwork.description}</p>
          </div>
        ))}
      </div>
    </Page>
  );
};

ArtworksComponent.propTypes = {
  base_url: PropTypes.string,
  artwork_ids: PropTypes.arrayOf(PropTypes.number),
};

export default ArtworksComponent;
