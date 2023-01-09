var buttons = document.getElementsByTagName("th");
var panels = document.getElementsByClassName("Panel");
var used = new Array(9).fill(0);
var options = ["X", "0"], score = [0, 0];
var next = 0, moves = 0, finished = false, angle = 0;

function Start() {
    angle = 0;
    for (var i = 0; i < 9; i++) {
        buttons[i].textContent = "";
        buttons[i].addEventListener('click', Press.bind(null, i));
        buttons[i].addEventListener('mouseover', Enter.bind(null, i));
        buttons[i].addEventListener('mouseleave', Leave.bind(null, i));
    }
}

function Press(i) {
    if (!used[i] && !finished) {  //  If button is not used and game not ended
        buttons[i].textContent = options[next];
        used[i] = next + 1;
        next = (next + 1) % 2;
        document.getElementById("Next").textContent = "Next: \xa0\xa0" + options[next];
        VerifyWinner();
    }
}

function Enter(i) {  //  On mouse over
    if (!used[i] && !finished) {
        buttons[i].style.backgroundColor = "rgb(59, 59, 59)";
    }
}

function Leave(i) {  //  On mouse leave
    buttons[i].style.backgroundColor = "rgb(40, 40, 40)";
}

function VerifyWinner() {
    moves++;
    for (var i = 0; i < 3; i++) {
        var lineX = [0, 0], lineY = [0, 0];
        for (var j = 0; j < 3; j++) {
            if (used[j * 3 + i]) {
                lineY[used[j * 3 + i] - 1]++;
            }
            if (used[j + i * 3]) {
                lineX[used[j + i * 3] - 1]++;
            }
        }
        if (lineX[0] > 2 || lineX[1] > 2) {
            SetLine(300, (-205 + 205 * i), 0, 90);
        }
        if (lineY[0] > 2 || lineY[1] > 2) {
            SetLine(300, 0, (-205 + 205 * i), 0);
        }
        if (lineY[0] > 2 || lineX[0] > 2) {  //  Win x
            Winner(0);
            return;
        }
        if (lineY[1] > 2 || lineX[1] > 2) {  //  Win 0
            Winner(1);
            return;
        }
    }
    if (used[0] == used[4] && used[4] == used[8] && used[8] > 0) {  //  win on diagonal
        SetLine(350, 0, 0, -45);
        Winner(used[0] - 1);
    }
    if (used[2] == used[4] && used[4] == used[6] && used[6] > 0) {
        SetLine(350, 0, 0, 45);
        Winner(used[2] - 1);
    }
    if (!finished && moves == 9) {  //  if all buttons are used
        Winner(2);
        return;
    }
}

function SetLine(ln, tp, lft, dg) {
    document.getElementById('ShowResult').style.height = ln + "px";
    document.getElementById('ShowResult').style.marginTop = tp + "px";
    document.getElementById('ShowResult').style.marginLeft = lft + "px";
    document.getElementById('ShowResult').style.transform = "rotate(" + dg + "deg)";
}

function Winner(player) {
    finished = true;
    document.getElementById("Winner").textContent = "Draw";
    if (player < 2) {  //  if is not draw
        score[player]++;
        document.getElementById("Winner").textContent = "Winner: \xa0\xa0" + options[(next + 1) % 2];
        document.getElementById('ShowResult').style.display = 'flex';
    }
    panels[1].style.display = 'none';
    panels[2].style.display = 'flex';
}

function ClearMap() {
    finished = false;
    moves = 0;
    for (var i = 0; i < 9; i++) {  //  remove text from all buttons
        used[i] = 0;
        buttons[i].textContent = "";
    }
    document.getElementById('ShowResult').style.display = 'none';
    document.getElementById('Score').textContent = "Score \xa0\xa0" + score[0] + " : " + score[1];  //  Update score
    document.getElementById("Next").textContent = "Next: \xa0\xa0" + options[next];
    panels[1].style.display = 'flex';
    panels[2].style.display = 'none';
}

function Reset() {  //  Reset button
    score = [0, 0];
    next = 0;
    ClearMap();
}