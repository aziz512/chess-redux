import {createStore} from 'redux';
import $ from 'jquery';

function defaultState(){
    var figures = [
        {
            name:'queen',
            position:'d1',
            color:'white'
        },
        {
            name:'king',
            color:'white',
            position:'e1'
        },
        {
            name:'bishop',
            color:'white',
            position:'f1'
        },
        {
            name:'bishop',
            color:'white',
            position:'c1'
        },
        {
            name:'knight',
            color:'white',
            position:'b1'
        },
        {
            name:'knight',
            color:'white',
            position:'g1'
        },
        {
            name:'rook',
            color:'white',
            position:'h1'
        },
        {
            name:'rook',
            color:'white',
            position:'a1'
        },
        {
            name: 'pawn',
            color:'white',
            position:'a2'
        },
        {
            name: 'pawn',
            color:'white',
            position:'b2'
        },
        {
            name: 'pawn',
            color:'white',
            position:'c2'
        },
        {
            name: 'pawn',
            color:'white',
            position:'d2'
        },
        {
            name: 'pawn',
            color:'white',
            position:'e2'
        },
        {
            name: 'pawn',
            color:'white',
            position:'f2'
        },
        {
            name: 'pawn',
            color:'white',
            position:'g2'
        },
        {
            name: 'pawn',
            color:'white',
            position:'h2'
        },
        {
            name:'queen',
            color:'black',
            position:'d8'
        },
        {
            name:'king',
            color:'black',
            position:'e8'
        },
        {
            name:'bishop',
            color:'black',
            position:'f8'
        },
        {
            name:'bishop',
            color:'black',
            position:'c8'
        },
        {
            name:'knight',
            color:'black',
            position:'b8'
        },
        {
            name:'knight',
            color:'black',
            position:'g8'
        },
        {
            name:'rook',
            color:'black',
            position:'h8'
        },
        {
            name:'rook',
            color:'black',
            position:'a8'
        },
        {
            name: 'pawn',
            color:'black',
            position:'a7'
        },
        {
            name: 'pawn',
            color:'black',
            position:'b7'
        },
        {
            name: 'pawn',
            color:'black',
            position:'c7'
        },
        {
            name: 'pawn',
            color:'black',
            position:'d7'
        },
        {
            name: 'pawn',
            color:'black',
            position:'e7'
        },
        {
            name: 'pawn',
            color:'black',
            position:'f7'
        },
        {
            name: 'pawn',
            color:'black',
            position:'g7'
        },
        {
            name: 'pawn',
            color:'black',
            position:'h7'
        }
    ];
    return {figures, turnOfWhite: true};
}

const numToLetter = (num) => {
    var table = {
        1:'a',
        2:'b',
        3:'c',
        4:'d',
        5:'e',
        6:'f',
        7:'g',
        8:'h',
    };
    return table[num];
};

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
        $('.cell').click(function(){
                var figureColor = $(this).data('color');
                var figurePosition = $(this).data('position');
                var figureType = $(this).data('name');
                cellClick(figureColor, figurePosition, figureType);
        });
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


function cellClick(figureColor, position, figureType){
    if(!activeFigure && !figureColor){
        activeFigure = undefined;
        return;
    }
    if (!activeFigure) {
        activeFigure = {figureColor, position, figureType};
        console.log(activeFigure);
    }
    else {
        store.dispatch({type: 'MOVE_FIGURE', position: activeFigure.position, newPosition: position});
        activeFigure = undefined;
    }
}

let activeFigure = undefined; 
DrawBoard(store.getState());
store.subscribe(() => {DrawBoard(store.getState())});
