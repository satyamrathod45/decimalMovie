import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";

import image2006 from "../assets/memories/2006.png";
import image2007 from "../assets/memories/2007.png";
import image2024 from "../assets/memories/2024.png";
import image2024_2 from "../assets/memories/2024_2.png";
import image2025 from "../assets/memories/2025.png";
import image2025_2 from "../assets/memories/2025_2.png";
import image2025_3 from "../assets/memories/2025_3.png";
import crackerSound from "../assets/music/cracker.mp3";

import MemoryCard from "./MemoryCard";


// ======================================================
// YEARS
// ======================================================

const years = [
  {
    year: 2006,
    season: "spring",
    memories: [{
      image: image2006,
      title: "The beginning",
      text: "Before there were memories to remember, there was simply a little girl discovering the world.",
    }],
  },
  {
    year: 2007,
    season: "spring",
    memories: [{
      image: image2007,
      title: "First little steps",
      text: "One year later, the world was no longer something to watch. It was something to walk into.",
    }],
  },
  { year: 2008, season: "spring" },
  { year: 2009, season: "spring" },
  { year: 2010, season: "spring" },
  { year: 2011, season: "summer" },
  { year: 2014, season: "summer" },
  { year: 2016, season: "autumn" },
  { year: 2018, season: "autumn" },
  { year: 2019, season: "autumn" },
  { year: 2020, season: "autumn" },
  { year: 2021, season: "winter" },
  { year: 2022, season: "winter" },
  { year: 2023, season: "winter" },
  {
    year: 2024,
    season: "winter",
    memories: [
      {
        image: image2024,
        title: "The challenge",
        text: "12th boards, JEE, MHT-CET, and the long road toward the future she was preparing to build.",
      },
      {
        image: image2024_2,
        title: "A new beginning",
        text: "And after all those exams, one door opened to a completely new chapter: YCCE.",
      },
    ],
  },
  {
    year: 2025,
    season: "night",
    memories: [
      {
        image: image2025,
        title: "A new life",
        text: "College was no longer something waiting in the future. It had finally become her everyday life.",
      },
      {
        image: image2025_2,
        title: "The little moments",
        text: "Between lectures, friendships, laughter, and the occasional phone hiding in the middle of class, a new world was forming.",
      },
      {
        image: image2025_3,
        title: "Building something of her own",
        text: "The little girl who once discovered the world was now beginning to build things inside it.",
      },
    ],
  },
  { year: 2026, season: "night" },
];


// ======================================================
// SEASONS
// ======================================================

const seasons = {
  spring: {
    line: "#b97891",
    glow: "#f2a9c0",
    text: "#f3c5d3",
    icon: "🌸",
  },

  summer: {
    line: "#a98b52",
    glow: "#dfc276",
    text: "#e8d39a",
    icon: "☀️",
  },

  autumn: {
    line: "#9c6240",
    glow: "#d38a55",
    text: "#dfaa7c",
    icon: "🍂",
  },

  winter: {
    line: "#71899f",
    glow: "#a9c8df",
    text: "#c5d9e8",
    icon: "❄️",
  },

  night: {
    line: "#78678f",
    glow: "#b9a3d4",
    text: "#d3c5e5",
    icon: "🌙",
  },
};


// ======================================================
// MAIN TIMELINE
// ======================================================

