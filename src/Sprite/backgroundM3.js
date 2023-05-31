export default class BackgroundM3 extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'BackgroundM3');
		this.setDepth(OBSTACLE_LAYER_DEPTH);
		this.setOrigin(0, 0);

		scene.add.existing(this);


		this.createAnimsBg();
	}

    createAnimsBg(){
        this.scene.anims.create({
            key: "backgroundAnimation",
            frames: this.scene.anims.generateFrameNumbers("BackgroundM3", { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.play("backgroundAnimation")
    };

}	