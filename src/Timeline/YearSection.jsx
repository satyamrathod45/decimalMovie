import { motion } from "motion/react";
import { useEffect, useRef } from "react";

import MemoryList from "./MemoryList";


// ======================================================
// SEASON DATA
// ======================================================

const SEASONS = {
  spring: {
    color: "#f2a9c0",
    glow: "#f2a9c0",
    icon: "🌸",
  },

  summer: {
    color: "#dfc276",
    glow: "#dfc276",
    icon: "☀️",
  },

  autumn: {
    color: "#d38a55",
    glow: "#d38a55",
    icon: "🍂",
  },

  winter: {
    color: "#a9c8df",
    glow: "#a9c8df",
    icon: "❄️",
  },

  night: {
    color: "#b9a3d4",
    glow: "#b9a3d4",
    icon: "🌙",
  },
};


// ======================================================
// YEAR SECTION
// ======================================================

export default function YearSection({
  year,
  season,
  memories = [],
  activeYear,
  onVisible,
}) {
  const sectionRef = useRef(null);

  const data =
    SEASONS[season] || SEASONS.spring;

  const isActive =
    activeYear === year;


  // ====================================================
  // ACTIVE YEAR DETECTION
  // ====================================================

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onVisible();
          }
        },
        {
          root: null,

          rootMargin:
            "-40% 0px -40% 0px",

          threshold: 0,
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [onVisible]);


  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
      "
    >

      {/* ==================================================
          YEAR POSITION
      ================================================== */}

      <div
        className="
          relative
          flex
          min-h-[70vh]
          w-full
          items-center
          justify-center
        "
      >

        {/* ================================================
            YEAR DOT
        ================================================= */}

        <motion.div
          animate={{
            scale: isActive ? 1.35 : 1,
            opacity: isActive ? 1 : 0.5,
          }}

          transition={{
            duration: 0.35,
          }}

          className="
            absolute
            left-1/2
            top-1/2
            z-30
            h-4
            w-4
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
          "

          style={{
            backgroundColor: data.color,

            boxShadow: isActive
              ? `
                0 0 10px ${data.glow},
                0 0 25px ${data.glow},
                0 0 45px ${data.glow}55
              `
              : `
                0 0 6px ${data.glow}66
              `,
          }}
        />


        {/* ================================================
            YEAR LABEL
        ================================================= */}

        <motion.div
          animate={{
            opacity: isActive ? 1 : 0.35,
            x: isActive ? 0 : 5,
          }}

          transition={{
            duration: 0.35,
          }}

          className="
            absolute
            left-[calc(50%+32px)]
            top-1/2
            z-30
            -translate-y-1/2
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              whitespace-nowrap
              text-lg
              font-light
              tracking-[0.25em]
            "

            style={{
              color: data.color,
            }}
          >

            <span>
              {data.icon}
            </span>

            <span>
              {year}
            </span>

          </div>

        </motion.div>

      </div>


      {/* ==================================================
          MEMORY AREA

          This is NORMAL document flow.
          Nothing is absolute here.
      ================================================== */}

      {memories.length > 0 && (

        <div
          className="
            relative
            z-40
            w-full
            px-2
            pb-24
          "
        >

          <MemoryList
            memories={memories}
            season={season}
          />

        </div>

      )}

    </section>
  );
}