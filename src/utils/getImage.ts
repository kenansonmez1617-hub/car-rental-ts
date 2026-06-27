import type { ICar } from "../types";

const COLORS = [
  "imagin-black",
  "imagin-grey",
  "imagin-white",
  "imagin-blue",
  "imagin-yellow",
  "imagin-orange",
  "imagin-red",
  "imagin-green",
];

const getImage = (car: ICar, angle?: string, randomColor?: boolean): string => {
  const url = new URL("https://cdn.imagin.studio/getImage");

  url.searchParams.set("customer", "hrjavascript-mastery");
  url.searchParams.set("make", car.make);
  url.searchParams.set("modelFamily", car.basemodel);
  url.searchParams.set("modelYear", car.year);
  url.searchParams.set("zoomType", "fullscreen");

  if (angle) {
    url.searchParams.set("angle", angle);
  }

  if (randomColor) {
    const index = Math.round(Math.random() * COLORS.length);
    url.searchParams.set("paintId", COLORS[index]);
  }

  return url.href;
};

export default getImage;
