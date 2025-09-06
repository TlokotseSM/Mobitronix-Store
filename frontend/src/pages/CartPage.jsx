import { Box, Button, Container, Heading, Text, VStack, HStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useCartStore } from "../store/cart";
import { useAuthStore } from "../store/auth";

const CartPage = () => {
  const { cart, fetchCart, removeFromCart } = useCartStore();
  const { token } = useAuthStore();
  const toast = useToast();

  useEffect(() => {
    fetchCart(token);
  }, []);

  if (!cart?.products) return <Text>No items in cart</Text>;

  return (
    <Container maxW="container.md" py={8}>
      <Heading mb={4}>Your Cart</Heading>
      <VStack spacing={4} align="stretch">
        {cart.products.map((item) => (
          <HStack key={item.product._id} justify="space-between">
            <Text>{item.product.title}</Text>
            <Text>
              {item.quantity} x R{item.price} = R{item.quantity * item.price}
            </Text>
            <Button
              colorScheme="red"
              size="sm"
              onClick={async () => {
                await removeFromCart(item.product._id, token);
                toast({ title: "Removed from cart", status: "success" });
              }}
            >
              Remove
            </Button>
          </HStack>
        ))}
      </VStack>
      <Box mt={6}>
        <Text fontWeight="bold">
          Total: R{cart.total} | Discounted: R{cart.discountedTotal}
        </Text>
      </Box>
    </Container>
  );
};

export default CartPage;
