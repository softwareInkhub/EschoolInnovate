import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  once?: boolean;
}

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = 'up',
  duration = 0.5,
  once = true
}: AnimatedSectionProps) => {
  let initialY = 0;
  let initialX = 0;

  if (direction === 'up') initialY = 50;
  if (direction === 'down') initialY = -50;
  if (direction === 'left') initialX = 50;
  if (direction === 'right') initialX = -50;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration, delay }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;