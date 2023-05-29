export default class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setImmovable(true);
        this.createAnimsBossIdle();
    }


    update() {
        
    }


    createAnimsBossIdle() {
        this.scene.anims.create({
            key: 'idleBoss',
            frames: this.scene.anims.generateFrameNumbers('boss', { start: 0, end: 1 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.play('idleBoss', true);
    }

    killBoss() {
        this.scene.anims.create({
            key: 'Mortboss',
            frames: this.scene.anims.generateFrameNumbers('boss', { start: 2, end: 5 }),
            frameRate: 1,
           
        });
        this.anims.play('Mortboss', true);
    }
}
