import * as PIXI from 'pixi.js';

let img_desert = require('./starry.jpg');
let bg  = require('./desert.jpg');



let app =  new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true, 
    transparent: false,
    resolution:1
});

document.body.appendChild(app.view);

app.renderer.autoResize = true;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);

app.stage.interactive = true;
let container = new PIXI.Container();
let posX, imagenDesierto, filtroDesierto, filtroBlackWhite, vx, map;


app.stage.addChild(container);
PIXI.loader.add('desierto', img_desert)
PIXI.loader.add('bg', bg);

PIXI.loader.load((loader, resources) => {
    posX =app.renderer.width / 2;       
    imagenDesierto = new PIXI.Sprite(resources.desierto.texture);
    filtroDesierto = new PIXI.filters.DisplacementFilter(imagenDesierto);
    filtroBlackWhite = new PIXI.filters.ColorMatrixFilter(imagenDesierto);

    imagenDesierto.anchor.set(0.5);
    imagenDesierto.x = app.renderer.width / 2;
    imagenDesierto.y = app.renderer.width / 2;
    vx = imagenDesierto.x;


    app.stage.addChild(imagenDesierto);
    filtroBlackWhite.greyscale(.54);
    container.filters = [filtroDesierto, filtroBlackWhite];
    filtroDesierto.scale.x = 0;
    filtroDesierto.scale.y = 0;

    bg = new PIXI.Sprite(resources.bg.texture);
    bg.width = app.renderer.width;
    bg.height = app.renderer.height;
    container.addChild(bg);
    app.stage.on('mousemove', onPointerMove).on('touchMove', onPointerMove);
    loop();
});

function onPointerMove(eventData) {
    posX = eventData.data.global.x;
}

function loop() {
    requestAnimationFrame(loop);
    vx += (posX - imagenDesierto.x) * 0.045;
    imagenDesierto.x = vx;
    let disp = Math.floor(posX - imagenDesierto.x);
    if(disp<0) disp = -disp;
    var fs  = map(disp, 0, 50, 0, 120);
    disp = map(disp, 0, 10, 0.1, 1);
    imagenDesierto.scale.x = disp;
    filtroDesierto.scale.x = fs;
}

map = function(n, start1, stop1, start2, stop2) {
    var newval = (n - start1 ) / (stop1 - start1) * (stop2 - start2) + start2;
    return newval;
}
