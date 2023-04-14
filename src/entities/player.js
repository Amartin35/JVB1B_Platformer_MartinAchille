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
        this.pad; // récupère la manette
		scene.physics.world.enable(this);
		scene.add.existing(this);
        // Propriétés des animations
		this.CreateAnimations();
        this.direction = "right"; 
        this.body.setSize(15, 15);
		this.body.setOffset(9, 50);

        // Propriétés de déplacement
        
        this.jumpHeight = 300; // Hauteur du saut en pixels
        this.isJumping = false; // Indique si le joueur est en train de sauter
        this.canJump = true; // Indique si le joueur peut sauter à nouveau
    }

    update() {
		// Déplacement horizontal
		if (this.clavier.left.isDown) {
			this.body.setVelocityX(-PLAYER_SPEED);
			this.direction = "left";
			this.flipX = true;
			if (!this.isJumping) {
				this.play("Run", true);
			}
		} else if (this.clavier.right.isDown) {
			this.body.setVelocityX(PLAYER_SPEED);
			this.direction = "right";
			this.flipX = false;
			if (!this.isJumping) {
				this.play("Run", true);
			}
		} else {
			this.body.setVelocityX(0);
			if (!this.isJumping) {
				this.play("Idle", true);
			}
		}

		// Saut
		if (this.clavier.up.isDown && this.canJump && !this.isJumping) {
			this.body.setVelocityY(-this.jumpHeight);
			this.isJumping = true;
			this.canJump = false;
			this.play("Jump", true);
		}

		// Si le joueur est en train de sauter et qu'il touche le sol, on l'indique
		if (this.body.onFloor()) {
			this.isJumping = false;
			this.canJump = true;
		}
    }

    CreateAnimations(){
		this.scene.anims.create({
			key: 'Idle',
			frames: this.scene.anims.generateFrameNumbers('perso', {start:0, end:5}),
			frameRate: 20,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'Run',
			frames: this.scene.anims.generateFrameNumbers('perso', {start:8, end:15}),
			frameRate: 10,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'Jump',
			frames: this.scene.anims.generateFrameNumbers('perso', {start:6, end:16}),
			frameRate: 10,
			repeat: -1
		});
	}
}
