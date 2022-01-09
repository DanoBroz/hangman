import { sound } from "../data/sound.js";
import Home from "./home.js";

const End = (_ => {
    const state = {
        chosenWord: null,
        winOrLose: null,
    }

    const $hangman = document.querySelector('.hangman');

    const listeners = _ => {
        document.querySelector('.button__trigger').addEventListener('click', _ => {
            sound.click.play();
            Home.init();
        })
    }

    const render = _ => {
        let markup = `
            <h1 class="hangman__title">GAME OVER</h1>
            <p class="result">You ${state.winOrLose.toUpperCase()}!<br>
            The word is 👉🏻 ${state.chosenWord.toUpperCase()}.</p>
            <button class="button button__trigger">Main Menu</button>
        `;
        $hangman.innerHTML = markup;
        listeners();
    }

    const setState = obj => {
        state.chosenWord = obj.chosenWord;
        state.winOrLose = obj.result;
        render();
    }

    return { render, setState }
})();

export default End;