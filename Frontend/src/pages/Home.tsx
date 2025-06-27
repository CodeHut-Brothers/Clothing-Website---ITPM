import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronDown,ShoppingBag, Star, ChevronRight, ChevronLeft, Instagram, Twitter, Facebook } from 'lucide-react';
import axios from 'axios';
import CategoryShowcase from '../components/CategoryShowcase';
import Scrolling from '../components/Scrollimg';
import video1back from '../data/vid1.mp4';
import Featuredcollection from '../components/FeaturedCollection'
import MiniStore from '../components/MiniStore'
import Footer from '../components/Footer';
import Heronew from '../components/Hero';

// Animation helpers
const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

// Hero Component with parallax effect
const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-gray-900 visible">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          transform: `translateY(${scrollY * 0.1}px) scale(1.05)`,
          filter: 'brightness(0.6) contrast(1.1)'
        }}
      >
        <source src="https://videos.pexels.com/video-files/3611029/3611029-hd_1920_1080_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      
      {/* Professional Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" /> */}
      
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <img
          src="https://i.ibb.co/sZHGq3d/heroiew-2.png"
          alt="Overlay"
          className="w-full max-w-md sm:max-w-xl md:max-w-full  opacity-80"
        />
      </div>
      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight">
              CANNIBAL
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          </div>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-100 font-medium tracking-wide mb-12 animate-fadeInUp animation-delay-200">
            EVERY STEP, STRONGER
          </p>
          
          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp animation-delay-400">
            <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
              <span className="relative z-10 flex items-center gap-3">
                Shop Collection
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:text-black hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/80">
          <span className="text-sm font-medium mb-2 tracking-wider">SCROLL</span>
          <div className="w-px h-8 bg-white/60"></div>
          <ChevronDown className="w-6 h-6 mt-1" />
        </div>
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};




const Newcollection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-96 overflow-hidden flex justify-start py-16 ">
    {/* Background Video */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-screen object-cover z-0"
      style={{
        transform: `translateY(${scrollY * 0.1}px) scale(2.05)`,
        filter: 'brightness(0.6) contrast(1.1)'
      }}
    >
      <source src="https://videos.pexels.com/video-files/16296848/16296848-uhd_2560_1440_24fps.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    {/* Overlay Content */}
    <div className="relative z-10 w-full px-6 md:px-20 flex flex-col lg:flex-row items-center justify-between">
      {/* Text Section */}
      <div className="text-white max-w-xl text-center lg:text-left space-y-6">
        <p className="text-sm uppercase tracking-widest text-gray-300">Shop the</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          AFTERLIFE<br />COLLECTION
        </h1>
        <button className="inline-block bg-white text-black font-semibold py-3 px-6 rounded-full shadow-md hover:scale-105 transition-transform">
          Shop By Category
        </button>
      </div>

      {/* Image Section */}
      <div className="mt-10 max-w-2xl h-20">
        <img
          src="https://i.ibb.co/mCR4qSww/temp-t.png"
          alt="Afterlife Collection T-shirts"
          className="w-full h-auto object-contain ml-20 "
        /></div>
        <div className="mt-10 max-w-2xl h-25">
        <img
          src="https://i.ibb.co/mCR4qSww/temp-t.png"
          alt="Afterlife Collection T-shirts2"
          className="w-full h-auto object-contain ml-50"
        />
      </div>
    </div>
  </section>
);


};





