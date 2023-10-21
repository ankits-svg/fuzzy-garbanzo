import React, { useEffect, useState } from "react";
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
  Input,
  useToast,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  
    const [saved,setSaved]=useState(false)
    const toast = useToast();
    const navigate=useNavigate()
    const [rec,setRec]=useState([])
    const key="10f1f1df1f984a679ca56831956747fb"
    const num=15
    useEffect(()=>{
      fetch(`https://api.spoonacular.com/recipes/random?apiKey=${key}&number=${num}`).then(res=>res.json()).then(res=>{
        // console.log(res)
        setRec(res.recipes)
        localStorage.setItem('food',JSON.stringify(res.recipes))
      }).catch(err=>{
        console.log(err)
      })
    },[])



  const handleDetails = (id) => {
    // console.log("id:", id);
    // localStorage.setItem("lastId",id)
    navigate(`/details/${id}`)
  };
  const user=JSON.parse(localStorage.getItem('userLogin'))

  const handleBookmark=(el)=>{
    fetch(`http://localhost:4100/recipe/saved?apiKey=17be99a7ad524f6eaf2e4da9306f6427&userId=${user._id}`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({ userId:user._id, recipeId:el.id, title: el.title, image: el.image })
    }).then(res=>res.json()).then(res=>{
      // console.log(res)
      setSaved(true);
          toast({
            title: 'Item saved to favorites',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
    }).catch(err=>{
      console.log(err)
    })
  }
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
          {rec.map((el) => (
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
                          onClick={()=>handleBookmark(el)}
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
