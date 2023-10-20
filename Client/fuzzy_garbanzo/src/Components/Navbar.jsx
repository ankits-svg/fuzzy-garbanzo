// import React, { useState } from 'react';
// import {
//   Box,
//   Flex,
//   Heading,
//   Input,
//   HStack,
//   Text,
//   Image,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Spacer,
//   InputGroup,
//   InputLeftElement,
//   InputRightElement,
//   useDisclosure
// } from '@chakra-ui/react';
// import { FaHeart, FaUser,FaSearch } from 'react-icons/fa';
// import {
//   Drawer,
//   DrawerBody,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
// } from '@chakra-ui/react'

// const Navbar = ({handleSearch}) => {

//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchdata, setSearchdata] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [draw,setDraw]=useState(false)
//   const { isOpen, onOpen, onClose } = useDisclosure()

//   // const handleSearch = () => {
//   //   if (!searchTerm) {
//   //     return;
//   //   }
//   //   setLoading(true);
//   //   fetch(`http://localhost:4100/recipe/search?apiKey=17be99a7ad524f6eaf2e4da9306f6427&query=${searchTerm}`)
//   //     .then((res) => res.json())
//   //     .then((res) => {
//   //       console.log(res.Data)
//   //       setSearchdata(res.Data);
//   //       setDraw(true)
//   //       setLoading(false);
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //       setLoading(false);
//   //     });
//   // };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };



//   return (
    
// <Flex
//       as="nav"
//       p={4}
//       alignItems="center"
//       justifyContent="space-between"
//       bg="blue.500"
//       color="white"
//     >
//       <Heading size="md" fontFamily={`'Carattere', 'Dancing Script', cursive`}>Fuzzy-Garbanzo</Heading>

//       <Box>
//         <InputGroup size="md">
          
//           <Input
//             type="text"
//             placeholder="Search..."
//             borderColor="white"
//             borderRadius="full"
//             bg="white"
//             color="gray"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyPress={handleKeyPress}
//           />
//           <InputRightElement
//             pointerEvents="auto"
//             onClick={handleSearch}
//             children={<FaSearch color="black" cursor={'pointer'}/>}
//           />
//         </InputGroup>
//       </Box>

//       <HStack spacing={4}>
//         <IconButton
//           aria-label="Favorites"
//           icon={<FaHeart />}
//           size="sm"
//         />

//         <Menu>
//         <MenuItem icon={<FaHeart/>}>Favorite</MenuItem>
//         <MenuButton
//           as={IconButton}
//           aria-label="Search"
//           icon={<FaSearch />}
//           size="sm"
//           variant="outline"
//         />
//         <MenuItem icon={<FaUser/>}>Profile</MenuItem>
//         </Menu>
//       </HStack>
//     </Flex>
    
    
//   );
// };

// export default Navbar;

'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom';


interface Props {
  children: React.ReactNode
}

const Links = [
  { text: 'Favorite', path: '/fav' },  // Define the path for "Favorite"
  { text: 'SearchPage', path: '/search' },  // Define the path for "SearchPage"
];

const NavLink = (props: Props) => {
  const { children,path } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={props.path}>
      {children}
    </Box>
  )
}

const Navbar=()=> {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link to={"/home"}><Box cursor={'pointer'} fontFamily={`'Carattere', 'Dancing Script', cursive`}>Fuzzy-Garbanzo</Box></Link>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {/* {Links.map((link) => (
                <NavLink key={link.text} to={link.path}>{link.text}</NavLink>
              ))} */}
              <Box
                as="a"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={Links[0].path}>
                {Links[0].text}
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={Links[1].path}>
                {Links[1].text}
              </Box>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.text}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
      {/* <HomePage/> */}
    </>
  )
}
export default Navbar;