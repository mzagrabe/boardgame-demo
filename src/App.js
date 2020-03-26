// eslint-disable-next-line
import React from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import { Client } from 'boardgame.io/react';

class TicTacToeBoard extends React.Component {
    onClick(id) {
        if (this.isActive(id)) {
            this.props.moves.clickCell(id);
            this.props.events.endTurn();
        }
    }

    isActive(id) {
        if (!this.props.isActive) return false;
        if (this.props.G.cells[id] !== null) return false;
        return true;
    }

    render() {
        let winner = '';

        if (this.props.ctx.gameover) {
            winner =
                this.props.ctx.gameover.winner !== undefined
                ? (<div id="winner">Winner: {this.props.ctx.gameover.winner}</div>)
                : (<div id="winner">Draw!</div>)
            ;
        }

        const cellStyle = {
            border:     '1px solid #555',
            width:      '50px',
            height:     '50px',
            lineHeight: '50px',
            textAlign:  'center',

        };

        let tbody = [];
        for (let i = 0; i < 3; i++) {
            let cells = [];
            for (let j = 0; j < 3; j++) {
                const id = 3 * i + j;
                cells.push(
                    <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
                        {this.props.G.cells[id]}
                    </td>
                );
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        return (
            <div>
                <table id="board">
                    <tbody>{tbody}</tbody>
                </table>
                {winner}
            </div>
        );
    }
}

function IsVictory(cells) {
    return true;
}

/*
function IsVictory(cells) {
    const positions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const isRowComplete = row => {
        const symbols = row.map(i => cells[i]);
        return symbols.every(i => i !== null && i === symbols[0]);
    };

    return positions.map(isRowComplete).some(i => i === true);
}
*/

function IsDraw(cells) {
    // eslint-disable-next-line
    return cells.filter(c => c === null).length == 0;
}

const TicTacToe = {
    setup: () => ({ cells: Array(9).fill(null) }),
    moves: {
        clickCell: (G, ctx, id) => {
            G.cells[id] = ctx.currentPlayer;
        },
    },

    endIf: (G, ctx) => {
        if (IsVictory(G.cells)) {
            return {
                winner: ctx.currentPlayer
            };
        }
        if (IsDraw(G.cells)) {
            return {
                draw: true
            };
        }
    },
};

const App = Client(
    {
        game: TicTacToe,
        board: TicTacToeBoard,
    }
);

export default App;
