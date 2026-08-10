import {
  AnimatePresence,
  motion,
} from "motion/react";


const SEASON_DATA = {

  spring: {
    color: "#f3c5d3",
    glow: "#f2a9c0",
    icon: "🌸",
  },

  summer: {
    color: "#e8d39a",
    glow: "#dfc276",
    icon: "☀️",
  },

  autumn: {
    color: "#dfaa7c",
    glow: "#d38a55",
    icon: "🍂",
  },

  winter: {
    color: "#c5d9e8",
    glow: "#a9c8df",
    icon: "❄️",
  },

  night: {
    color: "#d3c5e5",
    glow: "#b9a3d4",
    icon: "🌙",
  },

};


export default function AgeCounter({
  age,
  season,
}) {

  const data =
    SEASON_DATA[season];


  return (

    <div
      className="
        pointer-events-none
        fixed
        right-5
        top-1/2
        z-50
        -translate-y-1/2
        text-center
        md:right-10
      "
    >

      {/* ========================================
          SEASON ICON
      ========================================= */}

      <motion.div
        key={season}

        initial={{
          opacity: 0,
          scale: 0.5,
          rotate: -20,
        }}

        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}

        transition={{
          duration: 0.5,
        }}

        style={{
          filter: `
            drop-shadow(
              0 0 7px ${data.glow}
            )
          `,
        }}

        className="
          mb-3
          text-xl
        "
      >
        {data.icon}
      </motion.div>


      {/* ========================================
          AGE LABEL
      ========================================= */}

      <div
        className="
          text-[8px]
          uppercase
          tracking-[0.45em]
        "

        style={{
          color: data.color,
          opacity: 0.55,
        }}
      >
        AGE
      </div>


      {/* ========================================
          NUMBER
      ========================================= */}

      <div
        className="
          relative
          mt-1
          h-[70px]
          w-[90px]
          overflow-hidden
        "
      >

        <AnimatePresence
          mode="popLayout"
          initial={false}
        >

          <motion.div
            key={age}

            initial={{
              y: "100%",
              opacity: 0,
            }}

            animate={{
              y: "0%",
              opacity: 1,
            }}

            exit={{
              y: "-100%",
              opacity: 0,
            }}

            transition={{
              duration: 0.55,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}

            style={{
              color: data.color,

              textShadow: `
                0 0 12px ${data.glow}66,
                0 0 30px ${data.glow}22
              `,
            }}

            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              text-5xl
              font-light
              leading-none
            "
          >
            {age}
          </motion.div>

        </AnimatePresence>

      </div>


      {/* ========================================
          YEARS
      ========================================= */}

      <div
        className="
          mt-1
          text-[7px]
          uppercase
          tracking-[0.4em]
        "

        style={{
          color: data.color,
          opacity: 0.35,
        }}
      >
        YEARS
      </div>

    </div>
  );
}