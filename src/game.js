import HUB from "./niveaux/score_and_hub/hub.js";
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
import MONDE_2_NIVEAU_1 from "./niveaux/monde/monde_2/monde_2_niveau_1.js";
import MONDE_2_NIVEAU_10 from "./niveaux/monde/monde_2/monde_2_niveau_10.js";
import MONDE_2_NIVEAU_2 from "./niveaux/monde/monde_2/monde_2_niveau_2.js";
import MONDE_2_NIVEAU_3 from "./niveaux/monde/monde_2/monde_2_niveau_3.js";
import MONDE_2_NIVEAU_4 from "./niveaux/monde/monde_2/monde_2_niveau_4.js";
import MONDE_2_NIVEAU_5 from "./niveaux/monde/monde_2/monde_2_niveau_5.js";
import MONDE_2_NIVEAU_6 from "./niveaux/monde/monde_2/monde_2_niveau_6.js";
import MONDE_2_NIVEAU_7 from "./niveaux/monde/monde_2/monde_2_niveau_7.js";
import MONDE_2_NIVEAU_8 from "./niveaux/monde/monde_2/monde_2_niveau_8.js";
import MONDE_2_NIVEAU_9 from "./niveaux/monde/monde_2/monde_2_niveau_9.js";
import END_MONDE_SCENE1 from "./niveaux/score_and_hub/score_monde_1.js";
import END_MONDE_SCENE2 from "./niveaux/score_and_hub/score_monde_2.js";
import END_JEU_SCENE from "./niveaux/score_and_hub/score_fin.js";
import MONDE_3_NIVEAU_1 from "./niveaux/monde/monde_3/monde_3_niveau_1.js";
import MONDE_3_NIVEAU_2 from "./niveaux/monde/monde_3/monde_3_niveau_2.js";
import MONDE_3_NIVEAU_3 from "./niveaux/monde/monde_3/monde_3_niveau_3.js";
import MONDE_3_NIVEAU_4 from "./niveaux/monde/monde_3/monde_3_niveau_4.js";



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
	type: Phaser.WEBGL,
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
				y: GAME_GRAVITY 
			},
		},
		input: { 
			gamepad: true
		},
	},
	fps: {
		target: FRAME_RATE,
		forceSetTimeOut: true
	},
	scene: [
		
		HUB,
		END_MONDE_SCENE1,
		END_MONDE_SCENE2,
		END_JEU_SCENE,


		MONDE_1_NIVEAU_1,
		MONDE_1_NIVEAU_2,
		MONDE_1_NIVEAU_3,
		MONDE_1_NIVEAU_4,
		MONDE_1_NIVEAU_5,
		MONDE_1_NIVEAU_6,
		MONDE_1_NIVEAU_7,
		MONDE_1_NIVEAU_8,
		MONDE_1_NIVEAU_9,
		MONDE_1_NIVEAU_10,


		MONDE_2_NIVEAU_1,
		MONDE_2_NIVEAU_2,
		MONDE_2_NIVEAU_3,
		MONDE_2_NIVEAU_4,
		MONDE_2_NIVEAU_5,
		MONDE_2_NIVEAU_6,
		MONDE_2_NIVEAU_7,
		MONDE_2_NIVEAU_8,
		MONDE_2_NIVEAU_9,
		MONDE_2_NIVEAU_10,


		MONDE_3_NIVEAU_1,
		MONDE_3_NIVEAU_2,
		MONDE_3_NIVEAU_3,
		MONDE_3_NIVEAU_4,

	]
};
var game = new Phaser.Game(config);
game.scene.start("HUB"); // Lancement de la scène Menu

