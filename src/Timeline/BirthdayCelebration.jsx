import { motion, AnimatePresence } from "motion/react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import crackerSound from "../assets/music/cracker.mp3";


// ======================================================
// COLORS
// ======================================================

const COLORS = [
  "#f3c5d3",
  "#f8e9ae",
  "#a9c8df",
  "#b9a3d4",
  "#f2a9c0",
];


// ======================================================
// FIREWORK
// ======================================================

function Firework({
  left,
  top,
  delay,
  color,
  scale = 1,
}) {
  const particles = useMemo(() => {
    return Array.from({ length: 36 }, (_, index) => {
      const angle =
        (index / 36) * Math.PI * 2;

      const distance =
        65 + Math.random() * 95;

      return {
        id: index,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 1.4 + Math.random() * 2,
      };
    });
  }, []);

  return (
    <div
      className="absolute z-20"
      style={{
        left,
        top,
      }}
    >

      {/* Central flash */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 1, 0.45, 0],
          scale: [0, 1.3, 2, 0],
        }}
        transition={{
          delay,
          duration: 1.2,
          ease: "easeOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-xl
        "
        style={{
          width: `${35 * scale}px`,
          height: `${35 * scale}px`,
          backgroundColor: color,
          boxShadow: `
            0 0 30px ${color},
            0 0 70px ${color}
          `,
        }}
      />

      {/* Explosion particles */}

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: particle.x * scale,
            y: particle.y * scale,
            opacity: [0, 1, 0.8, 0],
            scale: [0, 1, 0.7, 0],
          }}
          transition={{
            delay:
              delay +
              Math.random() * 0.08,
            duration:
              1.4 +
              Math.random() * 0.6,
            ease: "easeOut",
          }}
          className="
            absolute
            left-0
            top-0
            rounded-full
          "
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            boxShadow: `
              0 0 5px ${color},
              0 0 13px ${color}
            `,
          }}
        />
      ))}
    </div>
  );
}


// ======================================================
// ROCKET LETTER
// ======================================================

