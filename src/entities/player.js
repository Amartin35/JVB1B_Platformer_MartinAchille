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
		this.setCollideWorldBounds(true);
		this.setDepth(PLAYER_LAYER_DEPTH);
		this.body.setCircle(7.5, 9, 49);

		

		this.CreateAnimations();
		

		this.direction = "right"; 
		this.wallJumping = true;
	
		this.onGround = true;
		this.isJumping = false;
		this.positions = [];
	}
	
	update(){
		
		// Aide saut
		if(!this.body.blocked.down){
			setTimeout(() => {
				this.onGround = this.body?.blocked.down;
			}, 83);
		}
		else{
			this.isJumping = false;
		}

		// Déplacement
		if (this.clavier.up.isDown && this.onGround && !this.isJumping) {
			this.body.setVelocityY(-PLAYER_JUMP);
			this.isJumping = true;
		}
		
		if (this.clavier.left.isDown) {
			this.body.setVelocityX(-PLAYER_SPEED);
			this.direction = "left";
			if (this.body.onFloor()) {
				this.anims.play('run', true);
			}
		} 
		else if (this.clavier.right.isDown) {
			this.body.setVelocityX(PLAYER_SPEED);
			this.direction = "right";
			if (this.body.onFloor()) {
				this.anims.play('run', true);
			}
		} 
		else {
			this.body.setVelocityX(0);
			if (this.body.onFloor()) {
				this.anims.play('idle', true);
			}
		}

	
		// Wall Jump
		const onWall = this.body.blocked.left || this.body.blocked.right;
	

		if (onWall && this.clavier.up.isDown && this.wallJumping && window.myGameValues.hasWallJump && !this.touchingWorldBounds) {
		  this.wallJumping = false;
		  this.body.setVelocityY(-PLAYER_JUMP);
		
		  // Décalage vers la gauche
		  const wallOffset = 25; // Augmentation du décalage du mur à 50 pixels
		  if (this.body.blocked.left) {
			this.scene.tweens.add({
			  targets: this,
			  x: this.x + wallOffset, // Utilisation de tweens pour déplacer le joueur de manière plus smooth
			  duration: 200,
			  ease: "Power1"
			});
		  } else {
			this.scene.tweens.add({
			  targets: this,
			  x: this.x - wallOffset, // Utilisation de tweens pour déplacer le joueur de manière plus smooth
			  duration: 200,
			  ease: "Power1"
			});
		  }
		
		  this.body.setVelocityX(-this.body.velocity.x);
		  setTimeout(() => {
			this.wallJumping = true;
		  }, 600);
		}
		
		
		else if (onWall && !this.clavier.up.isDown && window.myGameValues.hasWallJump) {
			this.body.setVelocityY(-this.body.velocity.y / 4); 
		}




		// Gestion des animations
		if (this.body.velocity.y < 0 && !onWall) {
			this.anims.play('jumpUp', true);
			if (this.direction === "left") {
				this.flipX = true;
			} else if (this.direction === "right") {
				this.flipX = false;
			}
		} 
		else if (this.body.velocity.y > 0 && !onWall) {
			this.anims.play('jumpDown', true);
			if (this.direction === "left") {
				this.flipX = true;
			} else if (this.direction === "right") {
				this.flipX = false;
			}
		} 
		else if (onWall && window.myGameValues.hasWallJump && !this.body.blocked.down) {
			this.anims.play('wallSlide', true);
			if (this.direction === "left") {
				this.flipX = false;
			} else if (this.direction === "right") {
				this.flipX = true;
			}
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
		if (this.checkWorldBounds()) {
			this.touchingWorldBounds = true;
		  } 
		  else {
			this.touchingWorldBounds = false;
		  }
		  
		if(this.y > 410) this.playerDeath();

		// Stocker les positions du sprite dans le tableau
		this.positions.push({ x: this.x, y: this.y });
		// Limiter la taille du tableau
		const maxPositions = 30000; // Modifier la taille maximale selon vos besoins
		if (this.positions.length > maxPositions) {
		this.positions.shift(); // Supprimer la première position pour conserver la taille maximale
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
			frameRate: 6,
			repeat: -1
		});
	}


	setPositions(positions) {
		this.positions = positions;
	}
	
	  getPlayerPositions() {
		return this.positions;
	}
	
	checkWorldBounds() {
		const worldBounds = this.scene.physics.world.bounds;
		const playerBounds = this.getBounds();
		return !Phaser.Geom.Rectangle.ContainsRect(worldBounds, playerBounds);
	}

	playerDeath() {
		// Fonction de kill
		this.scene.cameras.main.shake(200);
		this.scene.time.delayedCall(100, () => {
		  this.scene.scene.restart();
		  
		  const sceneKey = this.scene.scene.key;
	  
		  // Vérifier le nom de la scène pour déterminer où stocker les morts
		  if (sceneKey.startsWith("MONDE_1")) {
			window.myGameValues.NbrMortValuesMonde1 += 1;
			console.log(window.myGameValues.NbrMortValuesMonde1);
		  } else if (sceneKey.startsWith("MONDE_2")) {
			window.myGameValues.NbrMortValuesMonde2 += 1;
			console.log(window.myGameValues.NbrMortValuesMonde2);
		  }
		});
	  }
	  
	  

}
