export default class LaserDROITE extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'laser');
		this.setDepth(OBSTACLE_LAYER_DEPTH);
        scene.add.existing(this);
        scene.physics.add.existing(this);
		this.body.allowGravity = false;
	}

    update(){
        this.body?.setVelocityX(-LASER_SPEED);
    }
    destroyLaser() {
        this.destroy();
    }
}
