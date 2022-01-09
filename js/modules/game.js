import { sound } from "../data/sound.js";
import Board from "./board.js";
import End from "./end.js";
import Home from "./home.js";

const Game = (_ => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const words = ['apple', 'ball', 'cat', 'dog', 'elephant'];
    let chosenWord;
    let guessingWord;
    let lives;
    let guesses;

    const $hangman = document.querySelector('.hangman');

    const chooseWord = _ => {
        const randomNumber = Math.floor(Math.random() * words.length)
        return words[randomNumber];
    }

    const createLetters = _ => {
        let markup = "";
        letters.forEach(letter => {
            const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';
            markup += `
                <li class="hangman__letter ${isActive}">${letter}</li>
            `
        })
        return markup;
    }

    const isAlreadyTaken = letter => {
        return guesses.includes(letter);
    }

    const updateGuessingWord = letter => {
        chosenWord.split('').forEach((elem, index) => {
            if(elem === letter) {
                guessingWord[index] = elem;
            }
        })
    }

    const render = _ => {
        document.querySelector('.hangman__lives').innerHTML = lives;
        document.querySelector('.hangman__word').innerHTML = guessingWord.join('');
        document.querySelector('.hangman__letters').innerHTML = createLetters();
    }

    const hasWon = _ => guessingWord.join('') === chosenWord;
    const hasLost = _ => lives <= 0;

    const isGameOver = _ => {
        if(hasWon()) {
            sound.win.play();
            End.setState({
                chosenWord,
                result: 'win'
            });
            End.render();
        }
        if(hasLost()) {
            sound.lose.play();
            End.setState({
                chosenWord,
                result: 'lose'
            });
            End.render();
        }
    }

    const check = guess => {
        if (isAlreadyTaken(guess)) return;

        guesses.push(guess);

        if (chosenWord.includes(guess)) {
            updateGuessingWord(guess);
        } else {
            lives--;
            Board.setLives(lives);
        }
        render();
        isGameOver();
    }

    const listeners = _ => {
        $hangman.addEventListener('click', event => {
            if(event.target.matches('.hangman__letter')) {
                sound.click.play();
                check(event.target.innerHTML)
            }

            if(event.target.matches('.hangman__trigger')) {
                Home.init();
                sound.click.play();
            }
        })
    }

    const showInitPage = _ => {
        let markup = `
            <p class="hangman__stats">Lives: <span class="hangman__lives">${lives}</span></p>
            <h1 class="hangman__title">Hangman</h1>
            <canvas class="hangman__board" height="155px"></canvas>
            <div class="hangman__word">
                ${guessingWord.join('')}
            </div>
            <p class="hangman__instructions">Pick an alphabet below to guess the whole word.</p>
            <ul class="hangman__letters">
                ${createLetters()}
            </ul>
            <button class="button hangman__trigger">Main menu</button>
        `
        $hangman.innerHTML = markup;
    }

    const init = _ => {
        chosenWord = chooseWord();
        guessingWord = Array(chosenWord.length).fill('_');
        guesses = [];
        lives = 7;
        showInitPage();
        listeners();
        Board.init();
    }

    return { init }
})()

export default Game;