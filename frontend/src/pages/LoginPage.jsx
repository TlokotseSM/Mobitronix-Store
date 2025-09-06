import { Box, Button, Container, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const toast = useToast();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast({ title: "Fields missing", status: "error" });
      return;
    }
    const data = await loginUser(form.email, form.password);
    if (data.token) {
      login(data.user, data.token);
      toast({ title: "Logged in", status: "success" });
      navigate("/");
    } else {
      toast({ title: data.message || "Login failed", status: "error" });
    }
  };

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8}>
        <Heading>Login</Heading>
        <Box w="full" p={6} rounded="lg" shadow="md" bg="white">
          <VStack spacing={4}>
            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <Button colorScheme="blue" w="full" onClick={handleLogin}>
              Login
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default LoginPage;
