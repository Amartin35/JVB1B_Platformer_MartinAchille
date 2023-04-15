import Player from "../entities/player.js";

export default class Test extends Phaser.Scene{
    constructor() {
      super({key : "Test"}); // mettre le meme nom que le nom de la classe
    }




/////////////////////////////////////// PRELOAD ///////////////////////////////////////
    preload() {
        this.load.image("img_ciel", "src/assets/sky.png");
        this.load.image("img_plateforme", "src/assets/platform.png");
        this.load.image("img_etoile", "src/assets/star.png");
        this.load.image("img_bombe", "src/assets/bomb.png");
        this.load.spritesheet("perso", "src/assets/SpriteSheetMainCharacterTest-sheet.png", {
            frameWidth: 34,
            frameHeight: 66
        });
        this.load.spritesheet("perso2", "src/assets/test.png", {
          frameWidth: 34,
          frameHeight: 66
      });
    }

/////////////////////////////////////// CREATE ///////////////////////////////////////
    create(){
		this.add.image(400, 300, "img_ciel");
		this.groupe_plateformes = this.physics.add.staticGroup();
		this.groupe_plateformes.create(200, 584, "img_plateforme");
		this.groupe_plateformes.create(600, 584, "img_plateforme");
	  
		//  on ajoute 3 platesformes flottantes
		this.groupe_plateformes.create(600, 450, "img_plateforme");
		this.groupe_plateformes.create(50, 300, "img_plateforme");
		this.groupe_plateformes.create(750, 270, "img_plateforme");


		


		this.player = new Player(this, 100, 450, 'perso');
		this.player.setCollideWorldBounds(true); 

		this.physics.add.collider(this.player, this.groupe_plateformes);
		// Ajout de la caméra
		this.cameras.main.setBounds(0, 0, 1600, 1600);
		this.cameras.main.startFollow(this.player);
		this.cameras.main.setBackgroundColor(0xaaaaaa);
		this.cameras.main.setLerp(0.5);
    }

 /////////////////////////////////////// UPDATE  ///////////////////////////////////////
    update(){
		this.player.update();

        
    }
}