import Doppelganger from "../../../entities/doppelganger.js";
import Player from "../../../entities/player.js";
import Bouton from "../../../Sprite/bouton.js";
import LaserBas from "../../../Sprite/laserBas.js";
import Porte from "../../../Sprite/porte.js";
import Scie from "../../../Sprite/scie.js";

export default class MONDE_3_NIVEAU_3 extends Phaser.Scene {
    constructor() {
        super({ key: "MONDE_3_NIVEAU_3" });
        this.solideLayer = null;
    }
	/////////////////////////////////////// CREATE  ///////////////////////////////////////
    create() {
        // Map 
        const map = this.add.tilemap("map_monde_3_niveau_3");
        const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");

        const backgroundLayer = map.createLayer("Background", tileset).setDepth(BACKGROUND_LAYER_DEPTH);
        this.solideLayer = map.createLayer("Solide", tileset).setDepth(SOLIDE_LAYER_DEPTH);
        const barriereLayer = map.createLayer("Barriere", tileset).setDepth(BARRIERE_LAYER_DEPTH);
        const obstaclesLayer = map.getObjectLayer("Obstacles",);
        const reposeTweenLayer = map.createLayer("ReposeTween", tileset).setDepth(REPOSE_TWEEN_LAYER_DEPTH);
        const laserLayer = map.createLayer("Laser", tileset).setDepth(LASER_LAYER_DEPTH);
        const finLayer = map.createLayer("Fin", tileset).setDepth(FIN_LAYER_DEPTH);


        // Ajout class
        this.player = new Player(this, 32, 64, 'perso');
        this.time.delayedCall(TIME_DOPPELGANGER, () => {
            this.doppelganger = new Doppelganger(this, 32, 64, 'perso');
            this.physics.add.collider(this.doppelganger, this.solideLayer);
            this.physics.add.collider(this.doppelganger, this.player, () => {
                this.player.playerDeath();
            });
            const playerPositions = this.player.getPlayerPositions();
            this.doppelganger.setPositions(playerPositions);
        }, [], this);

        this.scieHB1 = [
			new Scie(this, 368, 0, 'scie').setDepth(TWEEN_MOUVEMENT),
			new Scie(this, 496, 0, 'scie').setDepth(TWEEN_MOUVEMENT),
		];
        this.scieHB2 = [
			new Scie(this, 368, 394 , 'scie').setDepth(TWEEN_MOUVEMENT),
			new Scie(this, 432, 394, 'scie').setDepth(TWEEN_MOUVEMENT)
		];

        let tween_mouvement_scieHB1 = this.tweens.add({
            targets: this.scieHB1,
            paused: false,
            ease: "Linear",
            duration: 900,
            yoyo: true,
            y: "+=320",
            delay: 0,
            hold: 50,
            repeatDelay: 50,
            repeat: -1
        });
        
        let tween_mouvement_scieHB2 = this.tweens.add({
            targets: this.scieHB2,
            paused: false,
            ease: "Linear",
            duration: 900,
            yoyo: true,
            y: "-=320",
            delay: 0,
            hold: 50,
            repeatDelay: 50,
            repeat: -1
        });
        
        this.lasers = [];
        this.isSceneRunning = true;
        const obstaclesGroup = this.physics.add.group();
        const boutonGroup = this.physics.add.group();
		const porteGroup = this.physics.add.group();
		const portes = [];
        let isButtonPressed = false;
        this.createLasers();
        this.time.addEvent({
            delay: 900,
            loop: true,
            callback: this.createLasers,
            callbackScope: this
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
        this.solideLayer.setCollisionByExclusion(-1, true);
        laserLayer.setCollisionByExclusion(-1, true);
        finLayer.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.solideLayer);
        this.physics.add.collider(this.player, porteGroup);
        this.physics.add.collider(this.player, this.laserLayer);
        this.physics.add.collider(this.player, this.lasers, () => {
            this.player.playerDeath();
            this.destroyLasers();
        });
        this.physics.add.collider(this.player, boutonGroup, () => {
			if (!isButtonPressed) {
				isButtonPressed = true;
				this.bouton.playAnimsBoutonDown();
				porteGroup.getChildren().forEach(porte => {
					porte.playAnimsPorteDown();
					this.time.delayedCall(1800, () => {
						porte.destroy();
					});
				});
			}
		});
        this.physics.add.collider(this.player, this.scieHB1, () => {
			this.player.playerDeath();
		});
        this.physics.add.collider(this.player, this.scieHB2, () => {
			this.player.playerDeath();
		});
        this.physics.add.collider(this.lasers, this.solideLayer, (laser) => {
            laser.destroyLaser();
        });
        this.physics.add.collider(this.player, finLayer, () => {
            this.scene.start("MONDE_3_NIVEAU_4", {});
            console.log("switch");
        });



        this.timeText = this.add.text(10, 10, "Temps : 0", { font: "16px Arial", fill: "#ffffff" });
        this.deathText = this.add.text(10, 50, "Temps : 0", { font: "16px Arial", fill: "#ffffff" });
        this.cameras.main.setBounds(0, 0, 896, 448);
    }

    createLasers() {
        if (this.isSceneRunning) {
            const laser1 = new LaserBas(this, 144, 32, 'laser');
            const laser2 = new LaserBas(this, 208, 32, 'laser');
            const laser3 = new LaserBas(this, 272, 32, 'laser');
            const laser4 = new LaserBas(this, 816, 32, 'laser');

            this.physics.add.collider(laser1, this.solideLayer, () => {
                laser1.destroyLaser();
            });
            this.physics.add.collider(laser2, this.solideLayer, () => {
                laser2.destroyLaser();
            });
            this.physics.add.collider(laser3, this.solideLayer, () => {
                laser3.destroyLaser();
            });
            this.physics.add.collider(laser4, this.solideLayer, () => {
                laser4.destroyLaser();
            });
            this.lasers.push(laser1, laser2, laser3, laser4);
        }
    }

    destroyLasers() {
        for (const laser of this.lasers) {
            laser.destroyLaser();
        }
        this.lasers = [];
    }
	/////////////////////////////////////// UPDATE  ///////////////////////////////////////
    update() {
        this.player.update();

        for (let i = 0; i < this.lasers.length; i++) {
            const laser = this.lasers[i];
            laser.update();
        }

        if (this.doppelganger) {
            this.doppelganger.playPositions();
        }

        const delta = this.game.loop.delta;
        window.myGameValues.TimerValuesMonde3 += delta;

        let ms = Math.floor(window.myGameValues.TimerValuesMonde3 % 1000);
        let s = Math.floor(window.myGameValues.TimerValuesMonde3 / 1000) % 60;
        let m = Math.floor(window.myGameValues.TimerValuesMonde3 / (60 * 1000)) % 60;
        let h = Math.floor(window.myGameValues.TimerValuesMonde3 / (60 * 60 * 1000)) % 99;

        let text = `Time : ${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
        let textDeath = 'Death : ' + window.myGameValues.NbrMortValuesMonde3;
        this.timeText.setText(text).setFontFamily('Impact').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
        this.deathText.setText(textDeath).setFontFamily('Impact').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
    }
}
