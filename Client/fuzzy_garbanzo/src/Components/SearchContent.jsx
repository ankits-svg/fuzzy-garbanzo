import React, { useEffect, useState } from 'react';
import { Input, Button, Center, Box, Text, Divider, Spinner, Grid, GridItem, Image, Flex, HStack, Tooltip, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchContent = ({recipe}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [pass, setPass] = useState(false);
  const [all,setAll]=useState(false)
  const [title,setTitle]=useState('')
  const [img,setImg]=useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()
    // console.log("baharwala:",searchResult)
  const handleSearch = () => {
    setLoading(true);
    setPass(false);
    // Replace with your API URL
    fetch(`http://localhost:4100/recipe/search?apiKey=17be99a7ad524f6eaf2e4da9306f6427&query=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("searchresult:",data)
        setSearchResult(data.Data);
        if(data.Data.length===0){
            setAll(true)
            alert(`No search result for ${searchQuery}`)
        }
        setPass(true);
        setSearchQuery('')
      })
      .catch((error) => {
        console.error('Error:', error);
        setPass(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  useEffect(() => {
    if (searchResult) {
      // Simulate waiting for a few seconds to display the result
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [searchResult]);
  
  const handleDetails=(id)=>{
    console.log("id:",id)
    setAll(!all)
    const match=searchResult.find(el=>el.id===+id)
    console.log("match:",match)
    setTitle(match.title)
    setImg(match.image)
  }
  const handleClose=()=>{
    setAll(!all)
  }

  return (
    <>
          <Box margin={'auto'} p={6} borderWidth="1px" width="700px" display={'flex'} gap={3}>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              mb={4}
            />
            <Button colorScheme="blue" onClick={handleSearch} size="md" isFullWidth>
              {loading ? <Spinner size="sm" /> : 'Search'}
            </Button>
          </Box>
           {pass===false ? <Text>Search Your Dish or Recipe</Text> : <Box p={6} mt={20}>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={4}
            >
              {searchResult.length>0 && searchResult.map((el) => (
                <GridItem key={el.id}>
                  <Box
                    borderWidth="1px"
                    borderRadius="sm"
                    overflow="hidden"
                    boxShadow="sm"
                  >
                    <Box display="flex" justifyContent="center" alignItems="center">
                    <Image src={el.image} alt={el.title} />
                    </Box>

    
                    <Text fontSize="xl" fontWeight="semibold">
                    {el.title
                      .replace(/\([^)]*\)|\[[^\]]*\]|&|\s*:\s*/g, "")
                      .trim()}
                  </Text>
    
                    <Box p="2" borderTopWidth="1px" borderColor="gray.200">
                      <Flex justify="space-around" alignItems="center">
                        <Button
                          colorScheme="blue"
                          size="sm"
                          variant="outline"
                          onClick={()=>handleDetails(el.id)}
                        >
                          View Details
                        </Button>

                        <Modal isOpen={all} onClose={handleClose}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>{title}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                               
                            </ModalBody>
                                <Image src={img} alt={el.id}/>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={handleClose}>
                                Close
                                </Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>


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
          </Box>}
    </>
  );
};

export default SearchContent;
