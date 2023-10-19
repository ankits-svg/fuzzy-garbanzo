import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Button,
  IconButton,
  Tooltip,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const HomePage = ({ recipe }) => {
    const navigate=useNavigate()
  const handleDetails = (id) => {
    console.log("id:", id);
    localStorage.setItem("lastId",id)
    navigate(`/details/${id}`)
  };
  return (
    <Box>
      {/* Navbar */}
      <Box position="fixed" top="0" left="0" right="0" zIndex="999">
        <Navbar />
      </Box>

      <Box p={6} mt={20}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {recipe.map((el) => (
            <GridItem key={el.id}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="sm"
              >
                <Image src={el.image} alt={el.title} />

                <Box p="6">
                  <Text fontSize="xl" fontWeight="semibold">
                    {el.title
                      .replace(/\([^)]*\)|\[[^\]]*\]|&|\s*:\s*/g, "")
                      .trim()}
                  </Text>
                  {el.dishTypes.length > 0 ? (
                    <Text fontSize="sm" fontStyle="italic">
                      Dish Types: {el.dishTypes.slice(0, 3).join(", ")}
                    </Text>
                  ) : (
                    <Text fontSize="sm" fontStyle="italic">
                      Dish Types: "Let's discover it"
                    </Text>
                  )}
                  {el.cuisines.length > 0 ? (
                    <Text fontSize="sm" fontStyle="italic">
                      Cuisines: {el.cuisines.join(", ")}
                    </Text>
                  ) : (
                    <Text fontSize="sm" fontStyle="italic">
                      Cuisines: "Let's discover it"
                    </Text>
                  )}
                  {el.diets.length > 0 ? (
                    <Text fontSize="sm" fontStyle="italic">
                      Specialities: {el.diets.slice(0, 3).join(", ")}
                    </Text>
                  ) : (
                    <Text fontSize="sm" fontStyle="italic">
                      Specialities: "Let's discover it"
                    </Text>
                  )}
                </Box>

                <Box p="2" borderTopWidth="1px" borderColor="gray.200">
                  <Flex justify="space-around" alignItems="center">
                    <Button
                      colorScheme="blue"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDetails(el.id)}
                    >
                      View Details
                    </Button>
                    <HStack spacing={2}>
                      <Tooltip
                        label="Bookmark Recipe"
                        aria-label="Bookmark Recipe"
                      >
                        <IconButton
                          icon={<FaHeart />}
                          color="red.500"
                          variant="ghost"
                          aria-label="Bookmark Recipe"
                          size="lg"
                        />
                      </Tooltip>
                    </HStack>
                  </Flex>
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
