import React from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';

const PetCardSection = () => {
  const products = [
    {
      id: 1,
      name: "Premium Cat Food",
      category: "Cat Food",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80",
      discount: "25% OFF",
      badge: "Best Seller",
      inStock: true
    },
    {
      id: 2,
      name: "Grooming Kit",
      category: "Pet Care",
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80",
      discount: "23% OFF",
      badge: "New Arrival",
      inStock: true
    },
    {
      id: 3,
      name: "Dog Chew Toy",
      category: "Toys",
      price: 12.99,
      originalPrice: 18.99,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
      discount: "32% OFF",
      badge: "Hot Deal",
      inStock: true
    },
    {
      id: 4,
      name: "Pet Bed Luxury",
      category: "Accessories",
      price: 67.99,
      originalPrice: 89.99,
      rating: 5.0,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=400&q=80",
      discount: "24% OFF",
      badge: "Premium",
      inStock: false
    },
    {
      id: 5,
      name: "Salmon Dog Food",
      category: "Dog Food",
      price: 32.99,
      originalPrice: 45.99,
      rating: 4.6,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400&q=80",
      discount: "28% OFF",
      badge: "Organic",
      inStock: true
    },
    {
      id: 6,
      name: "Pappy Dog",
      category: "Furniture",
      price: 54.99,
      originalPrice: 74.99,
      rating: 4.8,
      reviews: 267,
      image: "https://i.postimg.cc/Jht3rxCf/puppy-1903313-640.jpg",
      discount: "27% OFF",
      badge: "Popular",
      inStock: true
    }
  ];

  return (
    <div className="min-h-screen  py-16 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
          <span className="text-orange-600 font-semibold text-sm">🐾 Special Offers</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Premium Pet Products
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the best quality products for your beloved pets with amazing discounts
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                  {product.discount}
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                  {product.badge}
                </span>
              </div>

              {/* Quick Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors duration-300">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  <Eye className="w-5 h-5" />
                </button>
              </div>

              {/* Stock Status */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="px-4 py-2 bg-red-500 text-white font-bold rounded-full">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-6">
              {/* Category */}
              <span className="inline-block px-3 py-1  text-xs font-semibold rounded-full mb-3">
                {product.category}
              </span>

              {/* Product Name */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors duration-300">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-800">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={!product.inStock}
                className={`w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  product.inStock
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.inStock ? 'Add to Cart' : 'Unavailable'}
              </button>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
          View All Products →
        </button>
      </div>
    </div>
  );
};

export default PetCardSection;