import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const handleSignin = () => {
    setLoading(true);

    const payload = {
      email,
      password
    };

    fetch("http://localhost:4100/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        localStorage.setItem('token',res.token)
        if (res.msg === 'Login Successfull!!') {
          localStorage.setItem('userLogin',JSON.stringify(res.data))
          toast({
            title: 'Login successful',
            description: "You've successfully logged in to your account.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          // Redirect to the home page on successful login
          setShowSuccess(true);
          setTimeout(()=>{
            navigate('/home');
          },2000)
        } else {
          toast({
            title: 'Login Error',
            description: res.msg,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Login Error',
          description: err.msg,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={bgColor}
      backgroundImage={
        'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    >
      {!showSuccess ? (
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} color={'white'}>
            Sign In
          </Heading>
          <Text fontSize={"lg"} color={"white"}>
            Discover a world of exciting flavors and recipes! 🍽️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={bgColor}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignin}
                disabled={loading} 
              >
                {loading ? 
                <Spinner color='red.500' />
                : "Sign in"}
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              New user? <Link color={"blue.400"} to={"/"}>Signup</Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
      )
      :
      (<Spinner
        color="red.500"
        style={{ margin: "auto" }}
        height={50}
        width={50}
      />)}
    </Flex>
  );
};

export default Login;
