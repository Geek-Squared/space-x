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
  Flex,
} from "@chakra-ui/core";
import { Heart } from "react-feather";

const FavoriteDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  let { launchId } = useParams();
  const { data: launch, error } = useSpaceX(`/launches/${launchId}`);

  if (error) return <h1>Error...</h1>;
  
  // This function gets all items from the local storage
  function getAll() {
    let values = [],
      keys = Object.keys(sessionStorage),
      i = keys.length;

    while (i--) {
      values.push(sessionStorage.getItem(keys[i]));
    }

    return values;
  }

  const getMissions = getAll();
  // This variable stores the parsed value, ie, turning a stringified object back to an object value
  const { image, missionName } = JSON.parse(getMissions);

  return (
    <>
      <Button ref={btnRef} color="gray.800" onClick={onOpen} size="md">
        Favorites <Heart fill="red" />
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
              Launches ({getMissions.length})
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
                  <Image src={image} alt="Mission Image" size="xs" />
                </Box>
              </Box>
              <Flex direction="column" p="6">
                <Heading>{missionName}</Heading>
                <Button
                  mt={2}
                  color="#FFFFFF"
                  backgroundColor="gray.800"
                  onClick={`/launches/${launch.flight_number.toString()}`}
                >
                  Go To {missionName}
                </Button>
              </Flex>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FavoriteDrawer;
