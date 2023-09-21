
export default function Utils(app) {
    const orbitPos = (objX, objY, anchorX, anchorY, angle) => {
        let x = (objX - anchorX) * Math.cos(angle) - (objY - anchorY) * Math.sin(angle) + anchorX;
        let y = (objX - anchorX) * Math.sin(angle) + (objY - anchorY) * Math.cos(angle) + anchorY;
        return {x, y}
    }

    const drawCoords = (app) => {

    }

    return {
        orbitPos,
        drawCoords
    }
}