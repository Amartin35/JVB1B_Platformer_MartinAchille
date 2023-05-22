export default class LaserBas extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'laser');
		this.setDepth(OBSTACLE_LAYER_DEPTH);
        scene.add.existing(this);
        scene.physics.add.existing(this);
		this.body.allowGravity = false;
        this.setAngle(90);
	}

    update(){
        this.body?.setVelocityY(LASER_SPEED);
    }
    destroyLaser() {
        this.destroy();
    }
}
