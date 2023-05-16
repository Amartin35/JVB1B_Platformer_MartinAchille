export default class Bouton extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'bouton');
		this.setDepth(OBSTACLE_LAYER_DEPTH);
		this.setOrigin(0, 0);
		scene.physics.world.enable(this);
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.createAnimsBouton();
	}
	
	createAnimsBouton() {
		this.anims.create({
			key: 'bouton-anim-up',
			frames: [
				{ key: 'bouton', frame: 0 },
			],
			frameRate: 10,
			repeat: -1
		});
		this.play('bouton-anim-up');
        this.anims.create({
			key: 'bouton-anim-down',
			frames: [
				{ key: 'bouton', frame: 1 },
			],
			frameRate: 10,
			repeat: -1
		});
	}
    playAnimsBoutonDown(){
        this.play('bouton-anim-down');
    }
}
