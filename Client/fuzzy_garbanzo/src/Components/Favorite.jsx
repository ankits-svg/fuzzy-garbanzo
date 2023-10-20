import { Box, Center, Divider, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const Favorite = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user,setUser]=useState(null)
    useEffect(()=>{
        const userData=JSON.parse(localStorage.getItem("userData"))
        setUser(userData._id)
        fetch(`http://localhost:4100/recipe/saved?apiKey=17be99a7ad524f6eaf2e4da9306f6427&userId=${user}`).then(res=>res.json()).then(res=>{
            console.log("favorite:",res)
            setSavedRecipes(res.data)
            setLoading(false);
        }).catch(err=>{
            console.log(err)
            setLoading(false);
        })
    },[])
  return (
    
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Text fontSize="2xl" fontWeight="semibold" mb={4}>
          Favorite Recipes
        </Text>
        {loading ? (
          <Center>
            <Spinner size="lg" />
          </Center>
        ) : (
          <Box>
            <h1>Ankit</h1>
          </Box>
        )}
        <Divider mt={4} />
        <Text fontSize="sm" mt={4} color="gray.600">
          Powered by Fuzzy-Garbanzo
        </Text>
      </Box>
    
  )
}

export default Favorite
