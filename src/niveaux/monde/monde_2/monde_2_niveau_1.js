import Doppelganger from "../../../entities/doppelganger.js";
import Player from "../../../entities/player.js";

export default class MONDE_2_NIVEAU_1 extends Phaser.Scene{
	constructor() {
		super({key : "MONDE_2_NIVEAU_1"});
	}
	/////////////////////////////////////// CREATE ///////////////////////////////////////
	create(){
		// Map
		const map = this.add.tilemap("map_monde_2_niveau_1");
		const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");
		
		const propsLayer = map.createLayer("Props", tileset).setDepth(PROPS_LAYER_DEPTH);
		const backgroundLayer = map.createLayer("Background",tileset).setDepth(BACKGROUND_LAYER_DEPTH);
		const solideLayer = map.createLayer("Solide",tileset).setDepth(SOLIDE_LAYER_DEPTH);
		const finLayer = map.createLayer("Fin",tileset).setDepth(FIN_LAYER_DEPTH);

		this.add.image(0, 0, 'BackgroundM2').setOrigin(0).setDepth(BACKGROUND_LAYER_DEPTH);
		this.add.image(50, 80, 'TutoWallJump').setOrigin(0).setDepth(CHRONO_LAYER_DEPTH);
			
		
		// Ajout class
		this.player = new Player(this, 48, 350, 'perso');


		// Collision
		this.physics.world.setBounds(0, 0, 896, 448);
		solideLayer.setCollisionByExclusion(-1, true); 
		finLayer.setCollisionByExclusion(-1, true); 
		this.physics.add.collider(this.player, solideLayer);
		this.physics.add.collider(this.player, finLayer, () => {
			this.scene.start("MONDE_2_NIVEAU_2",{
			});
			console.log("switch");
		});	


		this.timeText = this.add.text(10, 10, "Temps : 0", {font: "16px Arial", fill: "#ffffff"});
		this.deathText = this.add.text(10, 50, "Temps : 0", {font: "16px Arial", fill: "#ffffff"});
		this.tutoText = this.add.text(20, 200, "Temps : 0", { font: "16px Arial", fill: "#fff" });
		this.cameras.main.setBounds(0, 0, 896, 448);
	}
	/////////////////////////////////////// UPDATE  ///////////////////////////////////////
	update() {
		this.player.update();


		const delta = this.game.loop.delta;
	
		window.myGameValues.TimerValuesMonde2 += delta;
		window.myGameValues.hasWallJump = true;
	
		// Convertir le temps en heures, minutes, secondes et millisecondes
		let ms = Math.floor(window.myGameValues.TimerValuesMonde2 % 1000);
		let s = Math.floor(window.myGameValues.TimerValuesMonde2 / 1000) % 60;
		let m = Math.floor(window.myGameValues.TimerValuesMonde2 / (60 * 1000)) % 60;
		let h = Math.floor(window.myGameValues.TimerValuesMonde2 / (60 * 60 * 1000)) % 99; // Limite de 99 heures
	
		// Mettre en forme le texte du chronomètre
		let text = `Time : ${h.toString().padStart(2, "0")}:${m
		  .toString()
		  .padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms
		  .toString()
		  .padStart(3, "0")}`;
		  let textTuto = 'The "Wall Jump" allows \nyou to jump off walls by \npressing the "up" key \nwhen in contact with a \nwall, and if you keep \nthe key pressed in the \ndirection of the wall, you \ncan also slide down the wall.';
		  let textDeath = 'Death: ' + window.myGameValues.NbrMortValuesMonde2;
		  this.timeText.setText(text).setFontFamily('pixelArtPolice').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
		  this.deathText.setText(textDeath).setFontFamily('pixelArtPolice').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
		  this.tutoText.setText(textTuto).setFontFamily('pixelArtPolice').setFontSize(18).setDepth(CHRONO_LAYER_DEPTH);
		  
	}

}
