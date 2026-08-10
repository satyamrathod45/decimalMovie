import { motion } from "motion/react";

const petals = Array.from({
  length: 18,
});

export default function SpringEffect() {
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

      {petals.map((_, index) => {

        const startX =
          (index * 37) % 100;

        return (
          <motion.div
            key={index}

            initial={{
              x: `${startX}vw`,
              y: "-10vh",
              rotate: 0,
              opacity: 0,
            }}

            animate={{
              x: [
                `${startX}vw`,
                `${(startX + 10) % 100}vw`,
                `${(startX - 10 + 100) % 100}vw`,
              ],

              y: "110vh",

              rotate: [
                0,
                180,
                360,
              ],

              opacity: [
                0,
                0.7,
                0,
              ],
            }}

            transition={{
              duration:
                8 + (index % 5),

              delay:
                index * 0.4,

              repeat: Infinity,

              ease: "linear",
            }}

            className="
              absolute
              h-2
              w-3
              rounded-full
              bg-[#f2a9c0]/70
            "
          />
        );

      })}

    </div>
  );
}