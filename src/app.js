import {createStore, combineReducers} from 'redux';
import $ from 'jquery';
import {defaultState, numToLetter, letterToNum, arrayPositionToString} from './drawBoard';



const DrawBoard = (state) => {
    $('table').empty();
    let templateRow = $('<tr/>');
    let templateCell = $('<td/>');
    templateCell.addClass('cell');
    
    for (let index = 8; index > 0; index--) {
        let row = templateRow.clone();
        for (let cellIndex = 1; cellIndex < 9; cellIndex++) {
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
    let figures = state.figures; 
    figures.forEach((figure, index)=>{
        let figureImg = $('<img/>').attr('src','img/' + figure.color+'-'+figure.name + '.png').addClass('figure');
        let cell = $('.' + figure.position);
        cell.attr('data-color', figure.color);
        cell.attr('data-name', figure.name);
        $('.' + figure.position).append(figureImg);
    });

    $('.cell').click(function(){
        let figureColor = $(this).data('color');
        let figurePosition = $(this).data('position');
        let figureType = $(this).data('name');
        cellClick(figureColor, figurePosition, figureType);
    });
};


const activeFigure = (state = {turn:'white'}, action) =>{
  switch (action.type) {
      case 'CHANGE_ACTIVE_FIGURE':
          return {...state, color:action.color, position: action.position, type: action.figureType};
      case 'SET_AVAILABLE_MOVES':
          return {...state, moves: action.moves};
      case 'CHANGE_TURN':
          return {...state, turn: state.turn === 'white' ? 'black':'white'};
      case 'FIGURE_UNSELECTED':
          return {turn: state.turn};
      default:
          return state;
  }  
};
const figures = (state = defaultState(), action) => {
    switch (action.type) {
        case 'MOVE_FIGURE':
            let newState = Object.assign(state);
            newState.forEach((figure,index) => {
                if(figure.position === action.position){
                    figure.position = action.newPosition;
                }
                else if(figure.position === action.newPosition){
                    newState.splice(index,1);
                }
            });
            return newState;
        default:
            return state;
    }
};

const reducer = combineReducers({activeFigure, figures});

let store = createStore(reducer);
console.log(store.getState());


function setAvailableMoves(){
    if (store.getState().activeFigure.position) {
        switch (store.getState().activeFigure.type) {
            case 'pawn':
                let positionletterNum = letterToNum(store.getState().activeFigure.position[0]);
                let positionNum = Number(store.getState().activeFigure.position[1]);
                let moveDirection;
                if (store.getState().activeFigure.color === 'white') {
                    moveDirection = +1;
                }
                else{
                    moveDirection = -1;
                }
                let moves = [[positionletterNum, positionNum+moveDirection], [positionletterNum+1, positionNum+moveDirection], [positionletterNum-1, positionNum+moveDirection]];
                moves = moves.map((object, index)=>{
                    let stringPosition = arrayPositionToString(object);
                    if (store.getState().figures.some(item => item.position === stringPosition)) {
                        var figure = store.getState().figures.filter(element => element.position === stringPosition)[0];
                        if (figure) {
                            if (figure.color === store.getState().activeFigure.color || figure.position[0] === store.getState().activeFigure.position[0]) {
                                return;
                            }   
                        }
                    }
                    else if(store.getState().activeFigure.position[0] != stringPosition[0]){
                        return;
                    }
                    return stringPosition;
                });
                store.dispatch({type: 'SET_AVAILABLE_MOVES', moves});
                console.log(store.getState().activeFigure.moves);
            default:
                break;
        }
    }
}

const highlightMoves = () => {
    store.getState().activeFigure.moves.forEach((move, index)=>{
        $('.' + move).addClass('availableMove');
    });
}

function cellClick(figureColor, position, figureType){
    //clicked on empty cell
    if(!store.getState().activeFigure.position && !figureColor){
        store.dispatch({type: 'FIGURE_UNSELECTED'});
        return;
    }
    //selected a figure
    if (!store.getState().activeFigure.position) {
        if (figureColor === store.getState().activeFigure.turn) {
            store.dispatch(
                {type: 'CHANGE_ACTIVE_FIGURE',
                 color: figureColor,
                 figureType,
                 position
            });
            setAvailableMoves();
            highlightMoves();
        }
    }
    //chose a new position
    else {
        if (store.getState().activeFigure.moves.some(move => move === position)) {
            store.dispatch({type: 'MOVE_FIGURE', position: store.getState().activeFigure.position, newPosition: position});
            store.dispatch({type: 'CHANGE_TURN'});
            console.log('turn of '+ store.getState().turn);
            store.dispatch({type: 'FIGURE_UNSELECTED'});
        }
        else if (figureColor === store.getState().activeFigure.color) {
            store.dispatch(
                {type: 'CHANGE_ACTIVE_FIGURE',
                 color: figureColor,
                 figureType,
                 position
            });
            setAvailableMoves();
            highlightMoves();
        }
    }
}

DrawBoard(store.getState());
store.subscribe(() => {DrawBoard(store.getState())});
store.subscribe(() => {console.log(store.getState())});