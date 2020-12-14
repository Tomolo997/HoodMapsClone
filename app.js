<<<<<<< HEAD
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

let lat, lng;
let position;
let positionOnMap;
let ctx = canvas.getContext("2d");
drawButton.addEventListener("click", function () {
  canvas.style.zIndex = 2;
  mapP.style.zIndex = -1;
  let isDrawing = false;

  //getMouse position

  position = {
    x: 0,
    y: 0,
  };
  const yea = map.getPixelBounds();
  console.log(yea);
  positionOnMap = {
    position: [{ positionX: 0, positionY: 0 }],
  };
  const getMousePosition = function (e) {
    let xP = e.clientX;
    let yP = e.clientY;
    position.x = xP;
    position.y = yP;
  };
  const changeColor = document.querySelectorAll(".changeColor");
  let color = "red";
  ctx.strokeStyle = "red";
  changeColor.forEach((el) =>
    el.addEventListener("click", function (e) {
      ctx.strokeStyle = e.target.dataset.color;
      color = e.target.dataset.color;
    })
  );
  const mouseDraw = function (e) {
    if (!isDrawing) return;

    ctx.lineCap = "round";

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
    let desiredRadius;

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

    let { lat, lng } = map.containerPointToLatLng([position.x, position.y]);
    positionOnMap.position.positionX = lat;
    positionOnMap.position.positionY = lng;

    L.circle(
      [positionOnMap.position.positionX, positionOnMap.position.positionY],
      {
        color: color,
        radius: desiredRadius,
        opacity: 0.5,
        fillOpacity: 1,
      }
    ).addTo(map);

    //console.log(position);
    //console.log(positionOnMap);
    let yea = map.latLngToLayerPoint([lat, lng]);
    let xCoords = yea.x;
    let yCoords = yea.y;
    console.log(position);
    console.log(positionOnMap.position);
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

//add a text

const addText = document.querySelector(".text");
addText.addEventListener("click", function (e) {
  map.on("click", function (e) {
    console.log(e.latlng);
    let latlng = [e.latlng.lat, e.latlng.lng];
    var popup = L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
    })
      .setContent("<input class='input'>")
      .setLatLng(latlng)
      .openOn(map);
  });
});
=======
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
>>>>>>> 280a4899818be10fe1789c737593960041b65c89
