import Doppelganger from "../../../entities/doppelganger.js";
import Player from "../../../entities/player.js";

export default class MONDE_1_NIVEAU_5 extends Phaser.Scene{
	constructor() {
		super({key : "MONDE_1_NIVEAU_5"});
	}
	/////////////////////////////////////// CREATE ///////////////////////////////////////
	create(){
		// Map
		const map = this.add.tilemap("map_monde_1_niveau_5");
		const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");
		
		const backgroundLayer = map.createLayer("Background",tileset).setDepth(BACKGROUND_LAYER_DEPTH);	
		const solideLayer = map.createLayer("Solide",tileset).setDepth(SOLIDE_LAYER_DEPTH);
		const propsLayer = map.createLayer("Props", tileset).setDepth(PROPS_LAYER_DEPTH);
		const finLayer = map.createLayer("Fin",tileset).setDepth(FIN_LAYER_DEPTH);
		

		this.add.image(0, 0, 'BackgroundM1').setOrigin(0).setDepth(BACKGROUND_LAYER_DEPTH);
		
		// Ajout class
		this.player = new Player(this, 48, 350, 'perso');
		this.time.delayedCall(TIME_DOPPELGANGER, () => {
			this.doppelganger = new Doppelganger(this, 48, 350, 'doppel');
			this.physics.add.collider(this.doppelganger, solideLayer);
			this.physics.add.collider(this.doppelganger, this.player, () => {
				this.player.playerDeath();
			});
			const playerPositions = this.player.getPlayerPositions();
			this.doppelganger.setPositions(playerPositions);
		}, [], this);


		// Collision 
		this.physics.world.setBounds(0, 0, 896, 448);
		solideLayer.setCollisionByExclusion(-1, true); 
		finLayer.setCollisionByExclusion(-1, true);
		this.physics.add.collider(this.player, solideLayer);
		this.physics.add.collider(this.player, finLayer, () => {
			this.scene.start("MONDE_1_NIVEAU_6",{
			});
			console.log("switch");
		});


		this.timeText = this.add.text(10, 10, "Temps : 0", {font: "16px Arial", fill: "#ffffff"});
		this.deathText = this.add.text(10, 50, "Temps : 0", {font: "16px Arial", fill: "#ffffff"});
		this.cameras.main.setBounds(0, 0, 896, 448);
	}
	/////////////////////////////////////// UPDATE  ///////////////////////////////////////
	update() {
		this.player.update();

		if (this.doppelganger) {
			this.doppelganger.playPositions();
		}

		const delta = this.game.loop.delta;
		window.myGameValues.TimerValuesMonde1 += delta;

		let ms = Math.floor(window.myGameValues.TimerValuesMonde1 % 1000);
		let s = Math.floor(window.myGameValues.TimerValuesMonde1 / 1000) % 60;
		let m = Math.floor(window.myGameValues.TimerValuesMonde1 / (60 * 1000)) % 60;
		let h = Math.floor(window.myGameValues.TimerValuesMonde1 / (60 * 60 * 1000)) % 99;

		let text = `Time : ${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
		let textDeath = 'Death : ' + window.myGameValues.NbrMortValuesMonde1;

		this.timeText.setText(text).setFontFamily('pixelArtPolice').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
		this.deathText.setText(textDeath).setFontFamily('pixelArtPolice').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
	}
}