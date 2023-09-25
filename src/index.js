import { Application, Sprite, Texture } from 'pixi.js'
import Control from './control'
import Utils from './utils'

const app = new Application({
  width: window.innerWidth,
	height: window.innerHeight,
  backgroundColor: 0x000000,
  view: document.querySelector('#scene')
});

const utils = new Utils(app)
const control = new Control(app, utils)
const texture = Texture.from('assets/sun.png');

let planets = []

// for (let i = 0; i < 50; i++) {
//   const planet = new Sprite(texture);
//   planet.anchor.set(0.5);
//   planet.scale.x = 0.05
//   planet.scale.y = 0.05

//   const {x, y} = utils.getPositionWithoutNeibor(500, planets)

//   planet.x = x
//   planet.y = y

//   planets.push(planet)

//   app.stage.addChild(planet);
// }

// Put the rotating function into the update loop
app.ticker.add((delta) => {
  document.getElementById("info").innerHTML = `${app.ticker.FPS.toFixed(2)} FPS`
});

let distance = document.getElementById("distance");
distance.oninput = function() {
  planets.forEach((e, i, arr) => {
    const {x, y} = utils.getPositionWithoutNeighbor(this.value, planets)
    e.x = x
    e.y = y
  })
}

app.stage.scale.x = 0.2
app.stage.scale.y = 0.2

utils.drawCoords()
