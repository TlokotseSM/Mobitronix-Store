import { Box, Button, Container, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { registerUser } from "../api/api";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const toast = useToast();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      toast({ title: "Fields missing", status: "error" });
      return;
    }
    const data = await registerUser(form);
    if (data.token) {
      login(data.user, data.token);
      toast({ title: "Registered", status: "success" });
      navigate("/");
    } else {
      toast({ title: data.message || "Registration failed", status: "error" });
    }
  };

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8}>
        <Heading>Register</Heading>
        <Box w="full" p={6} rounded="lg" shadow="md" bg="white">
          <VStack spacing={4}>
            <Input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
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
            <Button colorScheme="blue" w="full" onClick={handleRegister}>
              Register
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default RegisterPage;
