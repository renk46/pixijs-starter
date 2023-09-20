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

// Load the logo
const texture = Texture.from('assets/sun.png');

const sun = new Sprite(texture);
sun.anchor.set(0.5); // We want to rotate our sun relative to the center, so 0.5
sun.scale.x = 0.05
sun.scale.y = 0.05
app.stage.addChild(sun);

const planet = new Sprite(texture);
planet.anchor.set(0.5);
planet.scale.x = 0.05
planet.scale.y = 0.05
app.stage.addChild(planet);

// Position the sun at the center of the stage
sun.x = app.screen.width * 0.5;
sun.y = app.screen.height * 0.5;

planet.x = sun.x + 250;
planet.y = sun.y;

for (let i = -50000; i < 50000; i = i + 100) {
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

for (let i = -50000; i < 50000; i = i + 100) {
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
  sun.rotation += 0.002 * delta;

  const angle = 0.002;
  let posPlanet = utils.orbitPos(planet.x, planet.y, sun.x, sun.y, angle)
  planet.x = posPlanet.x;
  planet.y = posPlanet.y;

  document.getElementById("info").innerHTML = `${app.ticker.FPS.toFixed(2)} FPS`
});
