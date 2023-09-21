import { Application, Sprite, Texture, Text } from 'pixi.js'
import Control from './control'
import Utils from './utils'

const app = new Application({
  width: window.innerWidth,
	height: window.innerHeight,
  backgroundColor: 0xFFFFFF,
  view: document.querySelector('#scene')
});

const control = new Control(app)
const utils = new Utils(app)

const texture = Texture.from('assets/sun.png');

let planets = []

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getDistanceBetweenPoint(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
}

function getPositionWithoutNeibor(distance, planets) {
  const x = getRandomArbitrary(-5000, 5000);
  const y = getRandomArbitrary(-5000, 5000);

  let r = planets.find((e) => getDistanceBetweenPoint({x, y}, {x: e.x, y: e.y}) < distance)
  if (r) {
    return getPositionWithoutNeibor(distance, planets)
  } else {
    return {x, y}
  }
}

for (let i = 0; i < 50; i++) {
  const planet = new Sprite(texture);
  planet.anchor.set(0.5);
  planet.scale.x = 0.05
  planet.scale.y = 0.05

  const {x, y} = getPositionWithoutNeibor(500, planets)

  planet.x = x
  planet.y = y

  planets.push(planet)

  app.stage.addChild(planet);
}



for (let i = -50000; i < 50000; i += 100) {
  const text = new Text(i, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xff1010,
    align: 'center',
  });
  text.x = i
  text.y = 0
  app.stage.addChild(text);
}

for (let i = -50000; i < 50000; i += 100) {
  const text = new Text(i, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xff1010,
    align: 'center',
  });
  text.x = 0
  text.y = i
  app.stage.addChild(text);
}



// Put the rotating function into the update loop
app.ticker.add((delta) => {
  document.getElementById("info").innerHTML = `${app.ticker.FPS.toFixed(2)} FPS`
});

let distance = document.getElementById("distance");
distance.oninput = function() {
  planets.forEach((e, i, arr) => {
    const {x, y} = getPositionWithoutNeibor(this.value, planets)
    e.x = x
    e.y = y
  })
}
