import { motion } from "motion/react";
import sakura from "../assets/seasons/sakura.svg";

const petals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 12 + Math.random() * 18,
  duration: 6 + Math.random() * 6,
  delay: Math.random() * 5,
  drift: -80 + Math.random() * 160,
  rotation: 180 + Math.random() * 360,
}));

export default function Sakura() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.img
          key={petal.id}
          src={sakura}
          alt=""
          className="absolute"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
          }}
          initial={{
            y: "-10vh",
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: "110vh",
            x: [0, petal.drift, -petal.drift / 2, petal.drift],
            opacity: [0, 0.8, 0.9, 0],
            rotate: petal.rotation,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}