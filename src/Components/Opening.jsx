import { useEffect, useRef } from "react";
import { motion } from "motion/react";

import Sakura from "./sakura";

import sakuraTree from "../assets/seasons/sakuraTree.svg";
import openingMusic from "../assets/music/opening.mp3";

export default function Opening() {
  const audioRef = useRef(null);

  // -----------------------------------------
  // Start background music when page loads
  // -----------------------------------------
  useEffect(() => {
    const startMusic = async () => {
      try {
        audioRef.current.volume = 0.5;

        await audioRef.current.play();
      } catch (error) {
        console.log("Autoplay was blocked by the browser.");
      }
    };

    startMusic();
  }, []);

  return (
    <section
      className="
        relative
        flex
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-black
        text-[#f3eadb]
      "
    >

      {/* =====================================================
          BACKGROUND MUSIC
      ====================================================== */}

      <audio
        ref={audioRef}
        src={openingMusic}
        loop
        preload="auto"
      />


      {/* =====================================================
          SAKURA TREE
          Enters from the left side of the screen
      ====================================================== */}

<motion.img
  src={sakuraTree}
  alt=""
  initial={{
    opacity: 0,
    x: -40,
    y: -20,
    rotate: -1,
  }}
  animate={{
    opacity: 0.9,
    x: [0, 2, -2, 1, 0],
    y: [0, -1, 1, -1, 0],
    rotate: [-1, 0.5, -0.7, 0.3, -1],
  }}
  transition={{
    opacity: {
      duration: 2.5,
      ease: "easeOut",
    },

    x: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },

    y: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },

    rotate: {
      duration: 9,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="
    pointer-events-none
    absolute
    left-0
    top-0
    z-[1]
    h-auto
    w-[42vw]
    max-w-[260px]
    origin-bottom-left
  "
/>


      {/* =====================================================
          FALLING SAKURA PETALS
      ====================================================== */}

      <Sakura />


      {/* =====================================================
          CINEMATIC VIGNETTE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[5]
          bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.7)_100%)]
        "
      />


      {/* =====================================================
          TITLE
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          text-center
        "
      >

        {/* Japanese Title */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            text-[clamp(3.5rem,16vw,7rem)]
            font-light
            tracking-[0.12em]
          "
        >
          二十歳になる前に
        </motion.h1>


        {/* English Translation */}

        <motion.p
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 0.7,
            y: 0,
          }}
          transition={{
            duration: 1.5,
            delay: 0.8,
            ease: "easeOut",
          }}
          className="
            mt-3
            text-[0.7rem]
            uppercase
            tracking-[0.5em]
            sm:text-xs
          "
        >
          Before You Turn 20
        </motion.p>

      </div>


      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [0.25, 1, 0.25],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="
          absolute
          bottom-8
          left-1/2
          z-10
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-2
        "
      >

        {/* Mouse */}

        <div
          className="
            relative
            h-9
            w-5
            rounded-full
            border
            border-[#f3eadb]/60
          "
        >

          {/* Mouse wheel / dot */}

          <motion.div
            animate={{
              y: [3, 14, 3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-1/2
              top-1
              h-1
              w-1
              -translate-x-1/2
              rounded-full
              bg-[#f3eadb]
            "
          />

        </div>


        {/* Scroll text */}

        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.4em]
            text-[#f3eadb]/50
          "
        >
          Scroll
        </span>

      </motion.div>

    </section>
  );
}