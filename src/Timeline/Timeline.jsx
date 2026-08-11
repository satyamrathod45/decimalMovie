import { useState } from "react";

import TimelineLine from "./TimelineLine";
import YearSection from "./YearSection";
import AgeCounter from "./AgeCounter";
import TimelineEffects from "./TimelineEffects";
import BirthdayCelebration from "./BirthdayCelebration";


// ======================================================
// IMAGES
// ======================================================

import image2006 from "../assets/memories/2006.png";
import image2007 from "../assets/memories/2007.png";
import image2008 from "../assets/memories/2008.png";
import image2009 from "../assets/memories/2009.png";
import image2010 from "../assets/memories/2010.png";
import image2011 from "../assets/memories/2011.png";
import image2014 from "../assets/memories/2014.png";
import image2016 from "../assets/memories/2016.png";
import image2018 from "../assets/memories/2018.png";
import image2019 from "../assets/memories/2019.png";
import image2020 from "../assets/memories/2020.png";
import image2021 from "../assets/memories/2021.png";
import image2022 from "../assets/memories/2022.png";
import image2023 from "../assets/memories/2023.png";

import image2024 from "../assets/memories/2024.png";
import image2024_2 from "../assets/memories/2024_2.png";

import image2025 from "../assets/memories/2025.png";
import image2025_2 from "../assets/memories/2025_2.png";
import image2025_3 from "../assets/memories/2025_3.png";


// ======================================================
// YEARS
// ======================================================

const YEARS = [

  // ====================================================
  // 2006
  // ====================================================

  {
    year: 2006,

    season: "spring",

    memories: [
      {
        image: image2006,

        title: "The beginning",

        text:
          "Before there were memories to remember, there was simply a little girl discovering the world.",
      },
    ],
  },


  // ====================================================
  // 2007
  // ====================================================

  {
    year: 2007,

    season: "spring",

    memories: [
      {
        image: image2007,

        title: "First little steps",

        text:
          "One year later, the world was no longer something to watch. It was something to walk into.",
      },
    ],
  },


  // ====================================================
  // 2008
  // ====================================================

  {
    year: 2008,

    season: "spring",

    memories: [
      {
        image: image2008,

        title: "A little world of her own",

        text:
          "At two, the world could still fit inside a room filled with toys, tiny discoveries, and things only a child could find fascinating.",
      },
    ],
  },


  // ====================================================
  // 2009
  // ====================================================

  {
    year: 2009,

    season: "spring",

    memories: [
      {
        image: image2009,

        title: "The world gets bigger",

        text:
          "Then came nursery. A tiny backpack, unfamiliar faces, and a whole new little world waiting beyond home.",
      },
    ],
  },


  // ====================================================
  // 2010
  // ====================================================

  {
    year: 2010,

    season: "spring",

    memories: [
      {
        image: image2010,

        title: "A little more grown",

        text:
          "Wait... were you really this tiny once? 👀",
      },
    ],
  },


  // ====================================================
  // 2011
  // ====================================================

  {
    year: 2011,

    season: "summer",

    memories: [
      {
        image: image2011,

        title: "The little troublemaker",

        text:
          "I have a feeling you weren't always the easiest child to keep an eye on. Maybe you had a talent for turning perfectly normal afternoons into tiny disasters.",
      },
    ],
  },


  // ====================================================
  // 2014
  // ====================================================

  {
    year: 2014,

    season: "summer",

    memories: [
      {
        image: image2014,

        title: "Little adventures",

        text:
          "The world was no longer just something to look at. It was something to explore, run through, climb around, and turn into an adventure.",
      },
    ],
  },


  // ====================================================
  // 2016
  // ====================================================

  {
    year: 2016,

    season: "autumn",

    memories: [
      {
        image: image2016,

        title: "Growing up",

        text:
          "Somewhere around here, childhood started becoming something a little different. The world was getting bigger, and so was she.",
      },
    ],
  },


  // ====================================================
  // 2018
  // ====================================================

  {
    year: 2018,

    season: "autumn",

    memories: [
      {
        image: image2018,

        title: "Finding herself",

        text:
          "The little girl was slowly becoming someone with her own interests, her own thoughts, and a personality that was beginning to shine through.",
      },
    ],
  },


  // ====================================================
  // 2019
  // ====================================================

  {
    year: 2019,

    season: "autumn",

    memories: [
      {
        image: image2019,

        title: "Becoming herself",

        text:
          "Friends, laughter, school days, ordinary afternoons. The little moments were quietly becoming part of the person she would grow into.",
      },
    ],
  },


  // ====================================================
  // 2020
  // ====================================================

  {
    year: 2020,

    season: "autumn",

    memories: [
      {
        image: image2020,

        title: "A strange year",

        text:
          "The world suddenly became quieter. Days moved differently, and perhaps there was more time to sit by a window, think, read, and simply watch the world outside.",
      },
    ],
  },


  // ====================================================
  // 2021
  // ====================================================

  {
    year: 2021,

    season: "winter",

    memories: [
      {
        image: image2021,

        title: "Looking ahead",

        text:
          "The future was beginning to feel closer now. There were dreams to chase, questions to answer, and a whole life still waiting ahead.",
      },
    ],
  },


  // ====================================================
  // 2022
  // ====================================================

  {
    year: 2022,

    season: "winter",

    memories: [
      {
        image: image2022,

        title: "The first big challenge",

        text:
          "Tenth boards were approaching. Books, notes, practice papers, and the pressure of figuring out what came next.",
      },
    ],
  },


  // ====================================================
  // 2023
  // ====================================================

  {
    year: 2023,

    season: "winter",

    memories: [
      {
        image: image2023,

        title: "A new direction",

        text:
          "Eleventh began, and with it came a new kind of ambition. JEE, engineering, and a future that was slowly taking shape.",
      },
    ],
  },


  // ====================================================
  // 2024
  // ====================================================

  {
    year: 2024,

    season: "winter",

    memories: [

      {
        image: image2024,

        title: "The challenge",

        text:
          "12th boards, JEE, MHT-CET, and the long road toward the future she was preparing to build.",
      },

      {
        image: image2024_2,

        title: "A new beginning",

        text:
          "And after all those exams, one door opened to a completely new chapter: YCCE.",
      },

    ],
  },


  // ====================================================
  // 2025
  // ====================================================

  {
    year: 2025,

    season: "night",

    memories: [

      {
        image: image2025,

        title: "A new life",

        text:
          "College was no longer something waiting in the future. It had finally become her everyday life.",
      },

      {
        image: image2025_2,

        title: "The little moments",

        text:
          "Between lectures, friendships, laughter, and the occasional phone hiding in the middle of class, a new world was forming.",
      },

      {
        image: image2025_3,

        title: "Building something of her own",

        text:
          "The little girl who once discovered the world was now beginning to build things inside it.",
      },

    ],
  },


  // ====================================================
  // 2026
  // ====================================================

  {
    year: 2026,

    season: "night",

    memories: [],
  },

];


