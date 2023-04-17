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
		
	}
	
	update(){
		// Détection des touches de saut
		if (this.clavier.up.isDown && this.body.onFloor()) {
			this.body.setVelocityY(-500);
		}
		
		// Détection des touches de déplacement
		if (this.clavier.left.isDown) {
			this.body.setVelocityX(-200);
			this.direction = "left";
			if (this.body.onFloor()) {
				this.anims.play('run', true);
				this.flipX = true;
			}
		} else if (this.clavier.right.isDown) {
			this.body.setVelocityX(200);
			this.direction = "right";
			if (this.body.onFloor()) {
				this.anims.play('run', true);
				this.flipX = false;
			}
		} else {
			this.body.setVelocityX(0);
			if (this.body.onFloor()) {
				this.anims.play('idle', true);
			}
		}
		
		// Gestion des animations
		if (this.body.velocity.y < 0) {
			this.anims.play('jumpUp', true);
		} else if (this.body.velocity.y > 0) {
			this.anims.play('jumpDown', true);
		} else if (this.body.onFloor()) {
			if (this.direction === "left") {
				this.anims.play('run', true);
				this.flipX = true;
			} else {
				this.anims.play('idle', true);
			}
		}
	}
	
	CreateAnimations() {
		// Ajout des animations
		this.scene.anims.create({
			key: 'idle',
			frames: this.scene.anims.generateFrameNumbers('perso', { start: 0, end: 4 }),
			frameRate: 10,
			repeat: -1
		});
		
		this.scene.anims.create({
			key: 'run',
			frames: this.scene.anims.generateFrameNumbers('perso', { start: 29, end: 31 }),
			frameRate: 5,
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
	}
}
