import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import '../../styles/shared/hero.scss';

export const heroImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://cdn.pixabay.com/photo/2019/09/03/10/53/watch-4449152_1280.jpg',
  'https://cdn.pixabay.com/photo/2020/02/02/11/41/cooler-bag-4812757_1280.jpg',
  'https://images.unsplash.com/photo-1627664220128-ff2232937726?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

interface HeroProps {
  text: string,
}

const Hero = ({ text }: HeroProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const controls = useAnimation();
  const imageUrl = heroImages[imageIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        controls.start({
          margin: '0 10% 0rem 10%',
          borderRadius: '20px',
          transition: { duration: 1 },
        });
      } else {
        controls.start({
          margin: '0px',
          borderRadius: '0px',
          transition: { duration: 1 },
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <motion.div
      className={`hero ${imageUrl ? 'has-background' : ''}`}
      animate={controls}
      initial={{
        borderRadius: '0px',
        margin: '0px',
      }}
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
      }}
    >
      <div className="hero-content">
        <div className='row'>
          <p className='hero-text'>{text}</p>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          key={imageUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // Duration of the crossfade
          style={{
            backgroundImage: `url(${imageUrl})`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>
    </motion.div>
  );
};

export default Hero;