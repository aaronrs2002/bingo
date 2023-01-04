
const columns = ["b", "i", "n", "g", "o"];
const players = ["player1", "player2", "player3", "player4"];
let diagonalWinTopLeft = ["b2", "i3", "n4", "g5", "o6"];
let diagonalWinTopRight = ["b6", "i5", "n4", "g3", "o2"];

let youVerified = [];
let calledPublically = [];
let upToFour = 0;/*starting at zero. each letter from the word bingo is represented*/
let calledListHTML = "";
let announcement = "";

/*DOES NOT RESET AT DEAL*/
let playerMoney = 500;
if (localStorage.getItem("balance") && Number(localStorage.getItem("balance"))) {
    playerMoney = Number(localStorage.getItem("balance"));
}
document.querySelector("#playerMoney").innerHTML = playerMoney;
let bet = 0;
function setPlayerMoney(passPlayerMoney) {
    playerMoney = passPlayerMoney;
    document.getElementById("playerMoney").innerHTML = passPlayerMoney;
    document.querySelector("#playerMoney").innerHTML = passPlayerMoney;/*SAFARI BUG NEEDS BOTH*/
    localStorage.setItem("balance", passPlayerMoney);
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
        console.log("Start player: " + players[i]);
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
                if (j == 2) {
                    row2 = row2 + 1;
                }
                if (j == 3) {
                    row3 = row3 + 1;
                }
                if (j == 4) {
                    row4 = row4 + 1;
                }
                if (j == 5) {
                    row5 = row5 + 1;
                }
                if (j == 6) {
                    row6 = row6 + 1;
                }
            });
        }


        let ckWinners = [theB, theI, theN, theG, theO, row2, row3, row4, row5, row6, verifyTopRight.length, verifyTopLeft.length];



        /*TEMP MONITOR*/

        console.log("players[i]: " + players[i]);

        switch (players[i]) {
            case 'player1':
                for (let a = 0; a < player1.length; a++) {
                    if (player1[a] > ckWinners[a]) {
                        ckWinners[a] = player1[a];

                    } else {
                        player1[a] = ckWinners[a];
                    }
                }
                break;
            case 'player2':
                for (let a = 0; a < player2.length; a++) {
                    if (player2[a] > ckWinners[a]) {
                        ckWinners[a] = player2[a];
                        console.log("had to update ckWinners[a]: " + ckWinners[a] + " - player2[a]: " + player2[a]);
                    } else {
                        player2[a] = ckWinners[a];
                        console.log("player 2 was bigger");
                    }
                }
                break;
            case 'player3':
                for (let a = 0; a < player3.length; a++) {
                    if (player3[a] > ckWinners[a]) {
                        ckWinners[a] = player3[a];
                    } else {
                        player3[a] = ckWinners[a];
                    }
                }
                break;
            case 'player4':
                for (let a = 0; a < player4.length; a++) {
                    if (player4[a] > ckWinners[a]) {
                        ckWinners[a] = player4[a];
                    } else {
                        player4[a] = ckWinners[a];
                    }
                }
                break;
        }

        console.log("player1: " + player1);
        console.log("player2: " + player2);
        console.log("player3: " + player3);
        console.log("player4: " + player4);















        // console.log("PLAYER: " + players[i] + " - ckWinners: " + ckWinners);

        if (ckWinners.indexOf(5) !== -1) {
            let message = "BINGO! <i class='fas fa-user'></i> " + players[i] + " is the WINNER! You lost $" + bet + ".";
            let alertLevel = "alert-danger";
            if (players[i] === "player1") {
                playerMoney = (playerMoney + bet);

                message = "BINGO! YOU FREAKIN WON $" + bet + "!";
                alertLevel = "alert-success";
            } else {
                playerMoney = (playerMoney - bet);
            }
            setPlayerMoney(playerMoney);
            document.getElementById("announcement").innerHTML = message;
            globalAlert(alertLevel, message);
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

        /*diagonal wins*/
        verifyTopLeft = [];
        verifyTopRight = [];



    }


}





function startCalling() {
    document.getElementById("callSquare").disabled = true;

    const targetLength = calledPublically.length + 1;

    let b = 15;
    let a = 1;
    if (upToFour === 1) {
        b = 30;
        a = 16;
    }
    if (upToFour === 2) {
        b = 45;
        a = 31;
    }
    if (upToFour === 3) {
        b = 60;
        a = 46;
    }
    if (upToFour === 4) {
        b = 75;
        a = 61;
    }


    while (calledPublically.length < targetLength) {

        let theNumber = Math.floor(a + Math.random() * (b - a));
        theNumber = theNumber.toString();
        let offering = (columns[upToFour] + theNumber).toString();
        if (calledPublically.indexOf(offering) === -1) {
            document.getElementById("selectedItem").innerHTML = "Calling: " + columns[upToFour] + "-" + theNumber;
            [].forEach.call(document.querySelectorAll("[data-value='" + offering + "']"), function (e) {
                e.classList.add("alert-success");
            });

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
    console.log("verify: " + squareInfo);
    if (youVerified.indexOf(squareInfo) !== -1) {
        document.querySelector("li[data-value='" + squareInfo + "']").classList.add("alert-success");
        youVerified.push(squareInfo);
    } else {
        document.querySelector("li[data-value='" + squareInfo + "']").classList.add("alert-danger");
        setTimeout(() => {
            document.querySelector("li[data-value='" + squareInfo + "']").classList.remove("alert-danger");
        }, 3000)
    }

}



function runGame(target) {
    player1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    player2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    player3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    player4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
        if (i === 0) {
            player = "You"
        }
        document.querySelector("div[data-details='" + (i + 1) + "']").innerHTML = player + " <i class='fas fa-user'></i>";
    }


    for (let j = 0; j < columns.length; j++) {
        let b = 15;
        let a = 1;
        if (j === 1) {
            b = 30;
            a = 16;
        }
        if (j === 2) {
            b = 45;
            a = 31;
        }
        if (j === 3) {
            b = 60;
            a = 46;
        }
        if (j === 4) {
            b = 75;
            a = 61;
        }

        cardHTML = cardHTML + "<ul class='list-unstyled inlineColumns'>";


        let usedNumbers = [];

        while (usedNumbers.length < 6) {
            let theNumber = Math.floor(a + Math.random() * (b - a));
            if (usedNumbers.indexOf(theNumber) === -1) {
                usedNumbers.push(theNumber);
                if (usedNumbers.length === 1) {
                    cardHTML = cardHTML + "<li><h3  class='text-capitalize text-center pt-2'>" + columns[j] + "</h3></li>";
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


}



function startGame(playerBet) {
    bet = playerBet;
    document.getElementById("betTarget").innerHTML = "Bet: $" + bet;
    document.getElementById("calledList").innerHTML = "";
    document.getElementById("startGame").classList.add("hide");
    document.getElementById("callSquare").classList.remove("hide");
    for (let i = 0; i < players.length; i++) {
        runGame(players[i]);
    }

}



