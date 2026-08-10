import SpringEffect from "./SpringEffect";
import SummerEffect from "./SummerEffect";
import AutumnEffect from "./AutumnEffect";
import WinterEffect from "./WinterEffect";
import NightEffect from "./NightEffect";

export default function TimelineEffects({
  season,
}) {
  switch (season) {

    case "spring":
      return <SpringEffect />;

    case "summer":
      return <SummerEffect />;

    case "autumn":
      return <AutumnEffect />;

    case "winter":
      return <WinterEffect />;

    case "night":
      return <NightEffect />;

    default:
      return null;
  }
}