// import { Box, useColorModeValue} from '@chakra-ui/react';
// import { Route, Routes } from 'react-router-dom';

// import CreatePage from './pages/CreatePage';
// import HomePage from './pages/HomePage';
// import Navbar from './components/Navbar';

// function App() {

//   return (
//     <>
//       <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
//         <Navbar />
//           <Routes>
//             <Route path='/' element={<HomePage />} />
// 				    <Route path='/create' element={<CreatePage />} />
//           </Routes>
//       </Box>
//     </>
//   );
// }

// export default App


import { Box, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Box>
  );
}

export default App;
