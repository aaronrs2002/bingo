
const columns = ["b", "i", "n", "g", "o"];
const players = ["player1", "player2", "player3", "player4"];
let diagonalWinTopLeft = ["b2", "i3", "n4", "g5", "o6"];
let diagonalWinTopRight = ["b6", "i5", "n4", "g3", "o2"];
let youVerified = [];
let calledPublically = [];
let upToFour = 0;/*starting at zero. each letter from the word bingo is represented*/
let calledListHTML = "";
let announcement = "";
let runAuto = false;
/*DOES NOT RESET AT DEAL*/
let playerMoney = 500;
if (localStorage.getItem("balance") && Number(localStorage.getItem("balance"))) {
    playerMoney = Number(localStorage.getItem("balance"));
}
document.querySelector("#playerMoney").innerHTML = playerMoney;
let bet = 0;
function setPlayerMoney(passPlayerMoney, status) {

    if (status === "won") {
        playerMoney = passPlayerMoney + bet;
        console.log("you won " + bet + " balance: " + playerMoney);
    } else {
        playerMoney = passPlayerMoney - bet;
        console.log("you won " + bet + " balance: " + playerMoney);
    }
    document.getElementById("playerMoney").innerHTML = playerMoney;
    document.querySelector("#playerMoney").innerHTML = playerMoney;/*SAFARI BUG NEEDS BOTH*/
    localStorage.setItem("balance", playerMoney);
    return false;
}

let player1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let player2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let player3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let player4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let theB = 0;
let theI = 0;
let theN = 0;
let theG = 0;
let theO = 0;
let row2 = 0;
let row3 = 0;
let row4 = 0;
let row5 = 0;
let row6 = 0;
/*diagonal wins*/
let verifyTopLeft = [];
let verifyTopRight = [];

function checkForBingo() {
    for (let i = 0; i < players.length; i++) {
        for (let j = 2; j < 7; j++) {
            [].forEach.call(document.querySelectorAll("div#" + players[i] + " .alert-success[data-rowid='" + j + "']"), function (e) {
                e.dataset.counted = "true";
                let theRowId = j.toString();
                let theColumID = e.dataset.columnid;
                let squareVerified = (theColumID + theRowId);
                /*start LEFT diagonal ck*/
                if (diagonalWinTopLeft.indexOf(squareVerified) !== -1 && verifyTopLeft.indexOf(squareVerified) === -1) {
                    verifyTopLeft.push(squareVerified);
                }
                /*start RIGHT diagonal ck*/
                if (diagonalWinTopRight.indexOf(squareVerified) !== -1 && verifyTopRight.indexOf(squareVerified) === -1) {
                    verifyTopRight.push(squareVerified);
                }
                switch (theColumID) {
                    case "b":
                        theB = theB + 1;
                        break;
                    case "i":
                        theI = theI + 1;
                        break;
                    case "n":
                        theN = theN + 1;
                        break;
                    case "g":
                        theG = theG + 1;
                        break;
                    case "o":
                        theO = theO + 1;
                        break;
                }
                if (j == 2) { row2 = row2 + 1; }
                if (j == 3) { row3 = row3 + 1; }
                if (j == 4) { row4 = row4 + 1; }
                if (j == 5) { row5 = row5 + 1; }
                if (j == 6) { row6 = row6 + 1; }
            });
        }
        let ckWinners = [theB, theI, theN, theG, theO, row2, row3, row4, row5, row6, verifyTopRight.length, verifyTopLeft.length];
        switch (players[i]) {
            case "player1":
                player1 = ckWinners;
                break;
            case "player2":
                player2 = ckWinners;
                break;
            case "player3":
                player3 = ckWinners;
                break;
            case "player4":
                player4 = ckWinners;
                break;
        }
        if (ckWinners.indexOf(5) !== -1) {
            let message = "BINGO! <i class='fas fa-user'></i> " + players[i] + " is the WINNER! You lost $" + bet + ".";
            let alertLevel = "alert-danger";
            if (player1.indexOf(5) !== -1) {
                setPlayerMoney(playerMoney, "won");


                message = "BINGO! YOU FREAKIN WON $" + bet + "!";
                alertLevel = "alert-success";
            } else {
                setPlayerMoney(playerMoney, "lost");
            }
            document.getElementById("announcement").innerHTML = message;
            document.getElementById("selectedItem").innerHTML = "Place your bet.";
            document.getElementById("betTarget").innerHTML = "";
            if (calledPublically.length > 5) {
                globalAlert(alertLevel, message);
            }
            setTimeout(() => {
                document.getElementById("startGame").classList.remove("hide");
            }, 3000);
            document.getElementById("callSquare").classList.add("hide");
            document.getElementById(players[i]).classList.remove("alert-light");
            document.getElementById(players[i]).classList.add("alert-primary");
        }
        theB = 0;
        theI = 0;
        theN = 0;
        theG = 0;
        theO = 0;
        row2 = 0;
        row3 = 0;
        row4 = 0;
        row5 = 0;
        row6 = 0;
        verifyTopLeft = [];
        verifyTopRight = [];
    }
    return false;
}

