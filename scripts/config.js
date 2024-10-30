let lengthFish = 20;

export function randomColor() {
  let r, g, b;

  let max = 160;
  let min = 30;

  r = Math.floor(Math.random() * max) + min;
  g = Math.floor(Math.random() * max) + min;
  b = Math.floor((Math.random() * max) / 0.2) + min;

  return {
    firstColor: `rgba(${r},${g},${b},0.8)`,
    secondColor: `rgba(${r / 2},${g / 2},${b / 2},0.8)`,
  };
}
export const root = {
  lengthFish: lengthFish,
  extensionFish: lengthFish / 2,
};
