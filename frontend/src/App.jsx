import { Box, Button } from '@chakra-ui/react'
import { Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Box minH={"100vh"}>
        {/* <NavBar></NavBar> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<CreatePage />} />
      </Box>
    </>
  )
}

export default App
