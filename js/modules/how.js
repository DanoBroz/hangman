import { sound } from '../data/sound.js'
import Home from './home.js';

const How = (_ => {
    const $hangman = document.querySelector('.hangman');

    const listeners = _ => {
        document.querySelector('.button__trigger').addEventListener('click', _ => {
            sound.click.play();
            Home.init();
        })
    }

    const render = _ => {
        let markup = `
            <h1 class="hangman__title">Instructions</h1>
            <ul class="how">
                <li>Alright here's how to play!</li>
                <li>When you start a new game, the game will automatically choose a random word.</li>
                <li>Your job is to guess the chosen word completely by guessing a letter at a time by clicking on the buttons.</li>
                <li>If you successfully guess the word within 7 tries, you win or else you lose.</li>
                <li>If you lose, you'll be hanged without mercy 👻</li>
            </ul>
            <button class="button button__trigger">Main Menu</button>
        `
        $hangman.innerHTML = markup;
    }

    const init = _ => {
        render();
        listeners();
    }

    return { init }
})()

export default How;