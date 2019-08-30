class Picture {
  constructor(w, h, pixels) {
    this.width = w;
    this.height = h;
    this.pixels = pixels;
  }

  static empty(w, h, color) {
    const pixels = new Array(w * h).fill(color);
    return new Picture(w, h, pixels);
  }

  pixel(x, y) {
    return this.pixels[x + y * this.width];
  }
}

export default Picture;
