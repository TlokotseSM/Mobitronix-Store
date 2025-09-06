// import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
// import { Link } from 'react-router-dom'

// import { PlusSquareIcon } from "@chakra-ui/icons";
// import { IoMoon } from "react-icons/io5";
// import { LuSun } from "react-icons/lu";

// const Navbar = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return ( 
//   <Container maxW={"1140px"} px={4}>
//     <Flex
//     h={16}
//     alignItems={"center"}
//     justifyContent={"space-between"}
//     flexDir={{
//       base:"column",
//       sm:"row"
//     }}
//     >
//       <Text
//         fontSize={{ base: "22", sm: "28" }}
//         fontWeight={"bold"}
//         textTransform={"uppercase"}
//         textAlign={"center"}
//         bgGradient={"linear(to-r, cyan.400, blue.500)"}
//         bgClip={"text"}
//         >
//           <Link to={'/'}>Tlokotse's Mobitronix Store 🛒</Link>
        
//       </Text>

//       <HStack spacing={2} alignItems={"center"}>
//         <Link to={"/create"}>
//           <Button>
//             <PlusSquareIcon fontSize={20} />
//           </Button>
//         </Link>
//         <Button onClick={toggleColorMode}>
//           {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
//         </Button>
//       </HStack>

//     </Flex>
//   </Container>
//   );
// };
// export default Navbar

import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useAuthStore } from '../store/auth';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuthStore();

  return (
    <Container maxW={"1140px"} px={4} mb={6}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textTransform="uppercase"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Mobitronix Store 🛒</Link>
        </Text>
        <HStack spacing={4}>
          {user ? (
            <>
              <Link to="/account">
                <Button>Account</Button>
              </Link>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
          <Link to="/cart">
            <Button>Cart</Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
