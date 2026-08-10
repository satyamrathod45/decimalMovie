import { motion } from "motion/react";

const leaves = Array.from({
  length: 14,
});

export default function AutumnEffect() {
  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
      "
    >

      {leaves.map((_, index) => {

        const x =
          (index * 41) % 100;

        return (
          <motion.div
            key={index}

            initial={{
              x: `${x}vw`,
              y: "-10vh",
              opacity: 0,
              rotate: 0,
            }}

            animate={{
              x: [
                `${x}vw`,
                `${(x + 15) % 100}vw`,
              ],

              y: "110vh",

              rotate: [
                0,
                180,
                360,
              ],

              opacity: [
                0,
                0.8,
                0,
              ],
            }}

            transition={{
              duration:
                8 + (index % 4),

              delay:
                index * 0.5,

              repeat: Infinity,

              ease: "linear",
            }}

            className="
              absolute
              text-lg
            "
          >
            🍂
          </motion.div>
        );

      })}

    </div>
  );
}