function startCalling() {
    document.getElementById("callSquare").disabled = true;
    const targetLength = calledPublically.length + 1;
    let b = 15;
    let a = 1;
    if (upToFour === 1) { b = 30; a = 16; }
    if (upToFour === 2) { b = 45; a = 31; }
    if (upToFour === 3) { b = 60; a = 46; }
    if (upToFour === 4) { b = 75; a = 61; }
    while (calledPublically.length < targetLength) {
        let theNumber = Math.floor(a + Math.random() * (b - a));
        theNumber = theNumber.toString();
        let offering = (columns[upToFour] + theNumber).toString();
        if (calledPublically.indexOf(offering) === -1) {
            document.getElementById("selectedItem").innerHTML = "Calling: " + columns[upToFour] + "-" + theNumber;
            let whereToStart = 0;
            if (runAuto === false) {
                whereToStart = 1;
            }
            for (let i = whereToStart; i < players.length; i++) {
                [].forEach.call(document.querySelectorAll("div#" + players[i] + " [data-value='" + offering + "']"), function (e) {
                    e.classList.add("alert-success");
                });
            }
            calledPublically.push(offering);
            calledListHTML = calledListHTML + "<span class='badge bg-warning text-dark mx-1 text-capitalize'>" + offering + "</span>";
            document.getElementById("calledList").innerHTML = calledListHTML;
        }
    }
    upToFour = upToFour + 1;
    if (upToFour >= 5) {
        upToFour = 0;
    }
    document.getElementById("callSquare").disabled = false;
    checkForBingo();
    return false;
}

function verifysquare(squareInfo) {
    const ckForWinner = [...player1, ...player2, ...player3, ...player4];
    if (ckForWinner.indexOf(5) !== -1) {
        globalAlert("alert-danger", "Somebody already won. Place your bet up top.");
        return false;
    }
    if (calledPublically.indexOf(squareInfo) !== -1) {
        document.querySelector("li[data-value='" + squareInfo + "']").classList.add("alert-success");
        youVerified.push(squareInfo);
        checkForBingo();
    } else {
        document.querySelector("li[data-value='" + squareInfo + "']").classList.add("alert-danger");
        setTimeout(() => {
            document.querySelector("li[data-value='" + squareInfo + "']").classList.remove("alert-danger");
        }, 3000)
    }
    startCalling();
}

function runGame(target) {
    youVerified = [];
    calledPublically = [];
    upToFour = 0;
    calledListHTML = "";
    let cardHTML = "";
    document.getElementById("announcement").innerHTML = "";
    for (let i = 0; i < players.length; i++) {
        document.getElementById(players[i]).classList.remove("alert-primary");
        document.getElementById(players[i]).classList.add("alert-light");
        let player = "Player: " + (i + 1);
        if (i === 0) { player = "You" }
        document.querySelector("div[data-details='" + (i + 1) + "']").innerHTML = player + " <i class='fas fa-user py-3'></i>";
    }
    for (let j = 0; j < columns.length; j++) {
        let b = 15;
        let a = 1;
        if (j === 1) { b = 30; a = 16; }
        if (j === 2) { b = 45; a = 31; }
        if (j === 3) { b = 60; a = 46; }
        if (j === 4) { b = 75; a = 61; }
        cardHTML = cardHTML + "<ul class='list-unstyled inlineColumns'>";
        let usedNumbers = [];
        while (usedNumbers.length < 6) {
            let theNumber = Math.floor(a + Math.random() * (b - a));
            if (usedNumbers.indexOf(theNumber) === -1) {
                usedNumbers.push(theNumber);
                if (usedNumbers.length === 1) {
                    cardHTML = cardHTML + "<li><h2  class='text-capitalize text-center pt-2'>" + columns[j] + "</h2></li>";
                } else {
                    let clickFunc = "";
                    if (target === "player1") {
                        clickFunc = ` onClick="javascript:verifysquare('${columns[j] + theNumber}')" `;
                    }
                    if (columns[j] === "n" && usedNumbers.length === 4) {
                        cardHTML = cardHTML + "<li data-player='" + target + "' data-value='FREE' data-rowid='" + usedNumbers.length + "' data-columnid='" + columns[j] + "'  class='text-center alert-success' >FREE</li>";
                    } else {
                        cardHTML = cardHTML + "<li data-player='" + target + "'  data-value='" + columns[j] + theNumber + "' data-rowid='" + usedNumbers.length + "' data-columnid='" + columns[j] + "' " + clickFunc + " class='text-center'>" + theNumber + "</li>";
                    }
                }
            }
        }
        cardHTML = cardHTML + "</ul>";
    }
    document.getElementById(target).innerHTML = cardHTML;
    startCalling();
}

function startGame(playerBet) {
    player1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    player2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    player3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    player4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (document.querySelector(".alert-success[data-rowid]") !== null) {
        [].forEach.call(document.querySelectorAll(".alert-success[data-rowid]"), function (e) {
            e.classList.remove("alert-success");
        });
    }
    bet = playerBet;
    document.getElementById("betTarget").innerHTML = "Bet: $" + bet;
    document.getElementById("calledList").innerHTML = "";
    document.getElementById("startGame").classList.add("hide");
    document.getElementById("callSquare").classList.remove("hide");
    document.getElementById("selectedItem").innerHTML = "Select Square to begin.";

    for (let i = 0; i < players.length; i++) {
        runGame(players[i]);
    }
}



