import Player from "../entities/player.js";

export default class Test extends Phaser.Scene{
    constructor() {
      super({key : "Test"}); // mettre le meme nom que le nom de la classe
    }




/////////////////////////////////////// PRELOAD ///////////////////////////////////////
    preload() {
		this.load.tilemapTiledJSON('mapTest', 'src/assets/map/NiveauDeTest.json');
        this.load.image("img_ciel", "src/assets/sky.png");
        this.load.image("img_plateforme", "src/assets/platform.png");
        this.load.image("img_etoile", "src/assets/star.png");
        this.load.image("img_bombe", "src/assets/bomb.png");
		this.load.image("TileSet", "src/assets/Assets_marioLike.png");
        this.load.spritesheet("perso", "src/assets/entities/SpriteSheetMainCharacter2.png", {
            frameWidth: 32,
            frameHeight: 64
        });
    }

/////////////////////////////////////// CREATE ///////////////////////////////////////
    create(){

		const map = this.add.tilemap("mapTest");
		const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");
		
		const backgroundLayer = map.createLayer(
			"background",
			tileset
		);

		const solideLayer = map.createLayer(
			"solide",
			tileset
		);



		this.player = new Player(this, 64, 608, 'perso');
		this.physics.world.setBounds(0, 0, 800, 800);

		solideLayer.setCollisionByExclusion(-1, true); 
		this.physics.add.collider(this.player, solideLayer);


		



		
		// Ajout de la caméra
		this.cameras.main.setBounds(0, 0, 800, 800);
		this.cameras.main.startFollow(this.player);


    }

 /////////////////////////////////////// UPDATE  ///////////////////////////////////////
    update(){
		this.player.update();

        
    }
}