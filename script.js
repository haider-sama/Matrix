const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let cw = window.innerWidth;
let ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;
let charArr = ["0", "1"];
let maxCharCount = 1000;
let fallCharArr = [];
let fontSize = 13;
let maxColumns = cw / fontSize;
let frames = 0;

class FallingChar {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        this.value =
        charArr[Math.floor(Math.random() * (charArr.length))];
        this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        ctx.fillStyle = "rgba(0, 255, 0)";
        ctx.font = fontSize + "px sans-serif";
        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > ch) {
            this.y = (Math.random() * ch) / 2 - 50;
            this.x = Math.floor(Math.random() * maxColumns) * fontSize;
            this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        }
    }
}

let update = () => {
    if (fallCharArr.length < maxCharCount) {
        let fallingChar = new FallingChar(
        Math.floor(Math.random() * maxColumns) * fontSize,
        (Math.random() * ch) / 2 - 50
        );
        fallCharArr.push(fallingChar);
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, cw, ch);
    for (let i = 0; i < fallCharArr.length && frames % 2 == 0; i++) {
      fallCharArr[i].draw(ctx);
    }
  
    requestAnimationFrame(update);
    frames++;
};

update();