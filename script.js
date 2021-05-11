var names = new String(); // player1 plays with x and player2 plays with 0
var whoTurn = 1, nrMarkedCells = 0;

function replay() {
    whoTurn = 1;
    nrMarkedCells = 0;
    $('#grid').empty();
    $('#informationSpace').children().last().remove();
    $('#messagesForPlayers').text(names[whoTurn] + '\'s turn.');
    generateGrid();
}

function generateGrid() {
    for (let i = 0; i < 9; i++)
        $('#grid').append('<button type="button" class="btn gridCell border border-dark rounded-0 fs-4" id="cell' + i + '" onclick="markCell(' + i + ');"></button>');
}

function setNames() {
    for (let i = 1; i < 3; i++) {
        names[i] = $('#user' + i).val();
        if (!names[i])
            names[i] = "Player" + i;
        $('#user' + i).val('');
    }
    generateGrid();
    $('#messagesForPlayers').text(names[whoTurn] + '\'s turn.');
}

function markCell(whichCell) {
    $('#cell' + whichCell).addClass('btn-light');
    $('#cell' + whichCell).prop('disabled', true);
    if (whoTurn === 1) // then i have to put an 'X' into this cell
        $('#cell' + whichCell).text('X');
    else
        $('#cell' + whichCell).text('0');
    whoTurn = 3 - whoTurn;
    nrMarkedCells++;
    $('#messagesForPlayers').text(names[whoTurn] + '\'s turn.');
    checkGameStatus();
}

function checkGameStatus() {
    var whoWon = -1;
    for (let i = 0; i < 9; i += 3) {
        if ($('#cell' + i).text() === $('#cell' + (i + 1)).text() && $('#cell' + i).text() === $('#cell' + (i + 2)).text())
            whoWon = i;
        if ($('#cell' + i / 3).text() === $('#cell' + (i / 3 + 3)).text() && $('#cell' + i / 3).text() === $('#cell' + (i / 3 + 6)).text())
            whoWon = i / 3;
    }
    if (($('#cell0').text() === $('#cell4').text() && $('#cell0').text() === $('#cell8').text()) || ($('#cell2').text() === $('#cell4').text() && $('#cell2').text() === $('#cell6').text()))
        whoWon = 4;

    if (whoWon >= 0 && $('#cell' + whoWon).text() !== '') {
        $('#messagesForPlayers').text(names[2 - ($('#cell' + whoWon).text() === 'X')] + ' has won!');
        $('#informationSpace').append('<button type="button" class="btn btn-info rounded-pill px-3" onclick="replay();">Play Again!</button>');
        invalidCells();
    }
    else if (nrMarkedCells === 9) {
        $('#messagesForPlayers').text('Draw. Try again!');
        $('#informationSpace').append('<button type="button" class="btn btn-info rounded-pill px-3" onclick="replay();">Play Again!</button>');
    }
}

function invalidCells() {
    for (let i = 0; i < 9; i++) {
        $('#cell' + i).addClass('btn-light');
        $('#cell' + i).prop('disabled', true);
    }
}
