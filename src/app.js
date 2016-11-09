import {createStore} from 'redux';
import $ from 'jquery';
import {defaultState, numToLetter, letterToNum} from './drawBoard';



const DrawBoard = (state) => {
    $('table').empty();
    var templateRow = $('<tr/>');
    var templateCell = $('<td/>');
    templateCell.addClass('cell');
    
    for (var index = 8; index > 0; index--) {
        let row = templateRow.clone();
        for (var cellIndex = 1; cellIndex < 9; cellIndex++) {
            let cell = templateCell.clone();
            if (index % 2 != 0){
                if (cellIndex % 2 === 0) {
                    cell.addClass('white');
                }
                else{
                    cell.addClass('black');                    
                }
            }
            else{
                if (cellIndex % 2 === 0) {
                    cell.addClass('black');
                }
                else{
                    cell.addClass('white');
                }
            }
            cell.addClass(numToLetter(cellIndex) + index + '');
            cell.attr('data-position', numToLetter(cellIndex) + index + '');
            row.append(cell);
        }
        $('table').append(row.clone());
    }
    var figures = state.figures; 
    figures.forEach((figure, index)=>{
        var figureImg = $('<img/>').attr('src','img/' + figure.color+'-'+figure.name + '.png').addClass('figure');
        var cell = $('.' + figure.position);
        cell.attr('data-color', figure.color);
        cell.attr('data-name', figure.name);
        $('.' + figure.position).append(figureImg);
    });

    $('.cell').click(function(){
        var figureColor = $(this).data('color');
        var figurePosition = $(this).data('position');
        var figureType = $(this).data('name');
        cellClick(figureColor, figurePosition, figureType);
    });
};



const reducer = (state = defaultState(), action) => {
    switch (action.type) {
        case 'MOVE_FIGURE':
            var newState = Object.assign(state);
            newState.figures.forEach((figure,index) => {
                if(figure.position === action.position){
                    figure.position = action.newPosition;
                }
                else if(figure.position === action.newPosition){
                    newState.figures.splice(index,1);
                }
            });
            return newState;
        default:
            return state;
    }
};

let store = createStore(reducer);


function setAvailableMoves(){
    if (activeFigure) {
        switch (activeFigure.type) {
            case 'pawn':
                var positionLetterNum = letterToNum(activeFigure.position[0]);
                var positionNum = Number(activeFigure.position[1]);
                var moveDirection;
                if (activeFigure.color === 'white') {
                    moveDirection = +1;
                }
                else{
                    moveDirection = -1;
                }
                var moves = [[positionLetterNum, positionNum+moveDirection], [positionLetterNum+1, positionNum+moveDirection], [positionLetterNum-1, positionNum+moveDirection]];
                activeFigure.moves = moves;
            default:
                break;
        }
    }
}

function cellClick(figureColor, position, figureType){
    //clicked on empty
    if(!activeFigure && !figureColor){
        activeFigure = undefined;
        return;
    }
    //selected a figure
    if (!activeFigure) {
        activeFigure = {color:figureColor, position, type: figureType};
        setAvailableMoves();
    }
    //chose a new position
    else {
        store.dispatch({type: 'MOVE_FIGURE', position: activeFigure.position, newPosition: position});
        activeFigure = undefined;
    }
}

let activeFigure = undefined; 
DrawBoard(store.getState());
store.subscribe(() => {DrawBoard(store.getState())});