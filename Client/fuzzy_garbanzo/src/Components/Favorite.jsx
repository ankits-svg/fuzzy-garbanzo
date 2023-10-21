import { Box, Center, Divider, Spinner, Text, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate=useNavigate()
  const key="10f1f1df1f984a679ca56831956747fb"
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userLogin"));
    

    fetch(
      `http://localhost:4100/recipe/saved?apiKey=${key}&userId=${userData._id}`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log("favorite:", res.data);
        if(res.data===undefined){
          navigate("*")
        }
        setSavedRecipes(res.data);
        setMsg(res.msg);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Text fontSize="2xl" fontWeight="semibold" mb={4}>
        Favorite Recipes
      </Text>
      {loading ? (
        <Center>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Center>
      ) : (
        <Box>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={4}
          >
            {savedRecipes.map((recipe) => (
              <GridItem key={recipe._id}>
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">
                  <img src={recipe.image} alt={recipe._id} />
                  <Text fontSize="xl" fontWeight="semibold">
                    {recipe.title}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      )}
      <Divider mt={4} />
      <Text fontSize="sm" mt={4} color="gray.600">
        Powered by Fuzzy-Garbanzo
      </Text>
    </Box>
  );
};

export default Favorite;
