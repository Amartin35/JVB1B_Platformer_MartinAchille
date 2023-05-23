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
		this.scene.anims.create({
			key: 'scie-anim',
			frames: this.scene.anims.generateFrameNumbers('scie', { start: 0, end: 9 }),
			frameRate: 18,
			repeat: -1
		});
		this.play('scie-anim');
	}
}
