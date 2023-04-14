export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture); 
		this.clavier = scene.input.keyboard.addKeys({
			left: Phaser.Input.Keyboard.KeyCodes.Q,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			space: Phaser.Input.Keyboard.KeyCodes.SPACE,
			attack: Phaser.Input.Keyboard.KeyCodes.V,
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

    update() {
        var mouvement = new Phaser.Math.Vector2(0, 0);

		// Mouvement
		if (this.clavier.left.isDown || this.pad?.left) {
			mouvement.x = -1;
			this.direction = "left"; 
		} 
		else if (this.clavier.right.isDown || this.pad?.right) {
			mouvement.x = 1;
			this.direction = "right"; 
		} 
		else {
			mouvement.x = 0;
			
		}
		if (this.clavier.space.isDown || this.pad?.up) {
			mouvement.y = -1;
			this.direction = "up"; 
            this.anims.play("Idle",true);
		}
		else {
			mouvement.y = 0;
		}
		
		mouvement.normalize();
		this.setVelocity(mouvement.x * PLAYER_SPEED, mouvement.y * PLAYER_SPEED );
		
		if (mouvement.x < 0) {
			this.flipX = true;
		}
		else if (mouvement.x > 0) {
			this.flipX = false;
		}
		
		if(mouvement.length() != 0) {
			
			this.anims.play("Idle",true);

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
			key: 'Jump',
			frames: this.scene.anims.generateFrameNumbers('perso', {start:6, end:16}),
			frameRate: 8,
			repeat: -1
		});
		
	}
}