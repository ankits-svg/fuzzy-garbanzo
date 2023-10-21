import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Text,
  TableContainer,
} from "@chakra-ui/react";

const ProfilePage = () => {
  const [obj, setObj] = useState({});
  const [data,setData]=useState([])
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const key='10f1f1df1f984a679ca56831956747fb'
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    setObj(user);

    fetch(
      `http://localhost:4100/recipe/saved?userId=${user._id}&apiKey=${key}`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.data);
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box>
      {/* Top Navbar */}
      <Flex
        as="nav"
        p={4}
        alignItems="center"
        justifyContent="space-between"
        bg="blue.500"
        color="white"
      >
        <Heading
          size="md"
          fontFamily={`'Carattere', 'Dancing Script', cursive`}
        >
          Fuzzy-Garbanzo
        </Heading>
        {/* Your top navbar content */}
      </Flex>

      {/* Profile Info Container */}
      <Flex
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        mt={4}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        alignItems="center"
        justifyContent="center"
      >
        <Avatar
          size={{ base: "xl"}}
          name={`${obj.first} ${obj.last}`}
          src="url_of_default_image"
        />
        <Box ml={{ base: 0, md: 4, lg: 4 }}>
          <Heading as="h2" size={{ base: "lg", md: "xl", lg: "2xl" }}>
            {`${obj.first} ${obj.last}`}
          </Heading>
          <Text>
            <strong>Email:</strong> {obj.email}
          </Text>
          <Text>
            <strong>Location:</strong> {obj.place}
          </Text>
          <Text>
            <strong>UserId:</strong> {obj._id}
          </Text>
          <Text>
            <strong>Account Creation:</strong>{" "}
            {new Date(obj.createdAt).toLocaleString("en-US", options)}
          </Text>
        </Box>
      </Flex>

      {/* Table Container */}
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" mt={4}>
        <TableContainer>
        <Table variant="simple" minW={{ base: "100%", sm: "800px", md: "100%" }}>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Title of Recipe</Th>
              <Th>Recipe Id</Th>
              <Th>Bookmarked On</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length>0 && data.map(e=>{
                return <Tr key={e._id}>
                <Td>{e._id}</Td>
                <Td>{e.title}</Td>
                <Td>{e.recipeId[0]}</Td>
                <Td>{e.createdAt}</Td>
              </Tr>
            })}
            {/* Add more rows as needed */}
          </Tbody>
        </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ProfilePage;
