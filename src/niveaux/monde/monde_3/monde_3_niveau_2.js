import Doppelganger from "../../../entities/doppelganger.js";
import Player from "../../../entities/player.js";
import BackgroundM3 from "../../../Sprite/backgroundM3.js";
import LaserBas from "../../../Sprite/laserBas.js";
import LaserDROITE from "../../../Sprite/laserDroite.js";
import Scie from "../../../Sprite/scie.js";

export default class MONDE_3_NIVEAU_2 extends Phaser.Scene {
    constructor() {
        super({ key: "MONDE_3_NIVEAU_2" });
        this.solideLayer = null;
    }
	/////////////////////////////////////// CREATE  ///////////////////////////////////////
    create() {
        // Map
        const map = this.add.tilemap("map_monde_3_niveau_2");
        const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");

        const backgroundLayer = map.createLayer("Background", tileset).setDepth(BACKGROUND_LAYER_DEPTH);
        this.solideLayer = map.createLayer("Solide", tileset).setDepth(SOLIDE_LAYER_DEPTH);
        const laserLayer = map.createLayer("Laser", tileset).setDepth(LASER_LAYER_DEPTH);
        const finLayer = map.createLayer("Fin", tileset).setDepth(FIN_LAYER_DEPTH);
        const obstaclesLayer = map.getObjectLayer("Obstacles",);

        this.bg = new BackgroundM3(this, 0, 0, 'BackgroundM3').setDepth(BACKGROUND_LAYER_DEPTH);
        // Ajout class
        this.player = new Player(this, 32, 360, 'perso');
        this.time.delayedCall(TIME_DOPPELGANGER, () => {
            this.doppelganger = new Doppelganger(this, 32, 320, 'doppel');
            this.physics.add.collider(this.doppelganger, this.solideLayer);
            this.physics.add.collider(this.doppelganger, this.player, () => {
                this.player.playerDeath();
            });
            const playerPositions = this.player.getPlayerPositions();
            this.doppelganger.setPositions(playerPositions);
        }, [], this);

		const obstaclesGroup = this.physics.add.group();
		obstaclesLayer.objects.forEach(obj => {
			if (obj.properties[0]?.value === 'scie') {
				var scie = new Scie(this, obj.x, obj.y);
				obstaclesGroup.add(scie);
				scie.body.allowGravity = false;
				scie.body.setCircle(28, 4, 4);
				scie.body.setImmovable(true);
			}
		});
        this.lasers = [];
        this.isSceneRunning = true;
        this.createLasers();
        this.time.addEvent({
            delay: 900,
            loop: true,
            callback: this.createLasers,
            callbackScope: this
        });


        // Collision
        this.physics.world.setBounds(0, 0, 896, 448);
        this.solideLayer.setCollisionByExclusion(-1, true);
        finLayer.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.solideLayer);
        this.physics.add.collider(this.player, this.lasers, () => {
            this.player.playerDeath();
            this.destroyLasers();
        });
        this.physics.add.collider(this.lasers, this.solideLayer, (laser) => {
            laser.destroyLaser();
        });
        this.physics.add.collider(this.player, obstaclesGroup, () => {
			this.player.playerDeath();
		});
        this.physics.add.collider(this.player, finLayer, () => {
            this.scene.start("MONDE_3_NIVEAU_3", {});
            console.log("switch");
        });


        
        this.timeText = this.add.text(10, 10, "Temps : 0", { font: "16px Arial", fill: "#ffffff" });
        this.deathText = this.add.text(10, 50, "Temps : 0", { font: "16px Arial", fill: "#ffffff" });
        this.cameras.main.setBounds(0, 0, 896, 448);
    }

    createLasers() {
        if (this.isSceneRunning) {
            const laser1 = new LaserBas(this, 880, 256, 'laser');
            const laser2 = new LaserDROITE(this, 848, 16, 'laser');

            this.physics.add.collider(laser1, this.solideLayer, () => {
                laser1.destroyLaser();
            });
            this.physics.add.collider(laser2, this.solideLayer, () => {
                laser2.destroyLaser();
            });

            this.lasers.push(laser1, laser2);
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
        this.timeText.setText(text).setFontFamily('pixelArtPolice').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
        this.deathText.setText(textDeath).setFontFamily('pixelArtPolice').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
    }
}
