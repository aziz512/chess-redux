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

const letterToNum = (letter) => {
    const letters = 'abcdefgh';
    return letters.indexOf(letter) + 1;
};

export {defaultState, numToLetter, letterToNum};