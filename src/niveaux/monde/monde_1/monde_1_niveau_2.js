import Player from "../../../entities/player.js";

export default class MONDE_1_NIVEAU_2 extends Phaser.Scene{
	constructor() {
		super({key : "MONDE_1_NIVEAU_2"}); // mettre le meme nom que le nom de la classe
	}

	
	/////////////////////////////////////// CREATE ///////////////////////////////////////
	create(){
		const map = this.add.tilemap("map_monde_1_niveau_2");
		const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");
		
		const backgroundLayer = map.createLayer(
			"Background",
			tileset
		).setDepth(BACKGROUND_LAYER_DEPTH);
			
		const solideLayer = map.createLayer(
			"Solide",
			tileset
		).setDepth(SOLIDE_LAYER_DEPTH);
		// Layer a enlever
		const debutLayer = map.createLayer(
			"Debut",
			tileset
		).setDepth(DEBUT_LAYER_DEPTH);
			
		const finLayer = map.createLayer(
			"Fin",
			tileset
		).setDepth(FIN_LAYER_DEPTH);
			
			
		
		this.player = new Player(this, 48, 350, 'perso');
		this.physics.world.setBounds(0, 0, 896, 448);
		
		solideLayer.setCollisionByExclusion(-1, true); 
		finLayer.setCollisionByExclusion(-1, true);
		this.physics.add.collider(this.player, solideLayer);
		this.physics.add.collider(this.player, finLayer, () => {
			this.scene.start("MONDE_1_NIVEAU_3",{
			});
			console.log("switch");
		});

		this.timeText = this.add.text(10, 10, "Temps : 0", {font: "16px Arial", fill: "#ffffff"});
		
		
		// Ajout de la caméra
		this.cameras.main.setBounds(0, 0, 896, 448);
	}
	/////////////////////////////////////// UPDATE  ///////////////////////////////////////
	update(){
		this.player.update();
		const delta = this.game.loop.delta;
	
		window.myGameValues.TimerValues += delta;
	
		// Convertir le temps en heures, minutes, secondes et millisecondes
		let ms = Math.floor(window.myGameValues.TimerValues % 1000);
		let s = Math.floor(window.myGameValues.TimerValues / 1000) % 60;
		let m = Math.floor(window.myGameValues.TimerValues / (60 * 1000)) % 60;
		let h = Math.floor(window.myGameValues.TimerValues / (60 * 60 * 1000)) % 99; // Limite de 99 heures
	
		// Mettre en forme le texte du chronomètre
		let text = `Temps : ${h.toString().padStart(2, "0")}:${m
		  .toString()
		  .padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms
		  .toString()
		  .padStart(3, "0")}`;
	

		this.timeText.setText(text).setFontFamily('Impact').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
	}
}