import { Box, Container, Heading, Text, Image, Button, VStack, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import { useAuthStore } from "../store/auth";
import { useCartStore } from "../store/cart";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { selectedProduct, fetchProduct } = useProductStore();
  const { token } = useAuthStore();
  const { addToCart } = useCartStore();
  const toast = useToast();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const handleAddToCart = async () => {
    await addToCart(id, 1, token);
    toast({ title: "Added to cart", status: "success" });
  };

  if (!selectedProduct) return null;

  return (
    <Container maxW="container.md" py={8}>
      <VStack align="start" spacing={6}>
        <Image src={selectedProduct.thumbnail} alt={selectedProduct.title} boxSize="300px" />
        <Heading>{selectedProduct.title}</Heading>
        <Text fontSize="xl">R{selectedProduct.price}</Text>
        <Text>{selectedProduct.description}</Text>
        <Button colorScheme="blue" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </VStack>
    </Container>
  );
};

export default ProductDetailPage;
