const Board = (_ => {
    let livesLeft = 0;
    let canvas;
    let context;

    const init = _ => {
        canvas = document.querySelector('.hangman__board');
        context = canvas.getContext('2d');
        context.lineWidth = 2;
        context.strokeStyle = 'white';
        base();
    }

    const draw = (startX, startY, endX, endY) => {
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
    }

    const line1 = _ => draw(0, 150, 150, 150);
    const line2 = _ => draw(10, 0, 10, 300);
    const line3 = _ => draw(0, 10, 100, 10);

    const rope = _ => draw(60, 10, 60, 25);

    const head = _ => {
        context.beginPath();
        context.arc(60, 35, 10, 0, Math.PI * 2);
        context.stroke();
    }

    const torso = _ => draw(60, 46, 60, 80);
    const rightArm = _ => draw(60, 56, 100, 60);
    const leftArm = _ => draw(60, 56, 20, 60);
    const rightLeg = _ => draw(60, 80, 100, 110);
    const leftLeg = _ => draw(60, 80, 20, 110);

    const base = _ => {
        line1();
        line2();
        line3();
    }

    const parts = [rightLeg, leftLeg, rightArm, leftArm, torso, head, rope]

    const render = _ => {
        parts[livesLeft]();
    }

    const setLives = newLives => {
        livesLeft = newLives;
        render();
    }

    return { setLives, init }
})();

export default Board