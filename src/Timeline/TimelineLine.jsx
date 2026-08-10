import {
  motion,
  useSpring,
  useTransform,
} from "motion/react";

import { useScroll } from "motion/react";
import { useRef } from "react";


// ======================================================
// SEASON COLORS
// ======================================================

const SEASON_COLORS = {
  spring: {
    line: "#b97891",
    glow: "#f2a9c0",
  },

  summer: {
    line: "#a98b52",
    glow: "#dfc276",
  },

  autumn: {
    line: "#9c6240",
    glow: "#d38a55",
  },

  winter: {
    line: "#71899f",
    glow: "#a9c8df",
  },

  night: {
    line: "#78678f",
    glow: "#b9a3d4",
  },
};


export default function TimelineLine({
  season,
}) {

  const lineRef =
    useRef(null);


  // ====================================================
  // SCROLL PROGRESS
  // ====================================================

  const {
    scrollYProgress,
  } = useScroll({
    target: lineRef,

    offset: [
      "start center",
      "end center",
    ],
  });


  const smoothProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 100,
        damping: 25,
        mass: 0.4,
      }
    );


  // ====================================================
  // MARKER POSITION
  // ====================================================

  /*
    IMPORTANT

    The marker goes from:

    0%  → first year
    100% → final year
  */

  const markerTop =
    useTransform(
      smoothProgress,
      [0, 1],
      ["0%", "100%"]
    );


  const colors =
    SEASON_COLORS[season];


  return (

    <div
      ref={lineRef}

      className="
        pointer-events-none
        absolute
        left-1/2
        top-0
        z-10
        h-full
        w-[4px]
        -translate-x-1/2
      "
    >

      {/* ==============================================
          BASE TIMELINE
      =============================================== */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-full
          w-[2px]
          -translate-x-1/2
          rounded-full
          bg-white/[0.08]
        "
      />


      {/* ==============================================
          GLOWING PROGRESS
      =============================================== */}

      <motion.div
        style={{
          height: markerTop,
          backgroundColor:
            colors.line,
        }}

        animate={{
          boxShadow: `
            0 0 5px ${colors.glow},
            0 0 12px ${colors.glow}88,
            0 0 25px ${colors.glow}44
          `,
        }}

        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}

        className="
          absolute
          left-1/2
          top-0
          w-[3px]
          -translate-x-1/2
          rounded-full
        "
      />


      {/* ==============================================
          MOVING MARKER
      =============================================== */}

      <motion.div
        style={{
          top: markerTop,
        }}

        className="
          absolute
          left-1/2
          z-50
          -translate-x-1/2
          -translate-y-1/2
        "
      >

        {/* ==========================================
            OUTER GLOW
        =========================================== */}

        <motion.div
          animate={{
            scale: [
              1,
              1.6,
              1,
            ],

            opacity: [
              0.25,
              0.65,
              0.25,
            ],
          }}

          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          className="
            absolute
            -inset-3
            rounded-full
            blur-md
          "

          style={{
            backgroundColor:
              colors.glow,
          }}
        />


        {/* ==========================================
            MAIN MARKER
        =========================================== */}

        <motion.div
          animate={{
            scale: [
              1,
              1.15,
              1,
            ],
          }}

          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          className="
            relative
            h-5
            w-5
            rounded-full
            border-2
            border-white/90
          "

          style={{
            backgroundColor:
              colors.glow,

            boxShadow: `
              0 0 8px ${colors.glow},
              0 0 18px ${colors.glow},
              0 0 35px ${colors.glow}88
            `,
          }}
        />

      </motion.div>


      {/* ==============================================
          END POINT
      =============================================== */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          z-20
          h-3
          w-3
          -translate-x-1/2
          translate-y-1/2
          rounded-full
        "

        style={{
          backgroundColor:
            colors.line,

          boxShadow: `
            0 0 8px ${colors.glow},
            0 0 18px ${colors.glow}66
          `,
        }}
      />

    </div>
  );
}