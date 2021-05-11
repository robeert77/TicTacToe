const checkPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
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

function cellText(line, column) {
    return $('#cell' + checkPositions[line][column]).text();
}

function checkGameStatus() {
    let whoWon = 0;
    for (let i = 0; i < checkPositions.length; i++) {
        let currentCell = cellText(i, 0);
        if (currentCell !== '' && currentCell === cellText(i, 1) && currentCell === cellText(i, 2))
            whoWon = 2 - (currentCell === 'X');
    }

    if (whoWon != 0) {
        $('#messagesForPlayers').text(names[whoWon] + ' has won!');
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
