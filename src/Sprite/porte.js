export default class Porte extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'porte');
		this.setDepth(OBSTACLE_LAYER_DEPTH);
		this.setOrigin(0, 0);
		scene.physics.world.enable(this);
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.createAnimsPorte();
	}
	
	createAnimsPorte() {
		this.anims.create({
			key: 'porte-anim-up',
			frames: [
				{ key: 'porte', frame: 0 },
			],
			frameRate: 24,
			repeat: -1
		});
		this.play('porte-anim-up');
        this.anims.create({
			key: 'porte-anim-down',
			frames: this.scene.anims.generateFrameNumbers('porte', { start: 1, end: 3 }),
			frameRate: 1,
			repeat: 0
		});
	}
    playAnimsPorteDown(){
        this.play('porte-anim-down');
    }
}
