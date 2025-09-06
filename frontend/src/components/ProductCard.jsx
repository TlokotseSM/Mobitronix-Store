// import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
// import {
// 	Box,
// 	Button,
// 	Heading,
// 	HStack,
// 	IconButton,
// 	Image,
// 	Input,
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalFooter,
// 	ModalHeader,
// 	ModalOverlay,
// 	Text,
// 	useColorModeValue,
// 	useDisclosure,
// 	useToast,
// 	VStack,
// } from "@chakra-ui/react";
// import { useProductStore } from "../store/product";
// import { useState } from "react";

// const ProductCard = ({ product }) => {
// 	const [updatedProduct, setUpdatedProduct] = useState(product);

// 	const textColor = useColorModeValue("gray.600", "gray.200");
// 	const bg = useColorModeValue("white", "gray.800");

// 	const { deleteProduct, updateProduct } = useProductStore();
// 	const toast = useToast();
// 	const { isOpen, onOpen, onClose } = useDisclosure();

// 	const handleDeleteProduct = async (pid) => {
// 		const { success, message } = await deleteProduct(pid);
// 		if (!success) {
// 			toast({
// 				title: "Error",
// 				description: message,
// 				status: "error",
// 				duration: 3000,
// 				isClosable: true,
// 			});
// 		} else {
// 			toast({
// 				title: "Success",
// 				description: message,
// 				status: "success",
// 				duration: 3000,
// 				isClosable: true,
// 			});
// 		}
// 	};

// 	const handleUpdateProduct = async (pid, updatedProduct) => {
// 		const { success, message } = await updateProduct(pid, updatedProduct);
// 		onClose();
// 		if (!success) {
// 			toast({
// 				title: "Error",
// 				description: message,
// 				status: "error",
// 				duration: 3000,
// 				isClosable: true,
// 			});
// 		} else {
// 			toast({
// 				title: "Success",
// 				description: "Product updated successfully",
// 				status: "success",
// 				duration: 3000,
// 				isClosable: true,
// 			});
// 		}
// 	};

// 	return (
// 		<Box
// 			shadow='lg'
// 			rounded='lg'
// 			overflow='hidden'
// 			transition='all 0.3s'
// 			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
// 			bg={bg}
// 		>
// 			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

// 			<Box p={4}>
// 				<Heading as='h3' size='md' mb={2}>
// 					{product.name}
// 				</Heading>

// 				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
// 					R{product.price}
// 				</Text>

// 				<HStack spacing={2}>
// 					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
// 					<IconButton
// 						icon={<DeleteIcon />}
// 						onClick={() => handleDeleteProduct(product._id)}
// 						colorScheme='red'
// 					/>
// 				</HStack>
// 			</Box>

// 			<Modal isOpen={isOpen} onClose={onClose}>
// 				<ModalOverlay />

// 				<ModalContent>
// 					<ModalHeader>Update Product</ModalHeader>
// 					<ModalCloseButton />
// 					<ModalBody>
// 						<VStack spacing={4}>
// 							<Input
// 								placeholder='Product Name'
// 								name='name'
// 								value={updatedProduct.name}
// 								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
// 							/>
// 							<Input
// 								placeholder='Price'
// 								name='price'
// 								type='number'
// 								value={updatedProduct.price}
// 								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
// 							/>
// 							<Input
// 								placeholder='Image URL'
// 								name='image'
// 								value={updatedProduct.image}
// 								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
// 							/>
// 						</VStack>
// 					</ModalBody>

// 					<ModalFooter>
// 						<Button
// 							colorScheme='blue'
// 							mr={3}
// 							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
// 						>
// 							Update
// 						</Button>
// 						<Button variant='ghost' onClick={onClose}>
// 							Cancel
// 						</Button>
// 					</ModalFooter>
// 				</ModalContent>
// 			</Modal>
// 		</Box>
// 	);
// };
// export default ProductCard;


import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useAuthStore } from "../store/auth";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [editProduct, setEditProduct] = useState(product);
  const { token, user } = useAuthStore();
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    const res = await deleteProduct(product._id, token);
    if (res) {
      toast({ title: "Product deleted", status: "success" });
    }
  };

  const handleUpdate = async () => {
    const res = await updateProduct(product._id, editProduct, token);
    onClose();
    toast({ title: "Product updated", status: "success" });
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      shadow="md"
      rounded="lg"
      overflow="hidden"
      mb={4}
      p={4}
    >
      <Image src={product.thumbnail} alt={product.title} h={48} w="full" objectFit="cover" />
      <Heading size="md" mt={2}>
        <Link to={`/product/${product._id}`}>{product.title}</Link>
      </Heading>
      <Text fontWeight="bold" fontSize="xl" mt={2}>
        R{product.price}
      </Text>
      <Text fontSize="sm">{product.description}</Text>
      <HStack spacing={2} mt={3}>
        {(user?.role === "admin" || user?.role === "vendor") && (
          <>
            <IconButton icon={<EditIcon />} onClick={onOpen} />
            <IconButton icon={<DeleteIcon />} onClick={handleDelete} colorScheme="red" />
          </>
        )}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <input value={editProduct.title} onChange={e => setEditProduct({ ...editProduct, title: e.target.value })} placeholder="Product Title" />
              <input value={editProduct.price} type="number" onChange={e => setEditProduct({ ...editProduct, price: e.target.value })} placeholder="Price" />
              <input value={editProduct.thumbnail} onChange={e => setEditProduct({ ...editProduct, thumbnail: e.target.value })} placeholder="Thumbnail URL" />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleUpdate} colorScheme="blue">Save</Button>
            <Button onClick={onClose} ml={3}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
