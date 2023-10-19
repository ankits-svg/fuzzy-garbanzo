import React, { useEffect, useState } from 'react';
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react';

import { MdCheckCircle, MdLocalShipping } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const Details = ({ recipe }) => {
  const { id } = useParams();
  const [foodData, setFoodData] = useState([]);

  // Fetch data from local storage when the component mounts
  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const food = JSON.parse(localStorage.getItem('food'));
      setFoodData(food);
    };

    fetchDataFromLocalStorage();
  }, []);

  if (!foodData || foodData.length === 0) {
    return <div>Loading...</div>;
  }

  const match = foodData.find((el) => el.id === +id);

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={match.image}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {match.title}
            </Heading>
            <Text fontWeight={300} fontSize={'2xl'}>
            ₹{match.pricePerServing}
            </Text>
          </Box>

          <Stack spacing={{ base: 4, sm: 6 }} direction={'column'} divider={<StackDivider />}>
            <VStack spacing={{ base: 4, sm: 6 }}>
                <Heading>Instructions</Heading>
              <Text fontSize={'2xl'} fontWeight={'300'}>
                {match.instructions.replace(/<[^>]*>/g, '')}
              </Text>
              <Heading>Ingredients</Heading>
              {match.extendedIngredients.length>0 && match.extendedIngredients.map(e=>{
            return <List spacing={3} key={e.id}>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        {e.aisle} &#61;&#62; {e.measures.metric.amount}{e.measures.metric.unitLong} || {e.name}&#61;&#62;{e.original}
                    </ListItem>
                    
                    </List>
              })}
            </VStack>
            <Box>
              <Text fontSize={{ base: '16px', lg: '18px' }} fontWeight={'500'} textTransform={'uppercase'} mb={'4'}>
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>HealthScore:{match.healthScore}</ListItem>
                  <ListItem>Time required to prepared:{match.readyInMinutes}min</ListItem>
                  <ListItem>Source Name: <a href={match.sourceUrl} target='_blank'>{match.sourceName}</a> </ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Vegetarian: {match.vegetarian===false ? "False" : "True"}</ListItem>
                  <ListItem>Healthy: {match.veryHealthy===true ? "True" : "False"}</ListItem>
                  <ListItem>GlutenFree: {match.glutenFree===false ? "False" : "True" }</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            {/* <Box>
              <Text fontSize={{ base: '16px', lg: '18px' }} fontWeight={'500'} textTransform={'uppercase'} mb={'4'}>
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Between lugs:
                  </Text>{' '}
                  20 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Bracelet:
                  </Text>{' '}
                  leather strap
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case:
                  </Text>{' '}
                  Steel
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case diameter:
                  </Text>{' '}
                  42 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Dial color:
                  </Text>{' '}
                  Black
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Crystal:
                  </Text>{' '}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective treatment inside
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Water resistance:
                  </Text>{' '}
                  5 bar (50 metres / 167 feet)
                </ListItem>
              </List>
            </Box> */}
          </Stack>

          <Button
          colorScheme="blue"
          size="sm"
          variant="outline"
            rounded={'none'}
            w={'full'}
            mt={8}
            py={'7'}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Save Item
          </Button>

          
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default Details;
