export default class Doppelganger extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.physics.world.enable(this);
		scene.add.existing(this);
		this.setCollideWorldBounds(true);
		this.setDepth(PLAYER_LAYER_DEPTH);
		this.body.setCircle(7.5, 9, 49);

		this.createAnimsDoppelIdle();

		this.positions = [];
		this.currentPositionIndex = 0;
	}

	setPositions(positions) {
		this.positions = positions;
	}

	createAnimsDoppelIdle() {
        this.scene.anims.create({
            key: 'idleDoppel',
            frames: this.scene.anims.generateFrameNumbers('doppel', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.play('idleDoppel', true);
    }

	playPositions() {
		if (this.currentPositionIndex < this.positions.length) {
			const { x, y } = this.positions[this.currentPositionIndex];
			this.setPosition(x, y);
			this.currentPositionIndex++;
		}
	}
}
