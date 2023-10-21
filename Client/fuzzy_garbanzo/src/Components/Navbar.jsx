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
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Show, Hide } from '@chakra-ui/react'

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
  const userLogin=JSON.parse(localStorage.getItem('userLogin'))
  const first=userLogin.first;
  const last=userLogin.last;
  const [flag,setFlag]=useState(false)
  const navigate = useNavigate();

  const a=useColorModeValue('gray.200', 'gray.700')
  const handleLogout = () => {
    setFlag(!flag)
    navigate('/login');
  };

  const handleProfile=()=>{
    navigate("/profile")
  }

  const handleLogin=()=>{
    navigate("/login")
  }
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
                <Flex alignItems={'center'} gap={2}>
                <Avatar size="sm" name={`${first} ${last}`} src="url_of_default_image" color={'white'}/>
                <Hide size={'sm'}>{flag===true ? "" : <Text>{first}{" "}{last}</Text>}</Hide>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogin}>Try with diffrent account</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            <Box
                as="a"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: a,
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
                  bg: a,
                }}
                href={Links[1].path}>
                {Links[1].text}
              </Box>
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