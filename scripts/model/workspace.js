import Fish from "./fishModel.js";
import { root } from "../config.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export default class Workspace {
  constructor() {
    this.fishs = [];
    this.createFish();
  }

  createFish() {
    for (let i = 0; i < 3; i++) {
      this.fishs.push(
        new Fish(
          100,
          100,
          root.extensionFish,
          0.2,
          root.lengthFish,
          root.colorFIsh
        )
      );
    }
  }

  clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  update() {
    this.clear();
    this.fishs.forEach((fish) => {
      fish.update();
    });
    requestAnimationFrame(this.update.bind(this));
  }
}
