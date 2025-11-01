function randomColor() {
	return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
		Math.random() * 255,
	)},${Math.floor(Math.random() * 255)})`;
}

class Game {
	constructor() {
		this.active = true;
		this.code = randomColor();

		this.header = document.getElementById("header");
		this.info = document.getElementById("info");
		this.optionBox = document.getElementById("main");
		this.statusBox = document.getElementById("status");
		this.actionButton = document.getElementById("action");

		this.actionButton.addEventListener("click", () => {
			this.actionButton.innerText = "New Game";
			this.statusBox.innerText = "";
			this.start();
		});

		this.optionBox.addEventListener("click", (event) => {
			if (!this.active) {
				return;
			}
			this.active = false;
			const isWin = this.code === event.target.dataset.value;
			if (isWin) {
				alert("You Won");
				this.actionButton.innerText = "Play Again";
				this.statusBox.innerText = "Correct";
			} else {
				alert("You Lost");
				this.actionButton.innerText = "New Game";
				this.statusBox.innerText = "Try Again";
			}
			let option = this.optionBox.firstChild;
			while (option) {
				if (isWin) {
					option.style.backgroundColor = this.code;
				} else if (option.dataset.value === this.code) {
					option.classList.add("disable");
				}
				option = option.nextSibling;
			}
		});
	}

	start() {
		this.active = true;
		this.code = randomColor();
		this.header.style.backgroundColor = this.info.innerText = this.code;
		while (this.optionBox.firstChild) {
			this.optionBox.removeChild(this.optionBox.firstChild);
		}
		const correctOption = Math.floor(Math.random() * 6);
		for (let i = 0; i < 6; i++) {
			let bgColor = this.code;
			while (correctOption !== i && bgColor === this.code) {
				bgColor = randomColor();
			}
			const gameButton = document.createElement("div");
			gameButton.classList.add("game-button");
			gameButton.dataset.value = bgColor;
			gameButton.style.backgroundColor = bgColor;
			this.optionBox.appendChild(gameButton);
			if (i === 2) {
				this.optionBox.append(document.createElement("br"));
			}
		}
	}
}
