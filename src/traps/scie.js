export default class Scie extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'scie');
		this.setOrigin(0, 0);
		scene.physics.world.enable(this);
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.createAnimsScies();
	}
	
	createAnimsScies() {
		this.anims.create({
			key: 'scie-anim',
			frames: [
				{ key: 'scie', frame: 0 },
				{ key: 'scie', frame: 1 }
			],
			frameRate: 10,
			repeat: -1
		});
		this.play('scie-anim');
	}
}
