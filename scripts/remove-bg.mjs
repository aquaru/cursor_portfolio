import { Jimp } from "jimp";

const INPUT = "C:/Users/tgedu11/.cursor/projects/c-Users-tgedu11-Desktop-cursor-port/assets/hero-avatar.png";
const OUTPUT = "c:/Users/tgedu11/Desktop/cursor_port/public/hero-avatar.png";

const THRESHOLD = 30; // white tolerance (0-255)

const img = await Jimp.read(INPUT);

img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
  const r = this.bitmap.data[idx];
  const g = this.bitmap.data[idx + 1];
  const b = this.bitmap.data[idx + 2];

  // If pixel is near-white, make transparent
  if (r > 255 - THRESHOLD && g > 255 - THRESHOLD && b > 255 - THRESHOLD) {
    this.bitmap.data[idx + 3] = 0;
  }
});

await img.write(OUTPUT);
console.log("Done:", OUTPUT);
