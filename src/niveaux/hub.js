export default class HUB extends Phaser.Scene{
    constructor() {
      super({key : "HUB"}); // mettre le meme nom que le nom de la classe
    }




/////////////////////////////////////// PRELOAD ///////////////////////////////////////
    preload() {
        // Tilemap
        this.load.tilemapTiledJSON('map_monde_1_niveau_1', 'src/assets/map/monde_1/monde_1_niveau_1_01.json');
        this.load.tilemapTiledJSON('map_monde_1_niveau_2', 'src/assets/map/monde_1/monde_1_niveau_2_01.json');
        this.load.tilemapTiledJSON('map_monde_1_niveau_3', 'src/assets/map/monde_1/monde_1_niveau_3_01.json');
        this.load.tilemapTiledJSON('map_monde_1_niveau_4', 'src/assets/map/monde_1/monde_1_niveau_4_01.json');
        this.load.tilemapTiledJSON('map_monde_1_niveau_5', 'src/assets/map/monde_1/monde_1_niveau_5_01.json');
        this.load.tilemapTiledJSON('map_monde_1_niveau_6', 'src/assets/map/monde_1/monde_1_niveau_6_01.json');
        this.load.tilemapTiledJSON('map_monde_1_niveau_7', 'src/assets/map/monde_1/monde_1_niveau_7_01.json');
        this.load.tilemapTiledJSON('map_monde_1_niveau_8', 'src/assets/map/monde_1/monde_1_niveau_8_01.json');
        this.load.tilemapTiledJSON('map_monde_1_niveau_9', 'src/assets/map/monde_1/monde_1_niveau_9_01.json');
        this.load.tilemapTiledJSON('map_monde_1_niveau_10', 'src/assets/map/monde_1/monde_1_niveau_10_01.json');



        // Image
		this.load.image("TileSet", "src/assets/Assets_marioLike.png");


        // Spritesheet
		this.load.spritesheet("perso", "src/assets/entities/SpriteSheetMainCharacter2.png", {
			frameWidth: 32,
			frameHeight: 64
		});
        this.load.spritesheet("scie","src/assets/Sprite_asset_scie.png", {
			frameWidth: 64,
			frameHeight: 64
		});
    }

/////////////////////////////////////// CREATE ///////////////////////////////////////
    create(){
        this.clavier = this.input.keyboard.createCursorKeys();
     
    
        // Ajout du texte
        this.add.text(300, 200, "Appuyez sur ESPACE", {
        fontSize: "32px",
        fill: "#fff",
        fontFamily: "Arial"
        });

          
    }

 /////////////////////////////////////// UPDATE  ///////////////////////////////////////
    update(){
        //LANCE PREMIERE SCENE QUAND ESPACE APPUYE
        if (Phaser.Input.Keyboard.JustDown(this.clavier.space)){
            this.scene.start("MONDE_1_NIVEAU_1",{
            });
        } 
    }
}