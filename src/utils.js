import { Text } from 'pixi.js'

export default function Utils(app) {
    function orbitPos(objX, objY, anchorX, anchorY, angle) {
        let x = (objX - anchorX) * Math.cos(angle) - (objY - anchorY) * Math.sin(angle) + anchorX;
        let y = (objX - anchorX) * Math.sin(angle) + (objY - anchorY) * Math.cos(angle) + anchorY;
        return {x, y}
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getDistanceBetweenPoint(a, b) {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
    }

    function getPositionWithoutNeighbor(distance, planets) {
        const x = getRandomArbitrary(-5000, 5000);
        const y = getRandomArbitrary(-5000, 5000);

        let r = planets.find((e) => getDistanceBetweenPoint({x, y}, {x: e.x, y: e.y}) < distance)
        if (r) {
            return getPositionWithoutNeighbor(distance, planets)
        } else {
            return {x, y}
        }
    }

    function drawCoords() {
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
    }

    const coords = []

    function drawCoordsDynamic() {
        let x0 = (app.stage.x * -1) / app.stage.scale.x
        let x1 = (app.view.width / app.stage.scale.x)

        let step = 10
        while (true) {
            if (((x1 - x0) / step) < 30) {
                break
            } else {
                step *= 10
            }
        }

        x0 -= (x0 % step)
        let y0 = (app.stage.y * -1) / app.stage.scale.y

        coords.forEach((e) => app.stage.removeChild(e))

        for (let i = x0; i < x0 + x1; i += step) {
            const text = new Text(i, {
                fontFamily: 'Arial',
                fontSize: 16 / app.stage.scale.x,
                fill: 0xff1010,
                align: 'center',
            });
            text.x = i
            text.y = y0
            app.stage.addChild(text);
            coords.push(text)
        }
    }

    return {
        orbitPos,
        getRandomArbitrary,
        getDistanceBetweenPoint,
        getPositionWithoutNeighbor,
        drawCoords,
        drawCoordsDynamic
    }
}
