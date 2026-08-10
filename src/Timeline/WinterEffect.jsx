import { motion } from "motion/react";

const snow = Array.from({
  length: 25,
});

export default function WinterEffect() {
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

      {snow.map((_, index) => {

        const x =
          (index * 31) % 100;

        return (
          <motion.div
            key={index}

            initial={{
              x: `${x}vw`,
              y: "-5vh",
              opacity: 0,
            }}

            animate={{
              x: [
                `${x}vw`,
                `${(x + 10) % 100}vw`,
              ],

              y: "110vh",

              opacity: [
                0,
                0.8,
                0,
              ],
            }}

            transition={{
              duration:
                6 + (index % 4),

              delay:
                index * 0.3,

              repeat: Infinity,

              ease: "linear",
            }}

            className="
              absolute
              h-1
              w-1
              rounded-full
              bg-[#c5d9e8]
            "
          />
        );

      })}

    </div>
  );
}