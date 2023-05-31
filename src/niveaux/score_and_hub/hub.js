export default class HUB extends Phaser.Scene {
	constructor() {
	  super({ key: "HUB" });
	}
  	/////////////////////////////////////// PRELOAD ///////////////////////////////////////
	preload() {
		// MAP
	  const tilemaps = [
		'map_monde_1_niveau_1',
		'map_monde_1_niveau_2',
		'map_monde_1_niveau_3',
		'map_monde_1_niveau_4',
		'map_monde_1_niveau_5',
		'map_monde_1_niveau_6',
		'map_monde_1_niveau_7',
		'map_monde_1_niveau_8',
		'map_monde_1_niveau_9',
		'map_monde_1_niveau_10',
		'map_monde_2_niveau_1',
		'map_monde_2_niveau_2',
		'map_monde_2_niveau_3',
		'map_monde_2_niveau_4',
		'map_monde_2_niveau_5',
		'map_monde_2_niveau_6',
		'map_monde_2_niveau_7',
		'map_monde_2_niveau_8',
		'map_monde_2_niveau_9',
		'map_monde_2_niveau_10',
		'map_monde_3_niveau_1',
		'map_monde_3_niveau_2',
		'map_monde_3_niveau_3',
		'map_monde_3_niveau_4'
	  ];
  
	  const tilemapPath = (monde, niveau) => `src/assets/map/${monde}/${monde}_niveau_${niveau}_01.json`;
	  
	  tilemaps.forEach((tilemap, index) => {
		const monde = index < 10 ? 'monde_1' : index < 20 ? 'monde_2' : 'monde_3';
		const niveau = (index % 10) + 1;
		this.load.tilemapTiledJSON(tilemap, tilemapPath(monde, niveau));
	  });
  
	  // IMAGE
	  this.load.image("TileSet", "src/assets/Assets_marioLike.png");
	  this.load.image("BackgroundM1", "src/assets/background/BackgroundMonde1.png");
	  this.load.image("BackgroundM2", "src/assets/background/BackgroundMonde2.png");

	  this.load.image("Tuto", "src/assets/sprite_hud/SpriteTuto.png");
	  this.load.image("TutoWallJump", "src/assets/sprite_hud/SpriteTutoWallJump.png");
	  this.load.image("laser", "src/assets/sprite_props/Sprite_asset_laser.png");
  

	  // SPRITE
	  this.load.spritesheet("BackgroundM3", "src/assets/background/BackgroundMonde3.png", {
		frameWidth: 896,
		frameHeight: 448
	  });
	  this.load.spritesheet("perso", "src/assets/entities/SpriteSheetMainCharacter2-sheet.png", {
		frameWidth: 32,
		frameHeight: 64
	  });
	  this.load.spritesheet("doppel", "src/assets/entities/SpriteDopellganger.png", {
		frameWidth: 32,
		frameHeight: 64
	  });
	  this.load.spritesheet("boss", "src/assets/entities/SpriteBoss.png", {
		frameWidth: 128,
		frameHeight: 128
	  });
	  this.load.spritesheet("scie", "src/assets/sprite_props/Sprite_asset_scie2.png", {
		frameWidth: 64,
		frameHeight: 64
	  });
	  this.load.spritesheet("bouton", "src/assets/sprite_props/Sprite_asset_bouton.png", {
		frameWidth: 32,
		frameHeight: 12
	  });
	  this.load.spritesheet("porte", "src/assets/sprite_props/Sprite_asset_porte.png", {
		frameWidth: 11,
		frameHeight: 32
	  });
	  this.load.spritesheet("SpriteEtoiles", "src/assets/sprite_hud/SpriteEtoiles.png", {
		frameWidth: 176,
		frameHeight: 48
	  });
  
	  // SON
	  this.load.audio('music', 'src/assets/song/Song_of_Ooze.mp3');

	  // VIDEO
	  this.load.video('video', 'src/assets/video/EcranTitre2.mp4');

	}
  	/////////////////////////////////////// CREATE ///////////////////////////////////////
	create() {
	  this.clavier = this.input.keyboard.createCursorKeys();
	  this.add.text(240, 50, "Ooze Odyssey", {
		fontSize: "65px",
		fill: "#fff",
		fontFamily: "pixelArtPolice"
	  }).setDepth(CHRONO_LAYER_DEPTH);
  
	  const pressSpaceText = this.add.text(333, 375, "Press SPACE", {
		fontSize: "32px",
		fill: "#fff",
		fontFamily: "pixelArtPolice"
	  }).setDepth(CHRONO_LAYER_DEPTH);
  

	  this.tweens.add({
		targets: pressSpaceText,
		alpha: 0,
		duration: 500,
		ease: 'Power1',
		yoyo: true,
		repeat: -1
	  });


	  this.video = this.add.video(448, 224, 'video');

	  this.video.play();
	  this.video.setDisplaySize(896, 448);

	  this.video.on('complete', () => {
		this.video.play();
	  });
  
	  this.music = this.sound.add('music', {
		loop: true
	  });
	  this.music.play();
	}
  	/////////////////////////////////////// UPDATE ///////////////////////////////////////
	update() {
	  if (Phaser.Input.Keyboard.JustDown(this.clavier.space)) {
		this.scene.start("MONDE_1_NIVEAU_1", {});
	  }
	}
  }
  