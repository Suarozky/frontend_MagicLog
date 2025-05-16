import ProductCard from "../../components/card/productCard";

function HomeList() {
  const shoes = [
    {
      id: "1",
      name: "Adidas Ultraboost",
      description: "High-performance running shoes.",
      imageUrl: "https://via.placeholder.com/150",
      category: "Running",
      price: 140,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Nike Air Max",
      description: "A comfortable and stylish sneaker.",
      imageUrl: "https://via.placeholder.com/150",
      category: "Sneakers",
      price: 120,
      rating: 4.5,
    },
    {
      id: "3",
      name: "Puma RS-X",
      description: "Retro-inspired sneaker with modern style.",
      imageUrl: "https://via.placeholder.com/150",
      category: "Casual",
      price: 110,
      rating: 4.3,
    },
    {
      id: "4",
      name: "Puma RS-X",
      description: "Retro-inspired sneaker with modern style.",
      imageUrl: "https://via.placeholder.com/150",
      category: "Casual",
      price: 110,
      rating: 4.3,
    },
    {
      id: "5",
      name: "Puma RS-X",
      description: "Retro-inspired sneaker with modern style.",
      imageUrl: "https://via.placeholder.com/150",
      category: "Casual",
      price: 110,
      rating: 4.3,
    },
    {
      id: "6",
      name: "Puma RS-X",
      description: "Retro-inspired sneaker with modern style.",
      imageUrl: "https://via.placeholder.com/150",
      category: "Casual",
      price: 110,
      rating: 4.3,
    },
    {
      id: "7",
      name: "Puma RS-X",
      description: "Retro-inspired sneaker with modern style.",
      imageUrl: "https://via.placeholder.com/150",
      category: "Casual",
      price: 110,
      rating: 4.3,
    },
     {
      id: "8",
      name: "Puma RS-X",
      description: "Retro-inspired sneaker with modern style.",
      imageUrl: "https://via.placeholder.com/150",
      category: "Casual",
      price: 110,
      rating: 4.3,
    },
    // puedes seguir agregando más productos
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 w-full">
      {shoes.map((shoe) => (
        <ProductCard key={shoe.id} shoe={shoe} />
      ))}
    </div>
  );
}

export default HomeList;
