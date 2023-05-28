export default class Etoiles extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'SpriteEtoiles');
		this.setDepth(OBSTACLE_LAYER_DEPTH);
		this.setOrigin(0, 0);
		scene.add.existing(this);
		this.createAnimsEtoiles();
	}

	createAnimsEtoiles() {
		this.anims.create({
			key: '0',
			frames: [
				{ key: 'SpriteEtoiles', frame: 0 },
			],
			frameRate: 24,
			repeat: -1
		});

		this.anims.create({
			key: '1',
			frames: [
				{ key: 'SpriteEtoiles', frame: 1 },
			],
			frameRate: 24,
			repeat: -1
		});

		this.anims.create({
			key: '2',
			frames: [
				{ key: 'SpriteEtoiles', frame: 2 },
			],
			frameRate: 24,
			repeat: -1
		});

		this.anims.create({
			key: '3',
			frames: [
				{ key: 'SpriteEtoiles', frame: 3 },
			],
			frameRate: 24,
			repeat: -1
		});
	}

    
    playAnimsEtoiles(stars) {
		this.play(stars.toString());
	}
}