// Product Card with hover effects
const ProductCard = ({ product, index }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref} 
      className={`group relative overflow-hidden rounded-lg shadow-lg transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-80 w-full object-cover object-center transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-200 mb-2">{product.description.substring(0, 60)}...</p>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">LKR {product.price.toFixed(2)}</p>
          <button className="p-2 bg-white text-black rounded-full hover:bg-black hover:text-white transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="bg-white p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 font-medium">LKR {product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

// Improved image gallery
const FashionGallery = () => {
  const images = [
    "https://i.ibb.co/bBsr0tH/DSC07648.png",
    "https://i.ibb.co/hWt5Ssc/DSC07653.png",
    "https://i.ibb.co/dDN5B2s/DSC07656.png",
    "https://i.ibb.co/yQ8HcsZ/DSC07600.png",
    "https://i.ibb.co/QJM0TMP/DSC07607.png",
    "https://i.ibb.co/HCjwQzC/DSC07612.png",
    "https://i.ibb.co/y03MQVW/DSC07627.png",
    "https://i.ibb.co/2Ff35RM/DSC07632.png",
    "https://i.ibb.co/YLXWMwG/DSC07633.png",
    "https://i.ibb.co/F4gsp42/DSC07639.png",
    "https://i.ibb.co/GMTnJZj/DSC07679.png",
    "https://i.ibb.co/6J7CCBd/DSC07714.png",
    "https://i.ibb.co/XDQ3xZ3/DSC07719.png",
    "https://i.ibb.co/Jq2HMP0/DSC07724.png",
    "https://i.ibb.co/R9CxSjw/DSC07733.png",
    "https://i.ibb.co/NW7C2X7/DSC07737.png"
  ];

  const galleryRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 3 >= images.length ? 0 : prev + 3));
    setAnimationKey(prev => prev + 1);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 3 < 0 ? Math.max(0, images.length - 3) : prev - 3));
    setAnimationKey(prev => prev + 1);
  };

  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (!paused && isVisible) {
      const interval = setInterval(() => {
        handleNext();
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [paused, isVisible, activeIndex]);

  return (
    <div ref={ref} className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Collection</h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        <div className="relative">
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white p-2 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="overflow-hidden py-4">
            <div key={animationKey} className="flex gap-4 transition-all duration-700 ease-out" style={{ transform: `translateX(-${activeIndex * 33.33}%)` }}>
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className="flex-none w-full sm:w-1/2 md:w-1/3 aspect-[3/4] p-2"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  <div className="relative h-full overflow-hidden rounded-lg shadow-lg group">
                    <img 
                      src={image} 
                      alt={`Fashion item ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <Link to="/product-details" className="bg-white text-black px-4 py-2 rounded-full w-fit mx-auto mb-4 font-medium hover:bg-black hover:text-white transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white p-2 rounded-full shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(images.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index * 3)}
              className={`w-3 h-3 rounded-full transition-all ${
                Math.floor(activeIndex / 3) === index ? 'bg-black scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Reviews component with animation
const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Alex Thompson",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      text: "The quality of these clothes is exceptional. Every piece I've purchased has become a staple in my wardrobe."
    },
    {
      id: 2,
      name: "Jamie Lee",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "I love how unique these designs are! I always get compliments when wearing Cannibal clothing."
    },
    {
      id: 3,
      name: "Sam Richards",
      avatar: "https://i.pravatar.cc/150?img=8",
      rating: 4,
      text: "Fast shipping and the fit is perfect. The attention to detail in each garment is impressive."
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => {
            const [ref, isVisible] = useIntersectionObserver({
              threshold: 0.1,
              triggerOnce: true
            });
            
            return (
              <div
                ref={ref}
                key={review.id}
                className={`bg-gray-50 p-6 rounded-lg shadow-lg transition-all duration-700 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <p className="font-semibold text-lg">{review.name}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">&ldquo;{review.text}&rdquo;</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Brand philosophy with parallax
const BrandPhilosophy = () => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div className="w-full h-full opacity-40 bg-gradient-to-br from-purple-900 to-black"></div>
      </div>
      
      <div ref={ref} className="relative max-w-5xl mx-auto px-4 text-center text-white z-10">
        <h2 className={`text-4xl font-bold mb-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Our Philosophy
        </h2>
        
        <div className={`w-24 h-1 bg-white mx-auto mb-8 transition-all duration-1000 delay-100 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}></div>
        
        <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          At Cannibal, we believe in the power of self-expression through minimalist design and superior quality.
          Every piece tells a story of urban culture and contemporary lifestyle, crafted for those who dare to stand out.
        </p>
        
        <div className={`mt-8 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Link to="/about" className="inline-flex items-center bg-white text-black px-8 py-3 rounded-full hover:bg-black hover:text-white border border-white transition-colors">
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

// Newsletter component
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div ref={ref} className="bg-gray-100 py-16">
      <div className={`max-w-4xl mx-auto px-4 text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-600 mb-8">Subscribe to get exclusive offers, early access to new collections, and style inspiration.</p>
        
        <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
        
        <div className="flex justify-center gap-6 mt-8">
          <a href="#" className="text-gray-600 hover:text-black transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-black transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-black transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Main Home component
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add global CSS for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes scroll {
        0% { transform: translateY(0); }
        50% { transform: translateY(8px); }
        100% { transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 1s ease-out forwards;
      }
      .animate-slideUp {
        animation: fadeIn 0.5s ease-out forwards,
                   slideUp 0.7s ease-out forwards;
      }
      .animate-scroll {
        animation: scroll 1.5s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products/new');
        setFeaturedProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError('Failed to load featured products');
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  

  return (
    <div className="overflow-x-hidden centre">
      {/* Hero Section */}
      
      <Heronew/>
      
      

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Featured Collections</h2>
        <Featuredcollection />
      </div>
      
      <CategoryShowcase/>

    <Newcollection/>


      
      
      <MiniStore/>
      <Newsletter />
      
    </div>
  );
}