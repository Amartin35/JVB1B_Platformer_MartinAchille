export default class END_MONDE_SCENE2 extends Phaser.Scene {
	constructor() {
		super({ key: "END_MONDE_SCENE2" });
	}
	
	create() {
		// Calcul du nombre d'étoiles en fonction du temps et du nombre de morts
		const stars = this.calculateStars();
		
		// Affichage du texte avec le résultat
		const resultText = this.add.text(400, 200, `Vous avez obtenu ${stars} étoiles !`, {
			fontSize: "32px",
			fontFamily: "Impact",
			color: "#ffffff",
			align: "center"
		});
		resultText.setOrigin(0.5);
		
		// Options pour recommencer ou passer au niveau suivant
		const restartText = this.add.text(400, 300, "Recommencer", {
			fontSize: "24px",
			fontFamily: "Impact",
			color: "#ffffff",
			align: "center",
			backgroundColor: "#000000"
		});
		restartText.setOrigin(0.5);
		restartText.setInteractive();
		
		restartText.on("pointerup", () => {
			window.myGameValues.TimerValuesMonde2 = 0; // Réinitialise le temps à 0
			window.myGameValues.NbrMortValuesMonde2 = 0;
			this.scene.start("MONDE_2_NIVEAU_1");
		});
		
		// Ajout de l'effet de surbrillance lorsque la souris passe sur le texte "Recommencer"
		restartText.on("pointerover", () => {
			restartText.setBackgroundColor("#808080");
		});
		
		restartText.on("pointerout", () => {
			restartText.setBackgroundColor("#000000");
		});
		
		const nextLevelText = this.add.text(400, 350, "Monde suivant", {
			fontSize: "24px",
			fontFamily: "Impact",
			color: "#ffffff",
			align: "center",
			backgroundColor: "#000000"
		});
		nextLevelText.setOrigin(0.5);
		nextLevelText.setInteractive();
		
		nextLevelText.on("pointerup", () => {
			this.scene.start("END_JEU_SCENE");
		});
		
		// Ajout de l'effet de surbrillance lorsque la souris passe sur le texte "Monde suivant"
		nextLevelText.on("pointerover", () => {
			nextLevelText.setBackgroundColor("#808080");
		});
		
		nextLevelText.on("pointerout", () => {
			nextLevelText.setBackgroundColor("#000000");
		});
		
		
		
		// Affichage du temps et du nombre de morts
		this.timeText = this.add.text(10, 10, "Time : 0", { font: "16px Arial", fill: "#ffffff" });
		this.deathText = this.add.text(10, 50, "Death : 0", { font: "16px Arial", fill: "#ffffff" });
		
		const delta = this.game.loop.delta;
		
		// Convertir le temps en heures, minutes, secondes et millisecondes
		let ms = Math.floor(window.myGameValues.TimerValuesMonde2 % 1000);
		let s = Math.floor(window.myGameValues.TimerValuesMonde2 / 1000) % 60;
		let m = Math.floor(window.myGameValues.TimerValuesMonde2 / (60 * 1000)) % 60;
		let h = Math.floor(window.myGameValues.TimerValuesMonde2 / (60 * 60 * 1000)) % 99; // Limite de 99 heures
		
		// Mettre en forme le texte du chronomètre
		let text = `Time : ${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
		
		let textDeath = 'Death : ' + window.myGameValues.NbrMortValuesMonde2;
		this.timeText.setText(text).setFontFamily('Impact').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
		this.deathText.setText(textDeath).setFontFamily('Impact').setFontSize(25).setDepth(CHRONO_LAYER_DEPTH);
	}
	
	calculateStars() {
		const morts = window.myGameValues.NbrMortValuesMonde2;
		const temps = window.myGameValues.TimerValuesMonde2;
		
		// Seuils de temps et de morts pour chaque étoile (en secondes)
		const seuilsEtoiles = [
			{ temps: 60, morts: 1 },   // 3 étoiles : moins de 1 minute et 1 mort ou moins
			{ temps: 250, morts: 8 },  // 2 étoiles : moins de 4 minutes et 8 morts ou moins
			{ temps: 500, morts: 15 }  // 1 étoile : moins de 8 minutes et 15 morts ou moins
		];
		
		// Parcours des seuils pour déterminer le nombre d'étoiles atteint
		for (let i = 0; i < seuilsEtoiles.length; i++) {
			const seuil = seuilsEtoiles[i];
			if (temps <= seuil.temps * 1000 && morts <= seuil.morts) {
				const duree = `${Math.floor(seuil.temps / 60)} minutes`;
				return 3 - i;
			}
		}
		
		return 0;
	}
}
