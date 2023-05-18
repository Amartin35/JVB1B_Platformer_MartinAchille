export default class Doppelganger extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.physics.world.enable(this);
		scene.add.existing(this);

		this.movements = [];
	}

	setMovements(movements) {
		this.movements = movements;
	}

	playMovements() {
		this.movements.forEach((movement, index) => {
			const { x, y } = movement;
			this.scene.time.delayedCall(index * 100, () => {
				this.body.setVelocity(x, y);
			});
		});
	}
}
