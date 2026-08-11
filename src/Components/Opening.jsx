import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import Sakura from "./sakura";

import sakuraTree from "../assets/seasons/sakuraTree.svg";
import openingMusic from "../assets/music/opening.mp3";

export default function Opening() {

  const audioRef = useRef(null);

  // =====================================================
  // INSTRUCTION POPUP
  // =====================================================

  const [showInstructions, setShowInstructions] =
    useState(true);

  const [started, setStarted] =
    useState(false);


  // =====================================================
  // START EXPERIENCE
  // =====================================================

  const startExperience = () => {

    setShowInstructions(false);

    // Small delay so the popup disappears first
    // and then the opening cinematic begins.

    setTimeout(() => {
      setStarted(true);
    }, 350);
  };


  // =====================================================
  // START BACKGROUND MUSIC
  // ONLY AFTER USER CLICKS "I'M READY"
  // =====================================================

  useEffect(() => {

    if (!started) {
      return;
    }

    const startMusic = async () => {

      try {

        audioRef.current.volume = 0.5;

        await audioRef.current.play();

      } catch (error) {

        console.log(
          "Music could not be started."
        );

      }

    };

    startMusic();

  }, [started]);


  return (
    <section
      className="
        relative
        flex
        min-h-screen
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
          opacity: started ? 0.9 : 0,
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

      {started && <Sakura />}


      {/* =====================================================
          CINEMATIC VIGNETTE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[5]
          bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.85)_100%)]
        "
      />


      {/* =====================================================
          ACTUAL OPENING CONTENT
          DOES NOT START UNTIL POPUP IS CLOSED
      ====================================================== */}

      <AnimatePresence>
        {started && (

          <motion.div
            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              duration: 1.2,
            }}

            className="
              relative
              z-10
              flex
              w-full
              max-w-3xl
              flex-col
              items-center
              px-6
              text-center
            "
          >

            {/* =================================================
                DATE
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}

              animate={{
                opacity: 0.8,
                y: 0,
              }}

              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}

              className="
                mb-7
                text-[10px]
                uppercase
                tracking-[0.45em]
                text-[#f3eadb]/75
                sm:text-xs
              "
            >
              12 · 08 · 2026
            </motion.div>


            {/* =================================================
                JAPANESE TITLE
            ================================================= */}

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
                text-[clamp(3rem,13vw,6rem)]
                font-light
                tracking-[0.12em]
                text-[#f3eadb]
                drop-shadow-[0_0_20px_rgba(243,234,219,0.15)]
              "
            >
              二十歳になる前に
            </motion.h1>


            {/* =================================================
                ENGLISH TITLE
            ================================================= */}

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}

              animate={{
                opacity: 0.75,
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
                text-[#f3eadb]
                sm:text-xs
              "
            >
              Before You Turned Twenty
            </motion.p>


            {/* =================================================
                STORY
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 1.6,
                delay: 1.6,
                ease: "easeOut",
              }}

              className="
                mt-9
                max-w-xl
              "
            >

              {/* First paragraph */}

              <p
                className="
                  text-sm
                  leading-7
                  text-[#f3eadb]/85
                  sm:text-[15px]
                  sm:leading-8
                "
              >
                There was a little girl who didn't know yet
                <br className="hidden sm:block" />
                how far her life would take her.
              </p>


              {/* Second paragraph */}

              <p
                className="
                  mt-5
                  text-sm
                  leading-7
                  text-[#f3eadb]/75
                  sm:text-[15px]
                  sm:leading-8
                "
              >
                She didn't know about the dreams she would chase,
                <br className="hidden sm:block" />
                the people she would meet,
                <br className="hidden sm:block" />
                or the days that would change her.
              </p>


              {/* Third paragraph */}

              <p
                className="
                  mt-5
                  text-sm
                  italic
                  leading-7
                  text-[#f3eadb]/70
                  sm:text-[15px]
                  sm:leading-8
                "
              >
                She only knew how to live one day at a time.
              </p>


              {/* =================================================
                  TWENTY YEARS
              ================================================= */}

              <motion.p
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                transition={{
                  duration: 1.4,
                  delay: 3.1,
                  ease: [0.22, 1, 0.36, 1],
                }}

                className="
                  mt-7
                  text-base
                  font-light
                  tracking-[0.08em]
                  text-[#f3eadb]
                  drop-shadow-[0_0_15px_rgba(243,234,219,0.18)]
                  sm:text-lg
                "
              >
                And somehow, twenty years passed.
              </motion.p>


              {/* =================================================
                  FINAL MESSAGE
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 1.5,
                  delay: 3.8,
                  ease: "easeOut",
                }}

                className="
                  mt-7
                  text-sm
                  leading-7
                  text-[#f3eadb]/80
                  sm:text-[15px]
                  sm:leading-8
                "
              >

                <p>
                  So before we celebrate the woman you've become,
                  <br className="hidden sm:block" />
                  let's go back and meet the little girl
                  <br className="hidden sm:block" />
                  who started it all.
                </p>


                <p
                  className="
                    mt-5
                    font-light
                    tracking-[0.08em]
                    text-[#f3eadb]
                    drop-shadow-[0_0_15px_rgba(243,234,219,0.15)]
                  "
                >
                  This is her story.
                  <br />
                  This is your story. ❤️
                </p>

              </motion.div>

            </motion.div>

          </motion.div>

        )}
      </AnimatePresence>


      {/* =====================================================
          SCROLL INDICATOR
          ONLY APPEARS AFTER INSTRUCTIONS ARE CLOSED
      ====================================================== */}

      <AnimatePresence>

        {started && (

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
              delay: 5,
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
                text-[#f3eadb]/60
              "
            >
              Scroll
            </span>

          </motion.div>

        )}

      </AnimatePresence>


      {/* =====================================================
          INSTRUCTION POPUP
          THIS APPEARS FIRST
      ====================================================== */}

      <AnimatePresence>

        {showInstructions && (

          <motion.div
            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            transition={{
              duration: 0.5,
            }}

            className="
              fixed
              inset-0
              z-[200]
              flex
              items-center
              justify-center
              bg-black/90
              px-5
              backdrop-blur-md
            "
          >

            {/* =================================================
                POPUP CARD
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.9,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}

              className="
                relative
                w-full
                max-w-md
                overflow-hidden
                rounded-[2rem]
                border
                border-[#f3eadb]/15
                bg-[#050505]
                px-7
                py-9
                text-center
                shadow-[0_0_100px_rgba(185,163,212,0.15)]
                sm:px-10
                sm:py-11
              "
            >

              {/* =================================================
                  SMALL DECORATIVE GLOW
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-0
                  h-32
                  w-32
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#b9a3d4]/10
                  blur-3xl
                "
              />


              {/* =================================================
                  HEADING
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.15,
                  duration: 0.7,
                }}

                className="
                  relative
                  text-[9px]
                  uppercase
                  tracking-[0.55em]
                  text-[#b9a3d4]/75
                "
              >
                Before you begin
              </motion.div>


              <motion.h2
                initial={{
                  opacity: 0,
                  y: 10,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.25,
                  duration: 0.7,
                }}

                className="
                  relative
                  mt-4
                  text-2xl
                  font-light
                  tracking-[0.06em]
                  text-[#f3eadb]
                  sm:text-3xl
                "
              >
                Take your time.
              </motion.h2>


              {/* =================================================
                  DIVIDER
              ================================================= */}

              <div
                className="
                  mx-auto
                  mt-5
                  h-px
                  w-16
                  bg-gradient-to-r
                  from-transparent
                  via-[#b9a3d4]/50
                  to-transparent
                "
              />


              {/* =================================================
                  INSTRUCTIONS
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                }}

                animate={{
                  opacity: 1,
                }}

                transition={{
                  delay: 0.45,
                  duration: 0.8,
                }}

                className="
                  relative
                  mt-7
                  space-y-5
                  text-sm
                  leading-7
                  text-[#f3eadb]/70
                  sm:text-[15px]
                "
              >

                <p>
                  🎧 Use headphones for the
                  best experience.
                </p>

                <p>
                  🌙 Scroll slowly and let
                  the story unfold.
                </p>

                <p>
                  📖 Don't rush.
                  <br />
                  Some things are meant to
                  be noticed.
                </p>

                <p>
                  ✨ Don't miss the little
                  details along the way.
                </p>

              </motion.div>


              {/* =================================================
                  FINAL LINE
              ================================================= */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.8,
                  duration: 0.8,
                }}

                className="
                  relative
                  mt-7
                  text-sm
                  font-light
                  leading-7
                  tracking-[0.04em]
                  text-[#f3eadb]/90
                "
              >
                There's no need to hurry.
                <br />
                Just enjoy the journey. ❤️
              </motion.p>


              {/* =================================================
                  START BUTTON
              ================================================= */}

              <motion.button
                initial={{
                  opacity: 0,
                  y: 10,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 1,
                  duration: 0.8,
                }}

                type="button"
                onClick={startExperience}

                whileHover={{
                  scale: 1.04,
                }}

                whileTap={{
                  scale: 0.96,
                }}

                className="
                  relative
                  mt-8
                  w-full
                  rounded-full
                  border
                  border-[#b9a3d4]/40
                  bg-[#b9a3d4]/10
                  px-7
                  py-4
                  text-[10px]
                  uppercase
                  tracking-[0.35em]
                  text-[#f3eadb]
                  shadow-[0_0_30px_rgba(185,163,212,0.08)]
                  transition
                  hover:border-[#b9a3d4]/70
                  hover:bg-[#b9a3d4]/20
                "
              >
                I'm ready ✦
              </motion.button>


              {/* =================================================
                  TINY NOTE
              ================================================= */}

              <div
                className="
                  mt-4
                  text-[8px]
                  uppercase
                  tracking-[0.25em]
                  text-white/20
                "
              >
                Best experienced with sound
              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
}