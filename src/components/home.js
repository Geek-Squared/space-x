import React from "react";
import { Flex, Box, Text, Stack, Link } from "@chakra-ui/core";
import { ArrowRight } from "react-feather";
import { Link as BrowserLink } from "react-router-dom";
import { Trans } from "@lingui/macro";

export default function Home() {
  return (
    <Stack m="6" spacing="6">
      <PageLink url="/launches"><Trans>Browse SpaceX Launches</Trans></PageLink>
      <PageLink url="/launch-pads"><Trans>Browse SpaceX Launch Pads</Trans></PageLink>
    </Stack>
  );
}

function PageLink({ url, children, ...rest }) {
  return (
    <Link as={BrowserLink} to={url} {...rest}>
      <Flex
        justifyContent="space-between"
        p="6"
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
      >
        <Text fontSize="lg">{children}</Text>
        <Box as={ArrowRight} />
      </Flex>
    </Link>
  );
}
