import { motion } from "motion/react";


// ======================================================
// SEASON COLORS
// ======================================================

const SEASON_COLORS = {
  spring: {
    accent: "#f2a9c0",
    glow: "#f2a9c0",
  },

  summer: {
    accent: "#dfc276",
    glow: "#dfc276",
  },

  autumn: {
    accent: "#d38a55",
    glow: "#d38a55",
  },

  winter: {
    accent: "#a9c8df",
    glow: "#a9c8df",
  },

  night: {
    accent: "#b9a3d4",
    glow: "#b9a3d4",
  },
};


// ======================================================
// MEMORY CARD
// ======================================================

export default function MemoryCard({
  image,
  title,
  text,
  season = "spring",
  index = 0,
}) {
  const colors =
    SEASON_COLORS[season] ||
    SEASON_COLORS.spring;


  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.96,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      viewport={{
        once: true,
        amount: 0.2,
      }}

      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}

      className="
        group
        relative
        w-full
        max-w-[280px]
        overflow-hidden
        rounded-[1.5rem]
        border
        bg-[#0c0a10]/80
        backdrop-blur-xl
      "

      style={{
        borderColor:
          `${colors.accent}25`,

        boxShadow:
          `0 15px 50px ${colors.glow}10`,
      }}
    >

      {/* =================================================
          IMAGE
      ================================================= */}

      <div
        className="
          relative
          aspect-[4/5]
          w-full
          overflow-hidden
        "
      >

        {image ? (
          <motion.img
            src={image}
            alt={title || "Memory"}
            className="
              h-full
              w-full
              object-cover
            "

            whileHover={{
              scale: 1.05,
            }}

            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-white/[0.03]
              text-xs
              tracking-[0.2em]
              text-white/20
            "
          >
            MEMORY
          </div>
        )}


        {/* Image gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0c0a10]
            via-transparent
            to-transparent
            opacity-90
          "
        />


        {/* Season glow */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-0
            transition-opacity
            duration-700
            group-hover:opacity-100
          "

          style={{
            boxShadow:
              `inset 0 0 50px ${colors.glow}22`,
          }}
        />

      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          relative
          px-5
          pb-5
          pt-3
        "
      >

        {/* Small decorative line */}

        <div
          className="
            mb-3
            h-px
            w-8
          "

          style={{
            backgroundColor:
              colors.accent,
          }}
        />


        {/* Title */}

        <h3
          className="
            text-base
            font-light
            tracking-[0.08em]
          "

          style={{
            color:
              "#f3eadb",
          }}
        >
          {title}
        </h3>


        {/* Description */}

        {text && (
          <p
            className="
              mt-2
              text-sm
              leading-6
              text-white/45
            "
          >
            {text}
          </p>
        )}

      </div>

    </motion.article>
  );
}