import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const Product = () => {
  const params = useParams();

  // Mutation for updating
  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(
        `https://dummyjson.com/products/${params.id}`,
        newProduct
      );
    },
  });

  // Fetch single product
  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${params.id}`);
    return response.json();
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: fetchProduct,
    staleTime: 10000,
  });

  // Handle loading & error states
  if (isLoading) return <p>Loading product...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Handle mutation states
  if (mutation.isPending) return <p>Update Please Wait..</p>;
  if (mutation.isError)
    return <p>Error While Updating : {mutation.error.message}</p>;

  return (
    <div>
      {/* ✅ product is guaranteed to exist now */}
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button
        onClick={() => {
          mutation.mutate({ title: "Updated Product" });
        }}
      >
        Update Product
      </button>
    </div>
  );
};

export default Product;
