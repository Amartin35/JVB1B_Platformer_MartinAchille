import MONDE_1_NIVEAU_1 from "./niveaux/monde/monde_1/monde_1_niveau_1.js";
import MONDE_1_NIVEAU_10 from "./niveaux/monde/monde_1/monde_1_niveau_10.js";
import MONDE_1_NIVEAU_2 from "./niveaux/monde/monde_1/monde_1_niveau_2.js";
import MONDE_1_NIVEAU_3 from "./niveaux/monde/monde_1/monde_1_niveau_3.js";
import MONDE_1_NIVEAU_4 from "./niveaux/monde/monde_1/monde_1_niveau_4.js";
import MONDE_1_NIVEAU_5 from "./niveaux/monde/monde_1/monde_1_niveau_5.js";
import MONDE_1_NIVEAU_6 from "./niveaux/monde/monde_1/monde_1_niveau_6.js";
import MONDE_1_NIVEAU_7 from "./niveaux/monde/monde_1/monde_1_niveau_7.js";
import MONDE_1_NIVEAU_8 from "./niveaux/monde/monde_1/monde_1_niveau_8.js";
import MONDE_1_NIVEAU_9 from "./niveaux/monde/monde_1/monde_1_niveau_9.js";



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
			debug: false,
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
	scene: [

		MONDE_1_NIVEAU_1,
		MONDE_1_NIVEAU_2,
		MONDE_1_NIVEAU_3,
		MONDE_1_NIVEAU_4,
		MONDE_1_NIVEAU_5,
		MONDE_1_NIVEAU_6,
		MONDE_1_NIVEAU_7,
		MONDE_1_NIVEAU_8,
		MONDE_1_NIVEAU_9,
		MONDE_1_NIVEAU_10

	]
};

var game = new Phaser.Game(config);
game.scene.start("MONDE_1_NIVEAU_1"); // Lancement de la scene Menu


