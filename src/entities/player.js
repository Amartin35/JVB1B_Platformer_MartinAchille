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
		
		// Définition des propriétés de saut
		this.jumpVelocity = -350;
		this.isJumping = false;
		this.jumpStartY = 0;
		this.jumpApexY = 0;
	}
	
	update(){
		
		// Détection des collisions avec le sol
		const onGround = this.body.blocked.down;
		
		// Gestion des sauts
		if (onGround) {
			// Réinitialisation des propriétés de saut
			this.isJumping = false;
			this.jumpStartY = 0;
			this.jumpApexY = 0;
		} else if (this.isJumping) {
			// Saut en cours
			
			// Calcul de la progression du saut
			const jumpProgress = (this.y - this.jumpStartY) / (this.jumpApexY - this.jumpStartY);
			
			// Animation de saut
			if (jumpProgress < 0.25) {
				this.anims.play('jump_start', true);
			} else if (jumpProgress < 0.5) {
				this.anims.play('jump_up', true);
			} else if (jumpProgress < 0.75) {
				this.anims.play('jump_apex', true);
			} else {
				this.anims.play('jump_down', true);
			}
		} else {
			// Animation de marche
			this.anims.play('walk', true);
		}
		

		
		// Détection des entrées clavier
		const cursors = this.scene.input.keyboard.createCursorKeys();
		
		if (cursors.up.isDown && onGround) {
			// Début du saut
			this.isJumping = true;
			this.jumpStartY = this.y;
			this.jumpApexY = this.y - 100; // Hauteur maximale du saut
			this.setVelocityY(this.jumpVelocity);
		}
		
	
	}



	CreateAnimations() {
		// Animation de marche
		this.scene.anims.create({
			key: 'walk',
			frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
			frameRate: 10,
			repeat: -1
		});
		
		// Animation de saut - début
		this.scene.anims.create({
			key: 'jump_start',
			frames: [ { key: 'perso2', frame: 17 } ],
			frameRate: 10
		});
		
		// Animation de saut - montée
		this.scene.anims.create({
			key: 'jump_up',
			frames: [ { key: 'perso2', frame: 18 } ],
			frameRate: 10
		});
		
		// Animation de saut - point culminant
		this.scene.anims.create({
			key: 'jump_apex',
			frames: [ { key: 'perso2', frame: 19 } ],
			frameRate: 10
		});
		
		// Animation de saut - descente
		this.scene.anims.create({
			key: 'jump_down',
			frames: [ { key: 'perso2', frame: 20 } ],
			frameRate: 10
		});
	}

}


