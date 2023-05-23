import Doppelganger from "../../../entities/doppelganger.js";
import Player from "../../../entities/player.js";
import Bouton from "../../../Sprite/bouton.js";
import Porte from "../../../Sprite/porte.js";
import Scie from "../../../Sprite/scie.js";

export default class MONDE_2_NIVEAU_10 extends Phaser.Scene{
	constructor() {
		super({key : "MONDE_2_NIVEAU_10"});
	}
	/////////////////////////////////////// CREATE ///////////////////////////////////////
	create(){
		// Map 
		const map = this.add.tilemap("map_monde_2_niveau_10");
		const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");
		
		const backgroundLayer = map.createLayer("Background",tileset).setDepth(BACKGROUND_LAYER_DEPTH);
		const solideLayer = map.createLayer("Solide",tileset).setDepth(SOLIDE_LAYER_DEPTH);
		const debutLayer = map.createLayer("Debut",tileset).setDepth(DEBUT_LAYER_DEPTH);
        const reposeTweenLayer = map.createLayer("ReposeTween",tileset).setDepth(REPOSE_TWEEN_LAYER_DEPTH);
        const obstaclesLayer = map.getObjectLayer("Obstacles",);
		const finLayer = map.createLayer("Fin",tileset).setDepth(FIN_LAYER_DEPTH);
			
		
		// Ajout class
		this.player = new Player(this, 32, 32, 'perso');
		this.time.delayedCall(TIME_DOPPELGANGER, () => {
			this.doppelganger = new Doppelganger(this, 48, 350, 'perso');
			this.physics.add.collider(this.doppelganger, solideLayer);
			this.physics.add.collider(this.doppelganger, this.player, () => {
				this.player.playerDeath();
			});
			const playerPositions = this.player.getPlayerPositions();
			this.doppelganger.setPositions(playerPositions);
		}, [], this);

        this.scieHB1 = [
			new Scie(this, 144, 0, 'scie').setDepth(TWEEN_MOUVEMENT),
		];
        this.scieHB2 = [
            new Scie(this, 208, 384, 'scie').setDepth(TWEEN_MOUVEMENT),
		];
        this.scieGD = [
			new Scie(this, 416, 208, 'scie').setDepth(TWEEN_MOUVEMENT),
		];

        let tween_mouvement_scieHB1 = this.tweens.add({
            targets: this.scieHB1,
            paused: false,
            ease: "Linear",
            duration: 850,
            yoyo: true,
            y: "+=400",
            delay: 0,
            hold: 50,
            repeatDelay: 50,
            repeat: -1
        });

        let tween_mouvement_scieHB2 = this.tweens.add({
            targets: this.scieHB2,
            paused: false,
            ease: "Linear",
            duration: 850,
            yoyo: true,
            y: "-=400",
            delay: 0,
            hold: 50,
            repeatDelay: 50,
            repeat: -1
        });
        
        let tween_mouvement_scieGD = this.tweens.add({
            targets: this.scieGD,
            paused: false,
            ease: "Linear",
            duration: 850,
            yoyo: true,
            x: "+=416",
            delay: 0,
            hold: 50,
            repeatDelay: 50,
            repeat: -1
        });
        
        const boutonGroup = this.physics.add.group();
        const porteGroup = this.physics.add.group();
		const portes = [];
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
        this.physics.add.collider(this.player, porteGroup);
		this.physics.add.collider(this.player, solideLayer);
        this.physics.add.collider(this.player, this.scieHB1, () => {
			this.player.playerDeath();
		});
        this.physics.add.collider(this.player, this.scieHB2, () => {
			this.player.playerDeath();
		});
        this.physics.add.collider(this.player, this.scieGD, () => {
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
			this.scene.start("END_MONDE_SCENE2",{
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
		this.timeText.setText(text).setFontFamily('Impact').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
		this.deathText.setText(textDeath).setFontFamily('Impact').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
	}
}	