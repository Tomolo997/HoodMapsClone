let circleZoomMax = 18;
let circleZoomMin = 13;
let map = L.map("map", {
  minZoom: circleZoomMin,
  maxZoom: circleZoomMax,
}).setView([46.5547, 15.6459], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const canvas = document.querySelector("#myCanvas");
const mapP = document.querySelector("#map");
const drawButton = document.querySelector(".draw");
const undrawButton = document.querySelector(".undraw");
undrawButton.addEventListener("click", function () {
  canvas.style.zIndex = 1;
  mapP.style.zIndex = 1;
});
console.log(drawButton);
function drawOnMap() {
  console.log(positionOnMap.position);
}
let lat, lng;
let position;
let positionOnMap;
drawButton.addEventListener("click", function () {
  canvas.style.zIndex = 2;
  mapP.style.zIndex = -1;
  let isDrawing = false;
  let ctx = canvas.getContext("2d");
  //getMouse position

  position = {
    x: 0,
    y: 0,
  };

  positionOnMap = {
    position: [{ positionX: 0, positionY: 0 }],
  };
  const getMousePosition = function (e) {
    let xP = e.pageX;
    let yP = e.pageY;
    position.x = xP;
    position.y = yP;
  };

  const mouseDraw = function (e) {
    if (!isDrawing) return;

    ctx.lineCap = "round";
    const changeColor = document.querySelectorAll(".changeColor");
    let color;
    changeColor.forEach((el) =>
      el.addEventListener("click", function (e) {
        ctx.strokeStyle = e.target.dataset.color;
        color = e.target.dataset.color;
      })
    );
    color = ctx.strokeStyle;
    /*
  blueColor.addEventListener("click", function (e) {
    console.log(e.target.dataset.color);
    ctx.strokeStyle = e.target.dataset.color;
  }),
  */
    //ctx.moveTo(position.x, position.y);
    getMousePosition(e);
    //ctx.lineTo(position.x, position.y);
    let zoom = map.getZoom();
    let declaredRadius;

    switch (zoom) {
      case 18:
        desiredRadius = 20;

        break;
      case 17:
        desiredRadius = 40;

        break;
      case 16:
        desiredRadius = 60;

        break;
      case 15:
        desiredRadius = 80;
      case 14:
        desiredRadius = 100;

        break;
      case 13:
        desiredRadius = 200;

        break;

      default:
        break;
    }

    let { lat, lng } = map.layerPointToLatLng([position.x, position.y]);
    positionOnMap.position.positionX = lat;
    positionOnMap.position.positionY = lng;
    L.circle([lat, lng], {
      color: color,
      radius: desiredRadius,
      opacity: 0.5,
      fillOpacity: 1,
    }).addTo(map);
    console.log(map.getZoom());
    console.log(desiredRadius);
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
