import * as PIXI from 'pixi.js';
import fragment from './shader/fragment.glsl';

let img = require('./stars.jpg');
let img1 = require('./mina.jpg');
let img2 = require('./weather.jpg');
// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application(window.innerWidth, window.innerHeight,{
    autoResize:true,
});
 
// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);
 

let loader = PIXI.loader;
loader.add('img0', img);
loader.add('img1', img1);
loader.add('img2', img2);



// load the texture we need
loader.load((loader, resources) => {
    

    let filter = new PIXI.Filter(null, fragment);

    // This creates a texture from a 'bunny.png' image.
    const bunny = new PIXI.Sprite(resources.img0.texture);
 
    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;
 
    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    //FILTERS
    bunny.filters = [filter];

    Filter.uniforms.uTextureone = resources.img0.texture;
 
    // Add the bunny to the scene we are building.
    app.stage.addChild(bunny);
 
    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
    });
});


    