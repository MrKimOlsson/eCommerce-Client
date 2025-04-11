import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import '../../styles/shared/hero.scss';

export const heroImages = [

  'https://pbs.twimg.com/media/F83aMcKbYAAX9lE?format=jpg&name=4096x4096',

  'https://pbs.twimg.com/media/Fs14hFNaYAA4S5Y?format=jpg&name=4096x4096',

  'https://pbs.twimg.com/media/Fqh7pG6agAEFVRT?format=jpg&name=4096x4096',

  'https://pbs.twimg.com/media/Ft-kt4eacAA1xnr?format=jpg&name=4096x4096',

  'https://xreart.com/cdn/shop/products/13.jpg?v=1699501767&width=1946',

  'https://img-va.myshopline.com/image/store/2000342678/1637116565587/25b648811e8c4f32aac5c67916602e1a_1800x.jpeg?w=1080&h=1080',

  'https://xreart.com/cdn/shop/products/5.jpg?v=1699502312&width=1946',

  'https://xreart.com/cdn/shop/products/3_70d022f1-50db-4573-8440-6c5330fe8dfb.jpg?v=1699502120&width=1946',

  'https://xreart.com/cdn/shop/products/5_987324bb-61ca-4e03-87b5-4c1834922a45.jpg?v=1699502057&width=1946'

];

interface HeroProps {
  title: string,
  text: string,
}

const Hero = ({ title, text }: HeroProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const controls = useAnimation();
  const imageUrl = heroImages[imageIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Scroll animation effect remains the same
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
          <p className='hero-title'>{title}</p>
          <p className='hero-text'>{text}</p>
      </div>

      <AnimatePresence>
        <motion.div
          key={imageUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>
    </motion.div>
  );
};

export default Hero;