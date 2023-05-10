import Player from "../../../entities/player.js";
import Scie from "../../../traps/scie.js";
export default class MONDE_1_NIVEAU_6 extends Phaser.Scene{
	constructor() {
		super({key : "MONDE_1_NIVEAU_6"}); // mettre le meme nom que le nom de la classe
	}
	
	
	
	
	/////////////////////////////////////// PRELOAD ///////////////////////////////////////
	preload() {
		this.load.tilemapTiledJSON('map_monde_1_niveau_6', 'src/assets/map/monde_1/monde_1_niveau_6_01.json');
		this.load.image("TileSet", "src/assets/Assets_marioLike.png");
		this.load.spritesheet("perso", "src/assets/entities/SpriteSheetMainCharacter2.png", {
			frameWidth: 32,
			frameHeight: 64
		});
		this.load.spritesheet("scie","src/assets/Sprite_asset_scie.png", {
			frameWidth: 64,
			frameHeight: 32
		});
	}
	
	/////////////////////////////////////// CREATE ///////////////////////////////////////
	create(){
		const map = this.add.tilemap("map_monde_1_niveau_6");
		const tileset = map.addTilesetImage("Assets_marioLike", "TileSet");
		
		const backgroundLayer = map.createLayer(
			"Background",
			tileset
		);
		
		const solideLayer = map.createLayer(
			"Solide",
			tileset
		);

		// Layer a enlever
		const DebutLayer = map.createLayer(
			"Debut",
			tileset
		);
		
		const ObstaclesLayer = map.getObjectLayer(
			"Obstacles",
		);

		var obstaclesGroup = this.physics.add.group();

		ObstaclesLayer.objects.forEach(obj => {
			if (obj.properties[0]?.value === 'scie') {
				var scie = new Scie(this, obj.x, obj.y);
				obstaclesGroup.add(scie);
				scie.body.allowGravity = false;
				scie.body.setImmovable(true);
			}
		});

		const FinLayer = map.createLayer(
			"Fin",
			tileset
		);
	
		this.player = new Player(this, 48, 350, 'perso');
		this.physics.world.setBounds(0, 0, 896, 448);

	
		solideLayer.setCollisionByExclusion(-1, true); 
		this.physics.add.collider(this.player, solideLayer);
		this.physics.add.collider(this.player, obstaclesGroup, () => {
			this.player.playerDeath();
		});

		
		
		
		// Ajout de la caméra
		this.cameras.main.setBounds(0, 0, 896, 448);
	}
	/////////////////////////////////////// UPDATE  ///////////////////////////////////////
	update(){
		this.player.update();
	}
}