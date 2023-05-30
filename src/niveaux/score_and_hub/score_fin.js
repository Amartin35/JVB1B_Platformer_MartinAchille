export default class END_JEU_SCENE extends Phaser.Scene {
	constructor() {
		super({ key: "END_JEU_SCENE" });
	}
	/////////////////////////////////////// CREATE ///////////////////////////////////////
	create() {
		// Affichage du temps et du nombre de morts globaux
		const tempsGlobale = window.myGameValues.TimerValuesMonde1 + window.myGameValues.TimerValuesMonde2 + + window.myGameValues.TimerValuesMonde3;
		const mortsGlobale = window.myGameValues.NbrMortValuesMonde1 + window.myGameValues.NbrMortValuesMonde2 + window.myGameValues.NbrMortValuesMonde3;

		this.timeText = this.add.text(10, 10, "Time Global : 0", { font: "16px Arial", fill: "#ffffff" });
		this.deathText = this.add.text(10, 50, "Death Global: 0", { font: "16px Arial", fill: "#ffffff" });

		const delta = this.game.loop.delta;

		// Convertir le temps en heures, minutes, secondes et millisecondes
		let ms = Math.floor(tempsGlobale % 1000);
		let s = Math.floor(tempsGlobale / 1000) % 60;
		let m = Math.floor(tempsGlobale / (60 * 1000)) % 60;
		let h = Math.floor(tempsGlobale / (60 * 60 * 1000)) % 99; // Limite de 99 heures

		// Texte du chronomètre
		let text = `Time : ${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;

		let textDeath = 'Death : ' + mortsGlobale;
		this.timeText.setText(text).setFontFamily('Impact').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
		this.deathText.setText(textDeath).setFontFamily('Impact').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);

		// Option pour recommencer tout le jeu
		const restartText = this.add.text(400, 300, "Restart the game", {
			fontSize: "24px",
			fontFamily: "Impact",
			color: "#ffffff",
			align: "center",
			backgroundColor: "#000000"
		});
		restartText.setOrigin(0.5);
		restartText.setInteractive();
		restartText.on("pointerup", () => {
			window.myGameValues.TimerValuesMonde1 = 0; // Réinitialise le temps à 0
			window.myGameValues.NbrMortValuesMonde1 = 0;
			window.myGameValues.TimerValuesMonde2 = 0;
			window.myGameValues.NbrMortValuesMonde2 = 0;
			window.myGameValues.hasWallJump = false;
			this.scene.start("MONDE_1_NIVEAU_1");
		});

		// Ajout de l'effet de surbrillance lorsque la souris passe sur le texte "Recommencer le jeu"
		restartText.on("pointerover", () => {
			restartText.setBackgroundColor("#808080");
		});
		restartText.on("pointerout", () => {
			restartText.setBackgroundColor("#000000");
		});
	}
}
