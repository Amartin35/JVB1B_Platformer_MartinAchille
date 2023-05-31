import Doppelganger from "../../../entities/doppelganger.js";
import Player from "../../../entities/player.js";
import Bouton from "../../../Sprite/bouton.js";
import Porte from "../../../Sprite/porte.js";
import Scie from "../../../Sprite/scie.js";

export default class MONDE_2_NIVEAU_8 extends Phaser.Scene{
	constructor() {
		super({key : "MONDE_2_NIVEAU_8"});
	}
	/////////////////////////////////////// CREATE ///////////////////////////////////////
	create(){
		// Map 
		const map = this.add.tilemap("map_monde_2_niveau_8");
		const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");

		const backgroundLayer = map.createLayer("Background",tileset).setDepth(BACKGROUND_LAYER_DEPTH);
		const propsLayer = map.createLayer("Props", tileset).setDepth(PROPS_LAYER_DEPTH);
		const solideLayer = map.createLayer("Solide",tileset).setDepth(SOLIDE_LAYER_DEPTH);
		const obstaclesLayer = map.getObjectLayer("Obstacles",);
		const finLayer = map.createLayer("Fin",tileset).setDepth(FIN_LAYER_DEPTH);
	

		this.add.image(0, 0, 'BackgroundM2').setOrigin(0).setDepth(BACKGROUND_LAYER_DEPTH);

		// Ajout class
		this.player = new Player(this, 32, 288, 'perso');
		this.time.delayedCall(TIME_DOPPELGANGER, () => {
			this.doppelganger = new Doppelganger(this, 48, 350, 'doppel');
			this.physics.add.collider(this.doppelganger, solideLayer);
			this.physics.add.collider(this.doppelganger, this.player, () => {
				this.player.playerDeath();
			});
			const playerPositions = this.player.getPlayerPositions();
			this.doppelganger.setPositions(playerPositions);
		}, [], this);

		const obstaclesGroup = this.physics.add.group();
        const boutonGroup = this.physics.add.group();
		const porteGroup = this.physics.add.group();
		const portes = [];

		obstaclesLayer.objects.forEach(obj => {
			if (obj.properties[0]?.value === 'scie') {
				var scie = new Scie(this, obj.x, obj.y);
				obstaclesGroup.add(scie);
				scie.body.allowGravity = false;
				scie.body.setCircle(28, 4, 4);
				scie.body.setImmovable(true);
			}
		});
        obstaclesLayer.objects.forEach(obj => {
			if (obj.properties[0]?.value === 'bouton') {
			     this.bouton = new Bouton(this, obj.x, obj.y);
				boutonGroup.add( this.bouton);
                this.bouton.setOrigin(0, -1.7)
                this.bouton.body.allowGravity = false;
                this.bouton.body.setImmovable(true);
			}
		});

		obstaclesLayer.objects.forEach(obj => {
			if (obj.properties[0]?.value === 'porte') {
			     var porte = new Porte(this, obj.x, obj.y);
				porteGroup.add(porte);
				porte.setOrigin(-1, 0);
                porte.body.allowGravity = false;
                porte.body.setImmovable(true);
				portes.push(porte);
			}
		});



		// Collision
		this.physics.world.setBounds(0, 0, 896, 448);
		solideLayer.setCollisionByExclusion(-1, true); 
		finLayer.setCollisionByExclusion(-1, true); 
		this.physics.add.collider(this.player, solideLayer);
		this.physics.add.collider(this.player, porteGroup);
		this.physics.add.collider(this.player, obstaclesGroup, () => {
			this.player.playerDeath();
		});
		let isButtonPressed = false;
		this.physics.add.collider(this.player, boutonGroup, () => {
			if (!isButtonPressed) {
				isButtonPressed = true;
				this.bouton.playAnimsBoutonDown();
				porteGroup.getChildren().forEach(porte => {
					porte.playAnimsPorteDown();
					this.time.delayedCall(2100, () => {
						porte.destroy();
					});
				});
			}
		});
		this.physics.add.collider(this.player, finLayer, () => {
			this.scene.start("MONDE_2_NIVEAU_9",{
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