export default function Timeline() {
  const timelineRef = useRef(null);
  const trackRef = useRef(null);
  const yearRefs = useRef([]);

  const [currentSeason, setCurrentSeason] = useState("spring");
  const [currentAge, setCurrentAge] = useState(0);
  const [birthdayReached, setBirthdayReached] = useState(false);
  const [showBirthdayPopup, setShowBirthdayPopup] = useState(false);
  const wasAtFinalYear = useRef(false);


  // ====================================================
  // SCROLL
  // ====================================================

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });


  // ====================================================
  // ORIGINAL SMOOTH MOVEMENT
  // ====================================================

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });


  // ====================================================
  // ORIGINAL MARKER MOVEMENT
  // ====================================================

  const markerTop = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "100%"]
  );


  // ====================================================
  // DETERMINE CURRENT SEASON + ACTUAL AGE CROSSING
  // ====================================================

  useMotionValueEvent(
    smoothProgress,
    "change",
    (latest) => {
      let season = "spring";

      if (latest >= 0.8) {
        season = "night";
      } else if (latest >= 0.6) {
        season = "winter";
      } else if (latest >= 0.4) {
        season = "autumn";
      } else if (latest >= 0.2) {
        season = "summer";
      }

      setCurrentSeason((previous) =>
        previous === season ? previous : season
      );

      // --------------------------------------------------
      // AGE IS BASED ON THE REAL YEAR DOTS, NOT GLOBAL
      // SCROLL PERCENTAGE. This prevents the counter from
      // changing early when memory years are taller.
      // --------------------------------------------------

      if (!trackRef.current) return;

      const trackRect =
        trackRef.current.getBoundingClientRect();

      const markerY =
        trackRect.top + latest * trackRect.height;

      let crossedYearIndex = 0;

      yearRefs.current.forEach((element, index) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const pointY = rect.top + rect.height / 2;

        if (markerY >= pointY) {
          crossedYearIndex = index;
        }
      });

      const crossedYear = years[crossedYearIndex].year;
      const newAge = crossedYear - 2006;

      setCurrentAge((previous) =>
        previous === newAge ? previous : newAge
      );

      // 2026 is the final birthday/finale trigger.
      const isFinalYear = crossedYearIndex === years.length - 1;

      if (isFinalYear) {
        setBirthdayReached(true);

        // Trigger the celebration only when we ENTER 2026.
        if (!wasAtFinalYear.current) {
          wasAtFinalYear.current = true;
          setShowBirthdayPopup(true);

          try {
            const audio = new Audio(crackerSound);
            audio.volume = 0.8;
            audio.currentTime = 0;
            audio.play().catch(() => {});
          } catch {
            // Visual celebration still works if audio is blocked.
          }
        }
      } else {
        wasAtFinalYear.current = false;
        setBirthdayReached(false);
        setShowBirthdayPopup(false);
      }
    }
  );

  const current = seasons[currentSeason];


  return (
    <section
      ref={timelineRef}
      className="
        relative
        min-h-[500vh]
        overflow-hidden
        bg-black
        text-[#f3eadb]
      "
    >

      {/* =================================================
          SEASON ATMOSPHERE
      ================================================= */}

      <AnimatePresence mode="wait">
        <SeasonEffect
          key={currentSeason}
          season={currentSeason}
        />
      </AnimatePresence>

      <AgeCounter
        age={currentAge}
        season={currentSeason}
      />

      <AnimatePresence>
        {birthdayReached && (
          <BirthdayCelebration
            showPopup={showBirthdayPopup}
            onClose={() => setShowBirthdayPopup(false)}
          />
        )}
      </AnimatePresence>


      {/* =================================================
          TIMELINE CONTAINER
      ================================================= */}

      <div
        ref={trackRef}
        className="
          relative
          z-50
          mx-auto
          w-full
          max-w-md
        "
      >

        {/* =================================================
            TIMELINE
        ================================================= */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            -translate-x-1/2
          "
        >

          {/* BASE LINE */}

          <div
            className="
              absolute
              left-1/2
              top-0
              h-full
              w-px
              -translate-x-1/2
              bg-white/[0.07]
            "
          />


          {/* =================================================
              COLORED LINE
              GROWS WITH MARKER
          ================================================= */}

          <motion.div
            style={{
              height: markerTop,
              backgroundColor: current.line,
            }}
            animate={{
              boxShadow: `
                0 0 6px ${current.glow},
                0 0 14px ${current.glow}55
              `,
            }}
            transition={{
              boxShadow: {
                duration: 1,
                ease: "easeInOut",
              },
            }}
            className="
              absolute
              left-1/2
              top-0
              z-10
              w-[2px]
              -translate-x-1/2
            "
          />


          {/* =================================================
              BRIGHT LEADING EDGE
          ================================================= */}

          <motion.div
            style={{
              top: markerTop,
              backgroundColor: current.glow,
            }}
            animate={{
              boxShadow: `
                0 0 8px ${current.glow},
                0 0 18px ${current.glow}
              `,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              absolute
              left-1/2
              z-20
              h-3
              w-[3px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
            "
          />


          {/* =================================================
              MAIN SEASON MARKER
          ================================================= */}

          <motion.div
            style={{
              top: markerTop,
            }}
            className="
              absolute
              left-1/2
              z-30
              -translate-x-1/2
              -translate-y-1/2
            "
          >

            {/* GLOW */}

            <motion.div
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.35, 0.65, 0.35],
                backgroundColor: current.glow,
              }}
              transition={{
                scale: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },

                opacity: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },

                backgroundColor: {
                  duration: 1,
                },
              }}
              className="
                absolute
                -inset-3
                rounded-full
                blur-md
              "
            />


            {/* SEASON EMOJI */}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSeason}

                initial={{
                  opacity: 0,
                  scale: 0.4,
                  rotate: -20,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}

                exit={{
                  opacity: 0,
                  scale: 0.4,
                  rotate: 20,
                }}

                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}

                style={{
                  filter: `
                    drop-shadow(0 0 6px ${current.glow})
                    drop-shadow(0 0 12px ${current.glow}88)
                  `,
                }}

                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  text-2xl
                "
              >
                {current.icon}
              </motion.div>
            </AnimatePresence>

          </motion.div>

        </div>


        {/* =================================================
            YEARS
        ================================================= */}

        <div className="relative flex flex-col">

          {years.map((item, index) => {
            const season = seasons[item.season];

            /*
              Memory years get extra vertical space.

              This prevents the photo/text scene from
              colliding with the following year.
            */

            const memories = item.memories ?? (item.memory ? [item.memory] : []);
            const hasMemory = memories.length > 0;
            const sectionHeight = hasMemory
              ? `${Math.max(150, memories.length * 110)}vh`
              : "70vh";

            return (
              <motion.div
                key={item.year}

                initial={{
                  opacity: 0,
                }}

                whileInView={{
                  opacity: 1,
                }}

                viewport={{
                  once: true,
                  amount: 0.5,
                }}

                transition={{
                  duration: 0.8,
                }}

                className="
                  relative
                  flex
                  items-center
                "
                style={{
                  minHeight: sectionHeight,
                }}
              >

                {/* =================================
                    YEAR
                ================================= */}

                <motion.div
                  initial={{
                    opacity: 0.25,
                    scale: 0.9,
                  }}

                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    duration: 0.7,
                  }}

                  className={`
                    absolute
                    top-[35%]
                    -translate-y-1/2
                    text-sm
                    tracking-[0.3em]

                    ${
                      index % 2 === 0
                        ? "right-[calc(50%+24px)]"
                        : "left-[calc(50%+24px)]"
                    }
                  `}

                  style={{
                    color: season.text,
                  }}
                >
                  {item.year}
                </motion.div>


                {/* =================================
                    YEAR POINT
                ================================= */}

                <motion.div
                  ref={(element) => {
                    yearRefs.current[index] = element;
                  }}

                  initial={{
                    scale: 0,
                  }}

                  whileInView={{
                    scale: 1,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    duration: 0.6,
                    ease: "backOut",
                  }}

                  className="
                    absolute
                    left-1/2
                    top-[35%]
                    h-2
                    w-2
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                  "

                  style={{
                    backgroundColor: season.glow,

                    boxShadow: `
                      0 0 10px ${season.glow}66
                    `,
                  }}
                />


                {/* =================================
                    MEMORY SCENE
                ================================= */}

                {hasMemory && (
                  <div
                    className="
                      absolute
                      left-1/2
                      top-[52%]
                      z-40
                      w-screen
                      -translate-x-1/2
                    "
                  >
                    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-[18vh] px-4">
                      {memories.map((memory, memoryIndex) => (
                        <motion.div
                          key={`${item.year}-memory-${memoryIndex}`}
                          initial={{ opacity: 0, y: 70 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.8,
                            delay: memoryIndex * 0.12,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="w-full"
                        >
                          <MemoryCard
                            year={item.year}
                            image={memory.image}
                            title={memory.title}
                            text={memory.text}
                            glow={season.glow}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}