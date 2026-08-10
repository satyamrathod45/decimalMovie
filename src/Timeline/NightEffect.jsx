import { motion } from "motion/react";

const stars = Array.from({
  length: 35,
});

export default function NightEffect() {
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

      {/* Milky Way */}

      <motion.div
        animate={{
          opacity: [
            0.08,
            0.2,
            0.08,
          ],

          scale: [
            1,
            1.05,
            1,
          ],
        }}

        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          left-[-30%]
          top-[35%]
          h-[25%]
          w-[160%]
          rotate-[-12deg]
          rounded-[50%]
          bg-gradient-to-r
          from-transparent
          via-[#b9a3d4]/20
          to-transparent
          blur-3xl
        "
      />


      {/* Stars */}

      {stars.map((_, index) => {

        const x =
          (index * 47) % 100;

        const y =
          (index * 29) % 100;

        return (
          <motion.div
            key={index}

            initial={{
              left: `${x}%`,
              top: `${y}%`,
              opacity: 0,
            }}

            animate={{
              opacity: [
                0.1,
                0.9,
                0.2,
                0.8,
                0.1,
              ],
            }}

            transition={{
              duration:
                2 + (index % 4),

              delay:
                index * 0.15,

              repeat: Infinity,

              ease: "easeInOut",
            }}

            className="
              absolute
              h-1
              w-1
              rounded-full
              bg-white
            "
          />
        );

      })}

    </div>
  );
}