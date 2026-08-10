import MemoryCard from "./MemoryCard";


// ======================================================
// MEMORY LIST
// ======================================================

export default function MemoryList({
  memories = [],
  season,
}) {

  // Nothing to render

  if (!memories.length) {
    return null;
  }


  return (
    <div
      className="
        mt-10
        w-full
      "
    >

      <div
        className="
          flex
          flex-wrap
          items-start
          justify-center
          gap-8
          md:gap-10
        "
      >

        {memories.map(
          (memory, index) => (

            <MemoryCard
              key={
                `${memory.title}-${index}`
              }

              image={
                memory.image
              }

              title={
                memory.title
              }

              text={
                memory.text
              }

              season={
                season
              }

              index={
                index
              }
            />

          )
        )}

      </div>

    </div>
  );
}