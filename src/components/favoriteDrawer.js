import React, { useRef } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useSpaceX } from "../utils/use-space-x";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Image,
  useDisclosure,
  Box,
  Heading,
  Link,
  Flex,
} from "@chakra-ui/core";
import { Heart } from "react-feather";
import { Trans } from "@lingui/macro";
import { XCircle } from "react-feather";
import Error from "./error";

const FavoriteDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  let { launchId } = useParams();
  const { data: launch, error } = useSpaceX(`/launches/${launchId}`);

  if (error) return <Error />;
  console.log(`launch`, launch)
  const removeFavorite = () => {
    localStorage.removeItem("favorite" + launchId);
    onClose();
  };

  // This function gets all items from the local storage
  function getAll() {
    let values = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values;
  }
  // This variable stores the parsed value, ie, turning a stringified object back to an object value
  const getMissions = Object.assign(
    {}
    //This is causing a cors error, so I'm commenting it out for now but it fetches the data from the local storage
    // ...getAll().map((item) => JSON.parse(item))
  );

  const { image, missionName } = getMissions;
  return (
    <>
      <Button ref={btnRef} color="gray.800" onClick={onOpen} size="md">
        <Trans>My Favorites</Trans> <Heart fill="red" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Favorites</DrawerHeader>

          <DrawerBody>
            <Heading as="h5" size="sm">
              Launches ({getAll().length})
            </Heading>

            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="sm"
              overflow="hidden"
              mt={3}
            >
              <Box display="flex" alignItems="baseline">
                <Box p="6">
                  <XCircle
                    fill="red"
                    style={{ marginLeft: "300px" }}
                    onClick={removeFavorite}
                    onMouseOver="pointer"
                  />
                  <Image src={image} alt="Mission Image" size="xs" />
                </Box>
              </Box>
              <Flex direction="column" p="6">
                <Heading>{missionName}</Heading>
                <Link
                  as={RouterLink}
                  to={`/launches/${launchId}`}
                >
                  <Button
                    mt={2}
                    color="#FFFFFF"
                    backgroundColor="gray.800"
                  >
                    Go To {missionName}
                  </Button>
                </Link>
              </Flex>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FavoriteDrawer;
