let map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
const canvas = document.querySelector("#myCanvas");
const mapP = document.querySelector("#map");
const drawButton = document.querySelector(".draw");
const undrawButton = document.querySelector(".undraw");
undrawButton.addEventListener("click", function () {
  canvas.style.zIndex = -1;
  mapP.style.zIndex = 2;
});
console.log(drawButton);
drawButton.addEventListener("click", function () {
  canvas.style.zIndex = 2;
  mapP.style.zIndex = -1;
  let isDrawing = false;
  let ctx = canvas.getContext("2d");
  //getMouse position

  let position = {
    x: 0,
    y: 0,
  };

  const getMousePosition = function (e) {
    let xP = e.pageX;
    let yP = e.pageY;
    position.x = xP;
    position.y = yP;
  };
  let color;

  const mouseDraw = function (e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.lineWidth = 12;

    ctx.lineCap = "round";
    const changeColor = document.querySelectorAll(".changeColor");

    changeColor.forEach((el) =>
      el.addEventListener("click", function (e) {
        ctx.strokeStyle = e.target.dataset.color;
      })
    );
    /*
  blueColor.addEventListener("click", function (e) {
    console.log(e.target.dataset.color);
    ctx.strokeStyle = e.target.dataset.color;
  }),
  */
    ctx.moveTo(position.x, position.y);
    getMousePosition(e);

    ctx.lineTo(position.x, position.y);

    ctx.stroke();
  };
  function startDrawing(e) {
    isDrawing = true;
    getMousePosition(e);
  }
  function stopDrawing() {
    isDrawing = false;
  }
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", mouseDraw);
  canvas.addEventListener("mouseup", stopDrawing);
});
