import regeneratorRuntime from 'regenerator-runtime';
let circleZoomMax = 18;
let circleZoomMin = 10;
let map;
function loadMap(coords) {
  map = L.map('map', {
    minZoom: circleZoomMin,
    maxZoom: circleZoomMax,
  }).setView(coords, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}
function init() {
  loadMap([46.5547, 15.6459]);
}
console.log(key);
const getData = async function (city) {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=85e4ba3daac54c30927c3cd4df28ed86`
    );
    const data = response.json();
    return data;
  } catch (error) {}
};

init();
let searced = false;
const inputSearch = document.querySelector('.citySearch-input');
console.log(inputSearch);
const searchCityButton = document.querySelector('.btn-citySearch');
searchCityButton.addEventListener('click', async function () {
  const data = await getData(inputSearch.value);
  console.log(data.results[0]);
  searced = true;
  map.setView([data.results[0].geometry.lat, data.results[0].geometry.lng], 15);
  searced != true;
  inputSearch.value = '';
});

const canvas = document.querySelector('#myCanvas');
const mapP = document.querySelector('#map');
const drawButton = document.querySelector('.draw');
const undrawButton = document.querySelector('.undraw');
undrawButton.addEventListener('click', function () {
  canvas.style.zIndex = 1;
  mapP.style.zIndex = 1;
  addTextBoolean = false;
});

let addTextBoolean = false;

let lat, lng;
let position;
let positionOnMap;
let isDrawing = false;
let ctx = canvas.getContext('2d');
drawButton.addEventListener('click', function () {
  canvas.style.zIndex = 2;
  mapP.style.zIndex = -1;

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
  const changeColor = document.querySelectorAll('.changeColor');
  let color = 'red';
  ctx.strokeStyle = 'red';
  changeColor.forEach((el) =>
    el.addEventListener('click', function (e) {
      ctx.strokeStyle = e.target.dataset.color;
      color = e.target.dataset.color;
    })
  );
  const mouseDraw = function (e) {
    if (!isDrawing) return;

    ctx.lineCap = 'round';

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
      case 12:
        desiredRadius = 400;

        break;
      case 11:
        desiredRadius = 600;

        break;
      case 10:
        desiredRadius = 1200;

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
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', mouseDraw);
  canvas.addEventListener('mouseup', stopDrawing);
});

//add a text
/*
const addText = document.querySelector('.text');
addText.addEventListener('click', function (e) {
  addTextBoolean = true;
  if (addTextBoolean) {
    map.on('click', function (e) {
      console.log(e.latlng);
      let latlng = [e.latlng.lat - 0.0015, e.latlng.lng];
      let popup = L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
      })
        .setContent(
          `<div class="popup"><span class="span-yea"><span>
          <input class='input'><button class='btn-yea'>Submit</button><button class='btn-close'>close</button></div>`
        )
        .setLatLng(latlng)
        .openOn(map);
      const buttonClose = document.querySelectorAll('.btn-close');
      const inputPopUp = document.querySelectorAll('.input');
      const addSpan = document.querySelectorAll('.span-yea');
      const yeaSubmit = document.querySelectorAll('.btn-yea');

      buttonClose.forEach((el) =>
        el.addEventListener('click', function (e) {
          popup.setContent('');
          map.removeLayer(popup);
        })
      );
      const leafLetPopUp = document.querySelectorAll('.leaflet-popup');
      const closeButton = document.querySelector('.leaflet-popup-close-button');
      leafLetPopUp.forEach((el) =>
        el.addEventListener('click', function () {
          closeButton.style.display = 'block';
        })
      );
      yeaSubmit.forEach((el) =>
        el.addEventListener('click', function (e) {
          console.log(e.target.parentElement.firstChild.nextSibling);
          e.target.parentElement.textContent =
            e.target.parentElement.firstChild.nextSibling.value;
        })
      );
    });
  }
  addTextBoolean = false;
});

console.log(innerHeight);
console.log(innerWidth);

//when i hover the pop up the close button shows
*/
