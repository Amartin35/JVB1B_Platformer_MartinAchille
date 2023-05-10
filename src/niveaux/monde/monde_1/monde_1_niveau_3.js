import Player from "../../../entities/player.js";

export default class MONDE_1_NIVEAU_3 extends Phaser.Scene{
	constructor() {
		super({key : "MONDE_1_NIVEAU_3"}); // mettre le meme nom que le nom de la classe
	}

	
	/////////////////////////////////////// CREATE ///////////////////////////////////////
	create(){
		const map = this.add.tilemap("map_monde_1_niveau_3");
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
			
		const FinLayer = map.createLayer(
			"Fin",
			tileset
		);
		
		
		
		this.player = new Player(this, 48, 350, 'perso');
		this.physics.world.setBounds(0, 0, 896, 448);
		
		solideLayer.setCollisionByExclusion(-1, true);
		FinLayer.setCollisionByExclusion(-1, true); 
		this.physics.add.collider(this.player, solideLayer);
		this.physics.add.collider(this.player, FinLayer, () => {
			this.scene.start("MONDE_1_NIVEAU_4",{
			});
			console.log("switch");
		});
		
		
		// Ajout de la caméra
		this.cameras.main.setBounds(0, 0, 896, 448);
	}
	/////////////////////////////////////// UPDATE  ///////////////////////////////////////
	update(){
		this.player.update();
	}
}