import Boss from "../../../entities/boss.js";
import Player from "../../../entities/player.js";
import Bouton from "../../../Sprite/bouton.js";


export default class MONDE_3_NIVEAU_4 extends Phaser.Scene {
    constructor() {
        super({ key: "MONDE_3_NIVEAU_4" });
    }
	/////////////////////////////////////// CREATE  ///////////////////////////////////////
    create() {
        // Map
        const map = this.add.tilemap("map_monde_3_niveau_4");
        const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");

        const backgroundLayer = map.createLayer("Background", tileset).setDepth(BACKGROUND_LAYER_DEPTH);
        const barriereLayer = map.createLayer("Barriere", tileset).setDepth(BARRIERE_LAYER_DEPTH);
        const propsLayer = map.createLayer("Props", tileset).setDepth(PROPS_LAYER_DEPTH);
        const solideLayer = map.createLayer("Solide", tileset).setDepth(SOLIDE_LAYER_DEPTH);
        const acideLayer = map.createLayer("Acide", tileset).setDepth(ACIDE_LAYER_DEPTH);
        const obstaclesLayer = map.getObjectLayer("Obstacles",);

        this.add.image(0, 0, 'BackgroundM3').setOrigin(0).setDepth(BACKGROUND_LAYER_DEPTH);

        // Ajout class
        this.player = new Player(this, 440, 64, 'perso');
        this.boss = new Boss(this, 880, 257).setDepth(BOSS_LAYER_DEPTH);;
        const obstaclesGroup = this.physics.add.group();
        const boutonGroup = this.physics.add.group();
        let isButtonPressed = false;
        obstaclesLayer.objects.forEach(obj => {
			if (obj.properties[0]?.value === 'bouton') {
			     this.bouton = new Bouton(this, obj.x, obj.y);
				boutonGroup.add( this.bouton);
                this.bouton.setOrigin(0, -1.7)
                this.bouton.body.allowGravity = false;
                this.bouton.body.setImmovable(true);
			}
		});


        // Collision
        this.physics.world.setBounds(0, 0, 896, 448);
        solideLayer.setCollisionByExclusion(-1, true);
        acideLayer.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, solideLayer);
        this.physics.add.collider(this.player, acideLayer, () => {
           this.player.playerDeath();
        });
        this.physics.add.collider(this.player, this.boss, () => {
            this.player.playerDeath();
        });
        this.physics.add.collider(this.player, boutonGroup, () => {
			if (!isButtonPressed) {
				isButtonPressed = true;
				this.bouton.playAnimsBoutonDown();
                this.boss.killBoss();
                this.time.delayedCall(4200, () => {
                    this.boss.destroy();
                });
                this.time.delayedCall(4200, () => {
                    this.scene.start("END_JEU_SCENE", {});
                    console.log("switch");
                });
			}
		});

   

        this.timeText = this.add.text(10, 10, "Temps : 0", { font: "16px Arial", fill: "#ffffff" });
        this.deathText = this.add.text(10, 50, "Temps : 0", { font: "16px Arial", fill: "#ffffff" });
        this.cameras.main.setBounds(0, 0, 896, 448);
    }
    /////////////////////////////////////// UPDATE  ///////////////////////////////////////
    update() {
        this.player.update();
        this.boss.update();

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
