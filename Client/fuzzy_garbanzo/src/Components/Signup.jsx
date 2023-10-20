"use client";
import React from "react";

// const Signup = () => {
//   return (
//     <div>

//     </div>
//   )
// }

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const bg=useColorModeValue("gray.50", "gray.800")
  const bb=useColorModeValue("white", "gray.700")
  const handleSignup = () => {
    let obj={
      first,
      last
    }
    localStorage.setItem("name",JSON.stringify(obj))
    const payload = {
      email,
      password,
      place: location,
    };
    console.log(payload);
    setLoading(false)
    fetch("http://localhost:4100/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("signupdata",res.data)
        
        localStorage.setItem('userData',JSON.stringify(res.data))
        setLoading(true)
        if(res.msg="Registration has been done"){
          navigate("/login")
        }
      })
      .catch((err) => {
        console.log(err.msg)
        setLoading(false)
      });
    setFirst("");
    setLast("");
    setEmail("");
    setPassword("");
    setLocation("");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={bg}
      backgroundImage={
        "url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Sign up
        </Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          to enjoy all of our cool features ✌️
        </Text>
      </Stack>
      <Box
        rounded={"lg"}
        bg={bb}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="place" isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSignup}
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user?{" "}
              <Link color={"blue.400"} to={"/login"}>
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
    </Flex>
  );
};

export default Signup;
