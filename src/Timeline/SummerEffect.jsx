import { motion } from "motion/react";
import { useMemo } from "react";


// ======================================================
// MONSOON RAIN
// Internal season name remains "summer"
// ======================================================

export default function SummerEffect() {

  // ----------------------------------------------------
  // Generate rain drops once
  // ----------------------------------------------------

  const rainDrops = useMemo(() => {

    return Array.from(
      { length: 90 },
      (_, index) => ({
        id: index,

        left:
          Math.random() * 100,

        delay:
          Math.random() * 3,

        duration:
          0.65 + Math.random() * 0.7,

        height:
          12 + Math.random() * 22,

        opacity:
          0.12 + Math.random() * 0.28,

        drift:
          -15 + Math.random() * 30,
      })
    );

  }, []);


  // ----------------------------------------------------
  // Small mist particles
  // ----------------------------------------------------

  const mistParticles = useMemo(() => {

    return Array.from(
      { length: 18 },
      (_, index) => ({
        id: index,

        left:
          Math.random() * 100,

        top:
          35 + Math.random() * 55,

        delay:
          Math.random() * 4,

        duration:
          4 + Math.random() * 4,

        size:
          30 + Math.random() * 70,
      })
    );

  }, []);


  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
        bg-[#10151b]
      "
    >

      {/* =================================================
          DARK MONSOON ATMOSPHERE
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        transition={{
          duration: 1.5,
        }}

        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-[#17212b]/90
          via-[#111820]/60
          to-[#090c10]/90
        "
      />


      {/* =================================================
          CLOUDS
      ================================================= */}

      <motion.div
        animate={{
          x: ["-5%", "5%", "-5%"],
        }}

        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          -left-[10%]
          -top-[8%]
          h-[30vh]
          w-[120%]
          rounded-[50%]
          bg-[#26323c]/45
          blur-[55px]
        "
      />


      <motion.div
        animate={{
          x: ["5%", "-5%", "5%"],
        }}

        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          -left-[15%]
          top-[2%]
          h-[22vh]
          w-[110%]
          rounded-[50%]
          bg-[#34424d]/25
          blur-[65px]
        "
      />


      {/* =================================================
          DISTANT LIGHT
      ================================================= */}

      <motion.div
        animate={{
          opacity: [
            0.08,
            0.12,
            0.06,
            0.1,
            0.07,
          ],
        }}

        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          left-1/2
          top-[15%]
          h-[45vh]
          w-[70vw]
          -translate-x-1/2
          rounded-full
          bg-[#a9c8df]/10
          blur-[120px]
        "
      />


      {/* =================================================
          RAIN
      ================================================= */}

      <div
        className="
          absolute
          inset-0
          overflow-hidden
        "
      >

        {rainDrops.map((drop) => (

          <motion.div
            key={drop.id}

            initial={{
              y: "-10vh",
              x: 0,
              opacity: 0,
            }}

            animate={{
              y: "110vh",
              x: drop.drift,
              opacity: [
                0,
                drop.opacity,
                drop.opacity,
                0,
              ],
            }}

            transition={{
              duration:
                drop.duration,

              delay:
                drop.delay,

              repeat: Infinity,

              ease: "linear",
            }}

            className="
              absolute
              top-0
              w-[1px]
              rounded-full
              bg-gradient-to-b
              from-transparent
              via-[#a9c8df]
              to-transparent
            "

            style={{
              left: `${drop.left}%`,
              height: `${drop.height}px`,
            }}
          />

        ))}

      </div>


      {/* =================================================
          SOFT RAIN HAZE
      ================================================= */}

      <motion.div
        animate={{
          opacity: [
            0.08,
            0.16,
            0.08,
          ],

          scale: [
            1,
            1.05,
            1,
          ],
        }}

        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          left-1/2
          top-[35%]
          h-[50vh]
          w-[80vw]
          -translate-x-1/2
          rounded-full
          bg-[#a9c8df]/10
          blur-[90px]
        "
      />


      {/* =================================================
          MIST PARTICLES
      ================================================= */}

      {mistParticles.map((particle) => (

        <motion.div
          key={particle.id}

          initial={{
            opacity: 0,
            x: 0,
          }}

          animate={{
            opacity: [
              0,
              0.18,
              0,
            ],

            x: [
              0,
              30,
              60,
            ],
          }}

          transition={{
            duration:
              particle.duration,

            delay:
              particle.delay,

            repeat: Infinity,

            ease: "easeInOut",
          }}

          className="
            absolute
            rounded-full
            bg-[#c5d9e8]/10
            blur-2xl
          "

          style={{
            left:
              `${particle.left}%`,

            top:
              `${particle.top}%`,

            width:
              `${particle.size}px`,

            height:
              `${particle.size}px`,
          }}
        />

      ))}


      {/* =================================================
          OCCASIONAL LIGHTNING
      ================================================= */}

      <motion.div
        animate={{
          opacity: [
            0,
            0,
            0.03,
            0,
            0,
            0.08,
            0,
          ],
        }}

        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}

        className="
          absolute
          inset-0
          bg-[#dcecff]
        "
      />


      {/* =================================================
          FOREGROUND RAIN VEIL
      ================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-transparent
          to-[#070a0e]/45
        "
      />

    </div>
  );
}