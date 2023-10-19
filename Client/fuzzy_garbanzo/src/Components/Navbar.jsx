import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  HStack,
  Text,
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { FaHeart, FaUser,FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    
<Flex
      as="nav"
      p={4}
      alignItems="center"
      justifyContent="space-between"
      bg="blue.500"
      color="white"
    >
      <Heading size="md" fontFamily={`'Carattere', 'Dancing Script', cursive`}>Fuzzy-Garbanzo</Heading>

      <Box>
        <InputGroup size="md">
          <InputLeftElement
            pointerEvents="none"
            children={<FaSearch color="black" />}
          />
          <Input
            type="text"
            placeholder="Search..."
            borderColor="white"
            borderRadius="full"
            bg="white"
            color="gray"
          />
        </InputGroup>
      </Box>

      <HStack spacing={4}>
        <IconButton
          aria-label="Favorites"
          icon={<FaHeart />}
          size="sm"
        />

        <Menu>
          <MenuButton as={IconButton} aria-label="User" icon={<FaUser />} size="sm" variant="outline" />
          <MenuList color={'gray'}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
    
    
  );
};

export default Navbar;
