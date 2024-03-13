import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface Props {
  delayValue?: number;
  children: JSX.Element;
}

export default function FadeDown({ delayValue, children }: Props) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  let delay: number = 0.5;

  if (delayValue != undefined) {
    delay = delayValue;
  }

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ delay: delay, type: 'spring', stiffness: 70 }}
      className="w-full"
      variants={{
        visible: { opacity: 1, scale: 1, y: 0 },
        hidden: { opacity: 0, scale: 1, y: -20 },
      }}
    >
      {children}
    </motion.div>
  );
}
