import Doppelganger from "../../../entities/doppelganger.js";
import Player from "../../../entities/player.js";
import LaserDROITE from "../../../Sprite/laserDroite.js";
import Scie from "../../../Sprite/scie.js";

export default class MONDE_3_NIVEAU_1 extends Phaser.Scene {
    constructor() {
        super({ key: "MONDE_3_NIVEAU_1" });
        this.solideLayer = null;
    }
	/////////////////////////////////////// CREATE ///////////////////////////////////////
    create() {
        // Map
        const map = this.add.tilemap("map_monde_3_niveau_1");
        const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");

        const backgroundLayer = map.createLayer("Background", tileset).setDepth(BACKGROUND_LAYER_DEPTH);
        this.solideLayer = map.createLayer("Solide", tileset).setDepth(SOLIDE_LAYER_DEPTH);
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

        this.scie = new Scie(this, 208, 0).setDepth(TWEEN_MOUVEMENT);
        this.scie.body.allowGravity = false;
        this.scie.body.setCircle(28, 4, 4);

        let tween_mouvement_scie = this.tweens.add({
            targets: [this.scie],
            paused: false,
            ease: "Linear",
            duration: 450,
            yoyo: true,
            y: "+=297",
            delay: 0,
            hold: 250,
            repeatDelay: 250,
            repeat: -1
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
        this.physics.add.collider(this.player, this.scie, () => {
            this.player.playerDeath();
        });
        this.physics.add.collider(this.player, finLayer, () => {
            this.scene.start("MONDE_3_NIVEAU_2", {});
            console.log("switch");
        });



        this.timeText = this.add.text(10, 10, "Temps : 0", { font: "16px Arial", fill: "#ffffff" });
        this.deathText = this.add.text(10, 50, "Temps : 0", { font: "16px Arial", fill: "#ffffff" });
        this.cameras.main.setBounds(0, 0, 896, 448);
    }

    createLasers() {
        if (this.isSceneRunning) {
            const laser1 = new LaserDROITE(this, 832, 208, 'laser');
            const laser2 = new LaserDROITE(this, 832, 80, 'laser');

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
        this.timeText.setText(text).setFontFamily('Impact').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
        this.deathText.setText(textDeath).setFontFamily('Impact').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
    }
}