function RocketLetter({
  letter,
  index,
}) {
  const delay =
    1.5 + index * 0.11;

  return (
    <motion.span
      className="
        relative
        inline-block
        text-2xl
        font-light
        tracking-[0.08em]
        text-[#f3eadb]
        sm:text-3xl
        md:text-5xl
        lg:text-6xl
      "
      initial={{
        opacity: 0,
        y: 520,
        scale: 0.35,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay,
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        textShadow: `
          0 0 8px #f3eadb,
          0 0 20px #b9a3d4,
          0 0 40px #b9a3d488
        `,
      }}
    >

      {/* Rocket trail */}

      <motion.span
        initial={{
          opacity: 1,
          scaleY: 1,
        }}
        animate={{
          opacity: 0,
          scaleY: 0,
        }}
        transition={{
          delay,
          duration: 1.5,
          ease: "easeOut",
        }}
        className="
          absolute
          left-1/2
          top-full
          h-28
          w-[2px]
          -translate-x-1/2
          origin-top
          bg-gradient-to-b
          from-[#f8e9ae]
          via-[#f3c5d3]/60
          to-transparent
          blur-[1px]
        "
      />

      {/* Rocket glow */}

      <motion.span
        initial={{
          opacity: 1,
          scale: 1,
        }}
        animate={{
          opacity: 0,
          scale: 2.5,
        }}
        transition={{
          delay,
          duration: 0.8,
        }}
        className="
          absolute
          bottom-full
          left-1/2
          h-3
          w-3
          -translate-x-1/2
          rounded-full
          bg-[#f8e9ae]
          shadow-[0_0_15px_5px_rgba(248,233,174,0.7)]
        "
      />

      {letter === " "
        ? "\u00A0"
        : letter}
    </motion.span>
  );
}


// ======================================================
// BIRTHDAY NAME
// ======================================================

function BirthdayName({
  runKey,
}) {
  const words = [
    "HAPPY",
    "BIRTHDAY",
    "SHREYA",
  ];

  return (
    <div
      className="
        absolute
        left-1/2
        top-[15%]
        z-[80]
        w-full
        -translate-x-1/2
        px-4
        text-center
      "
    >
      {words.map(
        (word, wordIndex) => (
          <div
            key={`${word}-${runKey}`}
            className={`
              flex
              justify-center
              ${
                wordIndex === 2
                  ? "mt-2 md:mt-3"
                  : ""
              }
            `}
          >
            {word
              .split("")
              .map(
                (
                  letter,
                  index
                ) => (
                  <RocketLetter
                    key={`${word}-${index}-${runKey}`}
                    letter={letter}
                    index={
                      wordIndex * 10 +
                      index
                    }
                  />
                )
              )}
          </div>
        )
      )}
    </div>
  );
}


// ======================================================
// MILKY WAY
// ======================================================

function MilkyWay() {
  const stars = useMemo(() => {
    return Array.from(
      { length: 170 },
      (_, index) => ({
        id: index,
        left:
          Math.random() * 100,
        top:
          Math.random() * 100,
        size:
          1 + Math.random() * 2,
        opacity:
          0.15 +
          Math.random() * 0.7,
        delay:
          Math.random() * 4,
      })
    );
  }, []);

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
      "
    >

      {/* Milky Way cloud */}

      <motion.div
        animate={{
          rotate: [-12, -10, -12],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-[42%]
          h-[25%]
          w-[125%]
          -translate-x-1/2
          -translate-y-1/2
          rotate-[-12deg]
          rounded-[50%]
          bg-gradient-to-r
          from-transparent
          via-[#d8d0e8]/[0.07]
          to-transparent
          blur-[45px]
        "
      />

      {/* Galaxy core */}

      <div
        className="
          absolute
          left-1/2
          top-[42%]
          h-[10%]
          w-[100%]
          -translate-x-1/2
          -translate-y-1/2
          rotate-[-12deg]
          rounded-[50%]
          bg-[#f3eadb]/[0.035]
          blur-[25px]
        "
      />

      {/* Stars */}

      {stars.map((star) => (
        <motion.span
          key={star.id}
          animate={{
            opacity: [
              star.opacity * 0.4,
              star.opacity,
              star.opacity * 0.4,
            ],
            scale: [
              0.8,
              1.2,
              0.8,
            ],
          }}
          transition={{
            duration:
              2 + star.delay,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            rounded-full
            bg-white
          "
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
    </div>
  );
}


// ======================================================
// CAKE
// ======================================================

function BirthdayCake() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay: 3.4,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        bottom-[8%]
        left-1/2
        z-50
        h-36
        w-44
        -translate-x-1/2
        sm:h-40
        sm:w-48
      "
    >

      {/* Cake glow */}

      <motion.div
        animate={{
          opacity: [
            0.15,
            0.35,
            0.15,
          ],
          scale: [
            0.9,
            1.1,
            0.9,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-0
          h-28
          w-28
          -translate-x-1/2
          rounded-full
          bg-[#f8e9ae]/10
          blur-3xl
        "
      />

      {/* Candles */}

      <div
        className="
          absolute
          left-1/2
          top-1
          flex
          -translate-x-1/2
          gap-3
        "
      >
        {[0, 1, 2, 3, 4].map(
          (index) => (
            <div
              key={index}
              className="
                relative
                h-11
                w-2.5
                rounded-sm
                bg-gradient-to-b
                from-[#f3c5d3]
                to-[#b97891]
              "
            >
              <motion.div
                animate={{
                  scale: [
                    0.8,
                    1.15,
                    0.85,
                  ],
                  y: [0, -2, 0],
                }}
                transition={{
                  duration:
                    0.7 +
                    index * 0.1,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  -top-4
                  left-1/2
                  h-3.5
                  w-2.5
                  -translate-x-1/2
                  rounded-full
                  bg-[#f8e9ae]
                  shadow-[0_0_10px_4px_rgba(248,233,174,0.7)]
                "
              />
            </div>
          )
        )}
      </div>

      {/* Top layer */}

      <div
        className="
          absolute
          bottom-10
          left-1/2
          h-10
          w-36
          -translate-x-1/2
          rounded-t-xl
          bg-[#d38a55]
        "
      >
        <div
          className="
            absolute
            -top-2
            left-0
            h-4
            w-full
            rounded-full
            bg-[#f3eadb]
          "
        />
      </div>

      {/* Bottom layer */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          h-12
          w-40
          -translate-x-1/2
          rounded-b-2xl
          rounded-t-md
          bg-[#9c6240]
        "
      />

      {/* 20 */}

      <div
        className="
          absolute
          bottom-3
          left-1/2
          -translate-x-1/2
          text-[10px]
          tracking-[0.45em]
          text-[#f3c5d3]
        "
      >
        ✦ 20 ✦
      </div>
    </motion.div>
  );
}


// ======================================================
// BALLOON
// ======================================================

function WishBalloon({ onGrab }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 3.5,
        duration: 1,
      }}
      className="
        pointer-events-none
        absolute
        inset-0
        z-[60]
        overflow-hidden
      "
    >

      {/* =================================================
          WIND-CARRIED BALLOON

          The balloon continuously travels across the
          screen while smaller independent movements
          create the feeling of wind.
      ================================================= */}

      <motion.div
        initial={{
          x: "-12vw",
          y: "62vh",
        }}

        animate={{
          x: [
            "-12vw",
            "8vw",
            "27vw",
            "48vw",
            "67vw",
            "86vw",
            "112vw",
          ],

          y: [
            "62vh",
            "57vh",
            "61vh",
            "53vh",
            "58vh",
            "51vh",
            "55vh",
          ],
        }}

        transition={{
          duration: 22,

          repeat: Infinity,

          repeatType: "loop",

          ease: "easeInOut",

          times: [
            0,
            0.15,
            0.30,
            0.48,
            0.65,
            0.83,
            1,
          ],
        }}

        className="
          pointer-events-auto
          absolute
          left-0
          top-0
          cursor-pointer
        "
      >

        {/* =================================================
            NATURAL WIND MOTION
        ================================================= */}

        <motion.div
          animate={{
            y: [
              0,
              -14,
              -4,
              12,
              5,
              -10,
              0,
            ],

            rotate: [
              -3,
              2,
              -1,
              3,
              -2,
              2,
              -3,
            ],

            x: [
              0,
              4,
              -3,
              5,
              -4,
              3,
              0,
            ],
          }}

          transition={{
            duration: 6.5,

            repeat: Infinity,

            ease: "easeInOut",

            times: [
              0,
              0.16,
              0.32,
              0.5,
              0.67,
              0.84,
              1,
            ],
          }}
        >

          {/* =================================================
              CLICK ME LABEL
          ================================================= */}

          <motion.div
            animate={{
              opacity: [
                0.7,
                1,
                0.7,
              ],

              scale: [
                0.98,
                1.06,
                0.98,
              ],

              y: [
                0,
                -4,
                0,
              ],
            }}

            transition={{
              duration: 1.6,

              repeat: Infinity,

              ease: "easeInOut",
            }}

            className="
              absolute
              -top-20
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
              rounded-full
              border
              border-[#f3eadb]/25
              bg-black/65
              px-7
              py-3
              text-sm
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#f3eadb]
              shadow-[0_0_30px_rgba(185,163,212,0.25)]
              backdrop-blur-md
            "
          >
            CLICK ME 🎈
          </motion.div>


          {/* =================================================
              BALLOON
          ================================================= */}

          <motion.button
            type="button"
            onClick={onGrab}

            whileHover={{
              scale: 1.12,
            }}

            whileTap={{
              scale: 0.86,
            }}

            className="
              relative
              flex
              h-28
              w-24
              items-center
              justify-center
              rounded-[50%]
              border
              border-[#f3c5d3]/40
              bg-gradient-to-br
              from-[#f3c5d3]/95
              via-[#b9a3d4]/85
              to-[#78678f]/95
              shadow-[0_0_45px_rgba(185,163,212,0.5)]
            "
          >

            {/* Balloon highlight */}

            <span
              className="
                absolute
                left-4
                top-4
                h-7
                w-4
                rounded-full
                bg-white/60
                blur-[1px]
              "
            />


            {/* Balloon glow */}

            <motion.span
              animate={{
                opacity: [
                  0.25,
                  0.65,
                  0.25,
                ],

                scale: [
                  0.9,
                  1.12,
                  0.9,
                ],
              }}

              transition={{
                duration: 2,

                repeat: Infinity,

                ease: "easeInOut",
              }}

              className="
                pointer-events-none
                absolute
                -inset-4
                rounded-full
                bg-[#b9a3d4]/20
                blur-xl
              "
            />


            <span
              className="
                relative
                z-10
                text-2xl
              "
            >
              ✨
            </span>

          </motion.button>


          {/* =================================================
              BALLOON STRING
          ================================================= */}

          <motion.div
            animate={{
              rotate: [
                -5,
                4,
                -2,
                5,
                -4,
                3,
                -5,
              ],

              scaleX: [
                1,
                0.96,
                1.03,
                0.97,
                1.02,
                0.98,
                1,
              ],
            }}

            transition={{
              duration: 4.8,

              repeat: Infinity,

              ease: "easeInOut",
            }}

            className="
              mx-auto
              h-28
              w-px
              origin-top
              bg-gradient-to-b
              from-[#f3c5d3]/75
              via-[#b9a3d4]/45
              to-transparent
            "
          />


          {/* =================================================
              BALLOON KNOT
          ================================================= */}

          <div
            className="
              mx-auto
              h-2
              w-3
              rounded-b-sm
              bg-[#b9a3d4]
            "
          />

        </motion.div>

      </motion.div>

    </motion.div>
  );
}


// ======================================================
// GREETING CARD
// ======================================================

function GreetingCard({
  onWish,
  onClose,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 40,
        scale: 0.9,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        bottom-[12%]
        left-1/2
        z-[70]
        w-[min(92vw,520px)]
        -translate-x-1/2
      "
    >

      <div
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          border
          border-[#b9a3d4]/25
          bg-black/75
          px-8
          pb-8
          pt-10
          md:px-10
          md:pb-10
          md:pt-10
          text-center
          shadow-[0_0_90px_rgba(185,163,212,0.18)]
          backdrop-blur-xl
        "
      >

        {/* Close */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            text-xs
            text-white/40
            transition
            hover:text-white
          "
        >
          ×
        </button>


        {/* Card decoration */}

        <div
          className="
            text-[9px]
            uppercase
            tracking-[0.5em]
            text-[#b9a3d4]/70
          "
        >
          A little message for you
        </div>


        <div
          className="
            mt-4
            text-2xl
            font-light
            tracking-[0.12em]
            text-[#f3eadb]
            md:text-3xl
          "
        >
          For your 20th birthday ❤️
        </div>


        <div
          className="
            mx-auto
            mt-5
            h-px
            w-24
            bg-gradient-to-r
            from-transparent
            via-[#b9a3d4]/50
            to-transparent
          "
        />


        {/* Personal message */}

        <p
          className="
            mt-6
            text-base
            leading-8
            text-[#d3c5e5]/70
            md:text-lg
          "
        >
          No matter where life takes you,
          <br />
          no matter what happens along
          the way,
          <br />
          I'll always be by your side.
          ❤️
        </p>


        <p
          className="
            mt-5
            text-sm
            leading-6
            text-[#d3c5e5]/40
            md:text-base
          "
        >
          I hope the years ahead bring
          you more reasons to smile,
          more dreams to chase,
          and more moments worth
          remembering.
        </p>


        {/* Make wish */}

        <motion.button
          type="button"
          onClick={onWish}
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="
            mt-7
            rounded-full
            border
            border-[#b9a3d4]/35
            bg-[#b9a3d4]/10
            px-8
            py-4
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-[#f3eadb]
            shadow-[0_0_25px_rgba(185,163,212,0.08)]
            transition
            hover:border-[#b9a3d4]/70
            hover:bg-[#b9a3d4]/20
          "
        >
          ✦ Make a Wish ✦
        </motion.button>

      </div>
    </motion.div>
  );
}


// ======================================================
// WISH CARD
// ======================================================

function WishCard({
  onClose,
}) {
  const [wish, setWish] =
    useState("");

  const [sent, setSent] =
    useState(false);

  const [sending, setSending] =
    useState(false);

  const [error, setError] =
    useState("");


  // ====================================================
  // SEND WISH TO BACKEND
  // ====================================================

  const handleSend = async () => {

    if (
      !wish.trim() ||
      sending
    ) {
      return;
    }


    setSending(true);

    setError("");


    try {

      const response =
        await fetch(
          "https://moviebackend-m93c.onrender.com/api/wishes",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              wish: wish.trim(),
            }),
          }
        );


      const data =
        await response.json();


      if (
        !response.ok ||
        !data.success
      ) {

        throw new Error(
          data.message ||
          "Failed to send wish."
        );

      }


      // Only show success
      // after backend confirms it.

      setSent(true);

    } catch (error) {

      console.error(
        "Wish submission failed:",
        error
      );


      setError(
        "Couldn't send your wish right now. Please try again. 🌙"
      );

    } finally {

      setSending(false);

    }

  };


  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.85,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 40,
        scale: 0.9,
      }}
      className="
        absolute
        bottom-[10%]
        left-1/2
        z-[75]
        w-[min(92vw,520px)]
        -translate-x-1/2
      "
    >

      <div
        className="
          rounded-[2rem]
          border
          border-[#b9a3d4]/25
          bg-black/80
          p-8
          text-center
          shadow-[0_0_90px_rgba(185,163,212,0.18)]
          backdrop-blur-xl
          md:p-10
        "
      >

        {!sent ? (
          <>

            <div
              className="
                text-[9px]
                uppercase
                tracking-[0.5em]
                text-[#b9a3d4]/70
              "
            >
              One little wish
            </div>


            <div
              className="
                mt-4
                text-2xl
                font-light
                text-[#f3eadb]
                md:text-3xl
              "
            >
              What do you wish for? ✨
            </div>


            <p
              className="
                mt-3
                text-sm
                leading-6
                text-[#d3c5e5]/45
              "
            >
              Write something you'd love
              to see come true.
            </p>


            <textarea
              value={wish}
              onChange={(event) =>
                setWish(
                  event.target.value
                )
              }
              rows={5}
              maxLength={300}
              placeholder="Write your wish here..."
              className="
                mt-6
                w-full
                resize-none
                rounded-2xl
                border
                border-[#b9a3d4]/20
                bg-white/[0.03]
                px-5
                py-4
                text-sm
                leading-6
                text-[#f3eadb]
                outline-none
                placeholder:text-white/20
                focus:border-[#b9a3d4]/50
              "
            />


            <div
              className="
                mt-1
                text-right
                text-[9px]
                text-white/20
              "
            >
              {wish.length}/300
            </div>


            {error && (
              <p
                className="
                  mt-4
                  text-xs
                  leading-5
                  text-[#f3c5d3]/80
                "
              >
                {error}
              </p>
            )}


            <button
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="
                mt-4
                w-full
                rounded-xl
                border
                border-[#b9a3d4]/30
                bg-[#b9a3d4]/10
                py-4
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-[#f3eadb]
                transition
                hover:bg-[#b9a3d4]/20
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {sending
                ? "Sending Your Wish... ✨"
                : "Send My Wish ✨"}
            </button>


            <button
              type="button"
              onClick={onClose}
              disabled={sending}
              className="
                mt-4
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-white/25
                hover:text-white/50
                disabled:opacity-30
              "
            >
              Back
            </button>

          </>
        ) : (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              py-7
            "
          >

            <motion.div
              initial={{
                scale: 0.5,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                text-4xl
              "
            >
              ✨
            </motion.div>


            <div
              className="
                mt-5
                text-2xl
                font-light
                tracking-[0.08em]
                text-[#f3eadb]
                md:text-3xl
              "
            >
              Your wish has been heard.
            </div>


            <p
              className="
                mx-auto
                mt-5
                max-w-sm
                text-sm
                leading-7
                text-[#d3c5e5]/65
                md:text-base
              "
            >
              Not today...
              <br />
              but someday,
              <br />
              definitely,
              <br />
              your wish will come true. 🌙
            </p>


            <div
              className="
                mt-5
                text-xl
              "
            >
              🌠 ✨ 🌙
            </div>


            <button
              type="button"
              onClick={onClose}
              className="
                mt-6
                rounded-full
                border
                border-[#b9a3d4]/30
                px-7
                py-3
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-white/60
                hover:text-white
              "
            >
              Close
            </button>

          </motion.div>

        )}

      </div>
    </motion.div>
  );
}


// ======================================================
// MAIN BIRTHDAY CELEBRATION
// ======================================================

export default function BirthdayCelebration() {

  const sectionRef =
    useRef(null);

  const [visible, setVisible] =
    useState(false);

  const [runKey, setRunKey] =
    useState(0);

  const [balloonGrabbed, setBalloonGrabbed] =
    useState(false);

  const [showWish, setShowWish] =
    useState(false);


  // ====================================================
  // VIEWPORT DETECTION
  //
  // Every time the birthday section enters the screen,
  // everything starts again.
  // ====================================================

  useEffect(() => {

    const element =
      sectionRef.current;

    if (!element) {
      return;
    }


    const observer =
      new IntersectionObserver(
        ([entry]) => {

          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.25
          ) {

            setVisible(true);

            setRunKey(
              (previous) =>
                previous + 1
            );

            setBalloonGrabbed(false);

            setShowWish(false);

          } else {

            setVisible(false);

          }

        },
        {
          threshold: [
            0,
            0.25,
            0.5,
          ],
        }
      );


    observer.observe(element);


    return () => {
      observer.disconnect();
    };

  }, []);


  // ====================================================
  // CRACKER SOUND
  // ====================================================

  useEffect(() => {

    if (!visible) {
      return;
    }


    const audio =
      new Audio(crackerSound);

    audio.volume = 0.65;

    audio.currentTime = 0;


    audio.play().catch(() => {
      console.log(
        "Browser blocked automatic cracker sound."
      );
    });


    return () => {

      audio.pause();

      audio.currentTime = 0;

    };

  }, [
    runKey,
    visible,
  ]);


  // ====================================================
  // GRAB BALLOON
  // ====================================================

  const handleGrabBalloon = () => {

    setBalloonGrabbed(true);

  };


  // ====================================================
  // FIREWORK POSITIONS
  // ====================================================

  const fireworks = [

    {
      left: "7%",
      top: "25%",
      delay: 0.1,
      color: COLORS[0],
      scale: 1.1,
    },

    {
      left: "23%",
      top: "14%",
      delay: 0.5,
      color: COLORS[1],
      scale: 1.35,
    },

    {
      left: "43%",
      top: "23%",
      delay: 0.9,
      color: COLORS[2],
      scale: 1.15,
    },

    {
      left: "65%",
      top: "13%",
      delay: 1.3,
      color: COLORS[3],
      scale: 1.4,
    },

    {
      left: "88%",
      top: "25%",
      delay: 1.7,
      color: COLORS[4],
      scale: 1.1,
    },

    {
      left: "12%",
      top: "52%",
      delay: 2.1,
      color: COLORS[2],
      scale: 0.9,
    },

    {
      left: "82%",
      top: "49%",
      delay: 2.5,
      color: COLORS[1],
      scale: 1,
    },

  ];


  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        min-h-screen
        w-full
        overflow-hidden
        bg-black
      "
    >

      {/* =================================================
          PURE BLACK SKY
      ================================================= */}

      <div
        className="
          absolute
          inset-0
          z-[-30]
          bg-black
        "
      />


      {/* =================================================
          MILKY WAY
      ================================================= */}

      <MilkyWay />


      {/* =================================================
          FIREWORKS
      ================================================= */}

      {visible &&
        fireworks.map(
          (firework, index) => (

            <Firework
              key={`${runKey}-${index}`}
              {...firework}
            />

          )
        )
      }


      {/* =================================================
          BIRTHDAY NAME
          Z-80
      ================================================= */}

      {visible && (
        <BirthdayName
          key={runKey}
          runKey={runKey}
        />
      )}


      {/* =================================================
          SUBTITLE
      ================================================= */}

      {visible && (

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
            delay: 4.4,
            duration: 1.2,
          }}
          className="
            absolute
            left-1/2
            top-[49%]
            z-40
            -translate-x-1/2
            text-center
          "
        >

          <div
            className="
              whitespace-nowrap
              text-lg
              font-light
              tracking-[0.2em]
              text-[#f3eadb]
              md:text-2xl
            "
          >
            Happy 20th Birthday 🎂
          </div>


          <div
            className="
              mt-3
              text-[10px]
              tracking-[0.2em]
              text-[#d3c5e5]/50
              md:text-xs
            "
          >
            May the years ahead be filled
            with happiness.
          </div>

        </motion.div>

      )}


      {/* =================================================
          BALLOON
      ================================================= */}

      {visible &&
        !balloonGrabbed && (
          <WishBalloon
            key={`balloon-${runKey}`}
            onGrab={
              handleGrabBalloon
            }
          />
        )
      }


      {/* =================================================
          BALLOON -> CARD TRANSITION
      ================================================= */}

      <AnimatePresence>

        {visible &&
          balloonGrabbed &&
          !showWish && (

            <GreetingCard
              key={`greeting-${runKey}`}
              onWish={() =>
                setShowWish(true)
              }
              onClose={() => {
                setBalloonGrabbed(false);
              }}
            />

          )}

      </AnimatePresence>


      {/* =================================================
          WISH CARD
      ================================================= */}

      <AnimatePresence>

        {visible &&
          balloonGrabbed &&
          showWish && (

            <WishCard
              key={`wish-${runKey}`}
              onClose={() =>
                setShowWish(false)
              }
            />

          )}

      </AnimatePresence>


      {/* =================================================
          CAKE
      ================================================= */}

      {visible && (
        <BirthdayCake
          key={`cake-${runKey}`}
        />
      )}


      {/* =================================================
          TOP FADE
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          z-[90]
          h-20
          bg-gradient-to-b
          from-black
          to-transparent
        "
      />


      {/* =================================================
          BOTTOM FADE
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-[90]
          h-20
          bg-gradient-to-t
          from-black
          to-transparent
        "
      />

    </section>
  );
}