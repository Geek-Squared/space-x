import React, { useState } from "react";
import { Heart } from "react-feather";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/core";
import { useSpaceX } from "../utils/use-space-x";

const AddToFavorites = ({ id }) => {
  const [favorite, setFavorite] = useState(false);
  let { launchId } = useParams();
  const { data: launch } = useSpaceX(`/launches/${launchId}`);

  // This function sets the favorite state to true or false
  const handleFavorite = () => {
    setFavorite(!favorite);
    let storageItems = {
      image: launch.links.flickr_images[0],
      missionName: launch.mission_name
    };
    //this saves our launch id in local storage so we can access it later
    if (!favorite) {
      localStorage.setItem("favorite" + launchId, JSON.stringify(storageItems));
    } else {
     localStorage.removeItem("favorite" + launchId);
    }
  };

  return (
    <div>
      {favorite ? (
        <Button onClick={handleFavorite} backgroundColor="none" id={id}>
          <Heart fill={favorite ? "red" : ""} size={20} />
        </Button>
      ) : (
        <Button onClick={handleFavorite} backgroundColor="none" id={id}>
          <Heart size={20} />
        </Button>
      )}
    </div>
  );
};

export default AddToFavorites;
