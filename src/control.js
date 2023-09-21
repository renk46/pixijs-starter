
export default function Control(app) {
    const zoom = (x, y, deltaY) => {
        let isZoomIn = deltaY < 0
        let direction = isZoomIn ? 1 : -1
        let factor = (1 + direction * 0.1)

        const stage = app.stage

        const newScale = {x: stage.scale.x * factor, y: stage.scale.y * factor}
        newScale.x = newScale.x < 0 ? 0 : newScale.x
        newScale.y = newScale.y < 0 ? 0 : newScale.y

        let worldPos = {x: (x - stage.x) / stage.scale.x, y: (y - stage.y) / stage.scale.y};
        let newScreenPos = {x: (worldPos.x) * newScale.x + stage.x, y: (worldPos.y) * newScale.y + stage.y};

        stage.x -= (newScreenPos.x - x)
        stage.y -= (newScreenPos.y - y)

        stage.scale.x = newScale.x
        stage.scale.y = newScale.y
    }

    app.view.addEventListener("wheel", function (e) {
        zoom(e.clientX, e.clientY, e.deltaY)
    });

    let isMove = 0
    app.view.addEventListener("mousedown", function (e) {
        isMove = 1
    });
    app.view.addEventListener("mouseup", function (e) {
        isMove = 0
    });
    app.view.addEventListener("mousemove", function (e) {
        if (isMove) {
            app.stage.position.x += e.movementX
            app.stage.position.y += e.movementY
        }
    });

    return {
        zoom
    }
}