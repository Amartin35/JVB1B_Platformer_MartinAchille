export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture); 
		this.clavier = scene.input.keyboard.addKeys({
			left: Phaser.Input.Keyboard.KeyCodes.LEFT,
			right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
			up: Phaser.Input.Keyboard.KeyCodes.UP,
			attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
			parler: Phaser.Input.Keyboard.KeyCodes.A,
		});
		this.pad;
		scene.physics.world.enable(this);
		scene.add.existing(this);
		this.body.setCollideWorldBounds(true);
		this.body.setSize(15, 15);
		this.body.setOffset(9, 49);


		this.CreateAnimations();

		this.direction = "right"; 
		this.wallJumping = true;
	
		
	}
	
	update(){

		// Déplacement
		if (this.clavier.up.isDown && this.body.onFloor()) {
			this.body.setVelocityY(-PLAYER_JUMP);
		}
		
		if (this.clavier.left.isDown) {
			this.body.setVelocityX(-PLAYER_SPEED);
			this.direction = "left";
			if (this.body.onFloor()) {
				this.anims.play('run', true);
				this.flipX = true;
			}
		} 
		else if (this.clavier.right.isDown) {
			this.body.setVelocityX(PLAYER_SPEED);
			this.direction = "right";
			if (this.body.onFloor()) {
				this.anims.play('run', true);
				this.flipX = false;
			}
		} 
		else {
			this.body.setVelocityX(0);
			if (this.body.onFloor()) {
				this.anims.play('idle', true);
			}
		}
		

		// Wall Jump
		const onGround = this.body.blocked.down;
		const onWall = this.body.blocked.left || this.body.blocked.right;

		if (onWall && !onGround && this.clavier.up.isDown && this.wallJumping) {
		this.wallJumping = false;
		this.body.setVelocityY(-PLAYER_JUMP);
		this.body.setVelocityX(-this.body.velocity.x);
		setTimeout(() => {
			this.wallJumping = true;
		}, 600);
		} else if (onWall && !onGround && !this.clavier.up.isDown) {
		this.body.setVelocityY(-this.body.velocity.y / 4); 
		}




		// Gestion des animations
		if (this.body.velocity.y < 0) {
			this.anims.play('jumpUp', true);
		} 
		else if (this.body.velocity.y > 0) {
			this.anims.play('jumpDown', true);
		} 
		else {
			if (this.body.onFloor()) {
				if (this.clavier.left.isUp && this.clavier.right.isUp) {
					this.anims.play('idle', true);
				} else {
					if (this.direction === "left") {
						this.flipX = true;
					} else if (this.direction === "right") {
						this.flipX = false;
					}
				}
			}
		}
		
	}




	
	CreateAnimations() {
		// Ajout des animations
		this.scene.anims.create({
			key: 'idle',
			frames: this.scene.anims.generateFrameNumbers('perso', { start: 0, end: 4 }),
			frameRate: 12,
			repeat: -1
		});
		
		this.scene.anims.create({
			key: 'run',
			frames: this.scene.anims.generateFrameNumbers('perso', { start: 29, end: 32 }),
			frameRate: 12,
			repeat: -1
		});
		
		this.scene.anims.create({
			key: 'jumpUp',
			frames: this.scene.anims.generateFrameNumbers('perso', { start: 25, end: 28 }),
			frameRate: 24,
			repeat: -1
		});
		
		this.scene.anims.create({
			key: 'jumpDown',
			frames: this.scene.anims.generateFrameNumbers('perso', { start: 21, end: 24 }),
			frameRate: 24,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'wallSlide',
			frames: this.scene.anims.generateFrameNumbers('perso', { start: 33, end: 34 }),
			frameRate: 24,
			repeat: -1
		});
	}

}
