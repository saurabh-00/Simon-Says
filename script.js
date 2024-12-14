let gameSeq = [];
let userSeq = [];

let btns = ["green", "red", "yellow", "purple"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;

        setTimeout(levelUp(), 1000);
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 400)
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250)
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`

    let randomIdx = Math.floor(Math.random() * 3);
    let randomClr = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomClr}`)
    gameSeq.push(randomClr);
    setTimeout(gameFlash(randomBtn), 1000);
};

function checkSeq(idx) {
    // let idx = level - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000)
        }
    }
    else {
        h2.innerHTML = `GAME OVER! Your Score was <b>${level * 10}.</b> <br>Press any key to Restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#002244";
        }, 250);
        setTimeout(reset(), 1000);
    }

}

function btnPress() {
    if(started === true) {
        let btn = this;
        userFlash(btn);

        userClr = btn.getAttribute("id");
        // console.log(userClr);
        userSeq.push(userClr);
        checkSeq(userSeq.length - 1);
    }
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}