// ======================================================
// MAIN TIMELINE
// ======================================================

export default function Timeline() {

  // ====================================================
  // ACTIVE YEAR
  // ====================================================

  const [activeYear, setActiveYear] =
    useState(2006);


  // ====================================================
  // ACTIVE SEASON
  // ====================================================

  const [activeSeason, setActiveSeason] =
    useState("spring");


  // ====================================================
  // AGE
  //
  // 2006 → 0
  // 2007 → 1
  // ...
  // 2026 → 20
  // ====================================================

  const age =
    Math.max(
      0,
      activeYear - 2006
    );


  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        text-white
      "
    >

      {/* =================================================
          TIMELINE SEASON EFFECT
      ================================================= */}

      <TimelineEffects
        season={activeSeason}
      />


      {/* =================================================
          AGE COUNTER
      ================================================= */}

      <AgeCounter
        age={age}
        season={activeSeason}
      />


      {/* =================================================
          TIMELINE AREA
      ================================================= */}

      <div
        className="
          relative
          z-20
          mx-auto
          w-full
          max-w-4xl
          px-6
          md:px-10
        "
      >

        {/* =================================================
            TIMELINE LINE
        ================================================= */}

        <TimelineLine
          season={activeSeason}
        />


        {/* =================================================
            YEARS + MEMORIES
        ================================================= */}

        <div
          className="
            relative
            flex
            flex-col
          "
        >

          {YEARS.map((item) => (

            <YearSection
              key={item.year}

              year={item.year}

              season={item.season}

              memories={
                item.memories
              }

              activeYear={
                activeYear
              }

              onVisible={() => {

                setActiveYear(
                  item.year
                );

                setActiveSeason(
                  item.season
                );

              }}
            />

          ))}

        </div>

      </div>


      {/* =================================================
          BIRTHDAY FINALE

          IMPORTANT:
          This is OUTSIDE the timeline container.

          It is a completely new full-screen section.

          BirthdayCelebration itself detects when it
          enters the viewport and starts/restarts:

          🎆 Fireworks
          🔊 Cracker sound
          🚀 Name animation
          🌌 Milky Way
          🎂 Cake
          ✨ Make a Wish
      ================================================= */}

      <BirthdayCelebration />

    </main>
  );
}