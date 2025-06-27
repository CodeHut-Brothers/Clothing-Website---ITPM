import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection({ scrollY = 0 }) {
  const images = [
    
    "https://i.ibb.co/cSKKhkvb/4.png",
    "https://i.ibb.co/fztMnrRn/3.png",
    "https://i.ibb.co/FqCDSGM7/1.png",
    "https://i.ibb.co/sZHGq3d/heroiew-2.png",
    "https://i.ibb.co/WWTBcX9G/2.png"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        // Get random index different from current
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * images.length);
        } while (newIndex === currentImageIndex && images.length > 1);
        
        setCurrentImageIndex(newIndex);
        setIsTransitioning(false);
      }, 1000); // Half of transition duration
    }, 3000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

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

      {/* Auto-Rotating Image Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <img
          src={images[currentImageIndex]}
          alt="Hero Overlay"
          className={`w-full max-w-md sm:max-w-xl md:max-w-full transition-all duration-600 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-80 scale-100'
          }`}
        />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center px-6 lg:px-8 z-20">
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
      
      {/* Image Transition Indicators */}
      
      
      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
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
        
        .duration-600 {
          transition-duration: 600ms;
        }
      `}</style>
    </section>
  );
}