import { Board } from "./Board";
import { SIDE_TYPE_BLACK, SIDE_TYPE_RED } from "./Common";
import { getPieceType, getSoltByRankAndFile } from "./Util";

function isBetween(c: string, min: string, max: string) {
    return c >= min && c <= max
}

function isNumber(c: string) {
    return isBetween(c, '0', '9');
}

function isLowerAlpha(c: string) {
    return isBetween(c, 'a', 'z');
}

function isUpperAlpha(c: string) {
    return isBetween(c, 'A', 'Z');
}

function isAlpha(c: string) {
    return isLowerAlpha(c) || isUpperAlpha(c);
}

export class FenParser {
    board: Board

    constructor(board: Board) {
        this.board = board
    } 

    initPiecesFromFen(fen: string) {
        let row = 0
        let col = 0

        for (let i = 0, len = fen.length; i < len; ++i) {
            let c = fen[i]
            if (isNumber(c)) {
                col += (fen.charCodeAt(i) - '0'.charCodeAt(0))
            } else if (isAlpha(c)) {
                let side = isLowerAlpha(c) ? SIDE_TYPE_BLACK : SIDE_TYPE_RED
                let type = getPieceType(c)
                let solt = getSoltByRankAndFile(row, col)
                this.board.createPiece(type, side, solt)
                ++col
            } else if (c == '/') {
                ++row
                col = 0
            } else if (c == ' ') {
                break
            }
        }

        if (fen[fen.length - 1] == 'b')
            return SIDE_TYPE_BLACK
        else
            return SIDE_TYPE_RED
    }
}


