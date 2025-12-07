import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageCarousel from './ImageCarousel';
import { useCart } from './CartContext'; // Import the useCart hook
import { ShoppingCart } from 'lucide-react'; // Import the cart icon
import Categories from './Categories';
import Hero from './Hero';
import Features from './Features';
import Popular from './Popular';
import Action from './Action';
import Footer from './Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  // Use the cart context to access cart functionality
  const { addToCart } = useCart();

  

  // Popular items - Now with proper structure to match MenuPage items
  const popularItems = [
    { 
      id: 'p1', 
      name: 'Chicken Sandwich', 
      price: 204.99, 
      rating: 4.8, 
      image: 'images/grilledsandwich.jpg',
      category: 'Lunch'
    },
    { 
      id: 'p2', 
      name: 'Veggie Wrap', 
      price: 39.99, 
      rating: 4.5, 
      image: 'images/vegie.jpg',
      category: 'Lunch' 
    },
    { 
      id: 'p3', 
      name: 'Cheese Pizza', 
      price: 500.49, 
      rating: 4.7, 
      image: 'images/Pizza.jpg',
      category: 'Fast Food'
    },
    { 
      id: 'p4', 
      name: 'Fruit Smoothie', 
      price: 200.99, 
      rating: 4.6, 
      image: 'images/fruitsmoothie.jpg',
      category: 'Beverages'
    },
  ];

  // Function to handle add to cart, using the same approach as MenuPage
  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Function to render stars based on rating (same as MenuPage)
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
    }
    
    if (halfStar) {
      stars.push(<span key="half" className="text-yellow-400">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />

      {/* Categories */}
      <Categories />

      {/* Popular Items */}
      <Popular
        items={popularItems}
        onAddToCart={handleAddToCart}
        renderStars={renderStars}
      />

      {/* Call to Action */}
      <Action />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;