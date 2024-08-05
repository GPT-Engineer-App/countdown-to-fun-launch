import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Star, Moon } from 'lucide-react';
import Confetti from 'react-confetti';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isEasterEgg, setIsEasterEgg] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const difference = new Date('2024-08-19') - new Date();
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleRocketClick = () => {
    setIsEasterEgg(!isEasterEgg);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-600 to-blue-800 text-white">
      <motion.h1
        className="text-6xl font-bold mb-8"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Lovable is launching in
      </motion.h1>
      <div className="flex space-x-8 mb-12">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div
            key={unit}
            className="text-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="text-5xl font-bold">{value}</div>
            <div className="text-xl">{unit}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 0.8 }}
        onClick={handleRocketClick}
        className="cursor-pointer"
      >
        <Rocket size={64} />
      </motion.div>
      {isEasterEgg && (
        <>
          <Confetti />
          <div className="mt-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-4"
            >
              You found the Easter Egg! 🎉
            </motion.div>
            <div className="flex space-x-4">
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Star size={32} />
              </motion.div>
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>
                <Moon size={32} />
              </motion.div>
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }}>
                <Star size={32} />
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
