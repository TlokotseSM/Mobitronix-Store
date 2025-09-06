import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { useAuthStore } from "../store/auth";

const AccountPage = () => {
  const { user } = useAuthStore();

  if (!user) return <Text>Not logged in.</Text>;

  return (
    <Container maxW="container.sm" py={8}>
      <Box p={6} bg="white" rounded="lg" shadow="md">
        <Heading mb={2}>Account</Heading>
        <Text>Name: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Role: {user.role}</Text>
      </Box>
    </Container>
  );
};

export default AccountPage;
