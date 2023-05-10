export default class HUB extends Phaser.Scene{
    constructor() {
      super({key : "HUB"}); // mettre le meme nom que le nom de la classe
    }




/////////////////////////////////////// PRELOAD ///////////////////////////////////////
    preload() {

    }

/////////////////////////////////////// CREATE ///////////////////////////////////////
    create(){
        this.clavier = this.input.keyboard.createCursorKeys();
     
    
        // Ajout du texte
        this.add.text(300, 200, "Appuyez sur ESPACE", {
        fontSize: "32px",
        fill: "#fff",
        fontFamily: "Arial"
        });

          
    }

 /////////////////////////////////////// UPDATE  ///////////////////////////////////////
    update(){
        //LANCE PREMIERE SCENE QUAND ESPACE APPUYE
        if (Phaser.Input.Keyboard.JustDown(this.clavier.space)){
            this.scene.start("MONDE_1_NIVEAU_1",{
            });
        } 
        
    }
}