export default class Scie extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'scie');
		this.setDepth(OBSTACLE_LAYER_DEPTH);
		this.setOrigin(0, 0);
		scene.physics.world.enable(this);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.body.setCircle(28, 4, 4),
		this.body.allowGravity = false;
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
