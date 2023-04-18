import Test from "./niveaux/Test.js";
var gameViewport = document.getElementById("game_viewport");
addEventListener("resize", onResizeWindow);
function onResizeWindow(){
	var gameZoomX = (window.innerWidth - (window.innerWidth % GAME_WIDTH)) / GAME_WIDTH;
	var gameZoomY = (window.innerHeight - (window.innerHeight % GAME_HEIGHT)) / GAME_HEIGHT;
	var gameZoom = gameZoomX < gameZoomY ? gameZoomX : gameZoomY;
	gameViewport.style.width = (GAME_WIDTH * gameZoom) + 'px';
}

onResizeWindow();

// Configuration générale du jeu
var config = {
	type: Phaser.CANVAS,
	width: GAME_WIDTH,
	height: GAME_HEIGHT, 
	parent: 'game_viewport',
	render: {
		antialias: false
	},
	pixelArt: true,
	physics: {
		
		default: "arcade", 
		arcade: {
			debug: true,
			gravity: {
				y: GAME_GRAVITY // gravité verticale : acceleration ddes corps en pixels par seconde
			},
		},
		input: {
			gamepad: true
		},
	},
	fps: {
		target: 60,
		forceSetTimeOut: true
	},
	scene: [Test]
};

var game = new Phaser.Game(config);
game.scene.start("Test"); // Lancement de la scene Menu


