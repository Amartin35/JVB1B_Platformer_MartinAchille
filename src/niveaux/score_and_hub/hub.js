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
		
		this.load.tilemapTiledJSON('map_monde_2_niveau_1', 'src/assets/map/monde_2/monde_2_niveau_1_01.json');
		this.load.tilemapTiledJSON('map_monde_2_niveau_2', 'src/assets/map/monde_2/monde_2_niveau_2_01.json');
		this.load.tilemapTiledJSON('map_monde_2_niveau_3', 'src/assets/map/monde_2/monde_2_niveau_3_01.json');
		this.load.tilemapTiledJSON('map_monde_2_niveau_4', 'src/assets/map/monde_2/monde_2_niveau_4_01.json');
		this.load.tilemapTiledJSON('map_monde_2_niveau_5', 'src/assets/map/monde_2/monde_2_niveau_5_01.json');
		this.load.tilemapTiledJSON('map_monde_2_niveau_6', 'src/assets/map/monde_2/monde_2_niveau_6_01.json');
		this.load.tilemapTiledJSON('map_monde_2_niveau_7', 'src/assets/map/monde_2/monde_2_niveau_7_01.json');
		this.load.tilemapTiledJSON('map_monde_2_niveau_8', 'src/assets/map/monde_2/monde_2_niveau_8_01.json');
		this.load.tilemapTiledJSON('map_monde_2_niveau_9', 'src/assets/map/monde_2/monde_2_niveau_9_01.json');
		this.load.tilemapTiledJSON('map_monde_2_niveau_10', 'src/assets/map/monde_2/monde_2_niveau_10_01.json');

		this.load.tilemapTiledJSON('map_monde_3_niveau_1', 'src/assets/map/monde_3/monde_3_niveau_1_01.json');
		this.load.tilemapTiledJSON('map_monde_3_niveau_2', 'src/assets/map/monde_3/monde_3_niveau_2_01.json');
		this.load.tilemapTiledJSON('map_monde_3_niveau_3', 'src/assets/map/monde_3/monde_3_niveau_3_01.json');
		this.load.tilemapTiledJSON('map_monde_3_niveau_4', 'src/assets/map/monde_3/monde_3_niveau_4_01.json');


		// Image
		this.load.image("TileSet", "src/assets/Assets_marioLike.png");
		this.load.image("laser", "src/assets/sprite_props/Sprite_asset_laser.png");

		
		// Spritesheet
		this.load.spritesheet("perso", "src/assets/entities/SpriteSheetMainCharacter2-sheet.png", {
			frameWidth: 32,
			frameHeight: 64
		});
		this.load.spritesheet("scie","src/assets/sprite_props/Sprite_asset_scie2.png", {
			frameWidth: 64,
			frameHeight: 64
		});
		this.load.spritesheet("bouton","src/assets/sprite_props/Sprite_asset_bouton.png", {
			frameWidth: 32,
			frameHeight: 12
		});
		this.load.spritesheet("porte","src/assets/sprite_props/Sprite_asset_porte.png", {
			frameWidth: 11,
			frameHeight: 32
		});
	}
	/////////////////////////////////////// CREATE ///////////////////////////////////////
	create(){
		this.clavier = this.input.keyboard.createCursorKeys();
		this.add.text(300, 200, "Appuyez sur ESPACE", {
			fontSize: "32px",
			fill: "#fff",
			fontFamily: "Impact"
		});
	}
	/////////////////////////////////////// UPDATE  ///////////////////////////////////////
	update(){
		if (Phaser.Input.Keyboard.JustDown(this.clavier.space)){
			this.scene.start("MONDE_1_NIVEAU_1",{
			});
		} 
	}
}