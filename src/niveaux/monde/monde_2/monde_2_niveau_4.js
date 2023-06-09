import Doppelganger from "../../../entities/doppelganger.js";
import Player from "../../../entities/player.js";
import Scie from "../../../Sprite/scie.js";

export default class MONDE_2_NIVEAU_4 extends Phaser.Scene{
	constructor() {
		super({key : "MONDE_2_NIVEAU_4"});
	}
	/////////////////////////////////////// CREATE ///////////////////////////////////////
	create(){
		// Map
		const map = this.add.tilemap("map_monde_2_niveau_4");
		const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");
		
		const backgroundLayer = map.createLayer("Background",tileset).setDepth(BACKGROUND_LAYER_DEPTH);
		const propsLayer = map.createLayer("Props", tileset).setDepth(PROPS_LAYER_DEPTH);
		const solideLayer = map.createLayer("Solide",tileset).setDepth(SOLIDE_LAYER_DEPTH);
        const reposeTweenLayer = map.createLayer("ReposeTween",tileset).setDepth(REPOSE_TWEEN_LAYER_DEPTH);
		const finLayer = map.createLayer("Fin",tileset).setDepth(FIN_LAYER_DEPTH);
			
		this.add.image(0, 0, 'BackgroundM2').setOrigin(0).setDepth(BACKGROUND_LAYER_DEPTH);

			
		// Ajout class
		this.player = new Player(this, 48, 300, 'perso');
		this.time.delayedCall(TIME_DOPPELGANGER, () => {
			this.doppelganger = new Doppelganger(this, 48, 350, 'doppel');
			this.physics.add.collider(this.doppelganger, solideLayer);
			this.physics.add.collider(this.doppelganger, this.player, () => {
				this.player.playerDeath();
			});
			const playerPositions = this.player.getPlayerPositions();
			this.doppelganger.setPositions(playerPositions);
		}, [], this);	
        this.scieHB = new Scie(this, 400, 368).setDepth(TWEEN_MOUVEMENT);
        this.scieHB.body.allowGravity = false;
        this.scieHB.body.setCircle(28, 4, 4);
        this.scieGD = new Scie(this, 528, 272).setDepth(TWEEN_MOUVEMENT);
        this.scieGD.body.allowGravity = false;
        this.scieGD.body.setCircle(28, 4, 4);

        let tween_mouvement_scieHB = this.tweens.add({
            targets: [this.scieHB],
            paused: false,
            ease: "Linear",
            duration: 850,
            yoyo: true,
            y: "-=384",
            delay: 0,
            hold: 250,
            repeatDelay: 250,
            repeat: -1
        });
        let tween_mouvement_scieGD = this.tweens.add({
            targets: [this.scieGD],
            paused: false,
            ease: "Linear",
            duration: 1200,
            yoyo: true,
            x: "+=192",
            delay: 0,
            hold: 250,
            repeatDelay: 250,
            repeat: -1
        });
        

		// Collision
		this.physics.world.setBounds(0, 0, 896, 448);
		solideLayer.setCollisionByExclusion(-1, true); 
		finLayer.setCollisionByExclusion(-1, true); 
		this.physics.add.collider(this.player, solideLayer);
        this.physics.add.collider(this.player, this.scieGD, () => {
			this.player.playerDeath();
		});
        this.physics.add.collider(this.player, this.scieHB, () => {
			this.player.playerDeath();
		});
		this.physics.add.collider(this.player, finLayer, () => {
			this.scene.start("MONDE_2_NIVEAU_5",{
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
	
		window.myGameValues.TimerValuesMonde2 += delta;
	
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
	

		  let textDeath = 'Death : ' + window.myGameValues.NbrMortValuesMonde2;
		this.timeText.setText(text).setFontFamily('pixelArtPolice').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
		this.deathText.setText(textDeath).setFontFamily('pixelArtPolice').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
	}
}	