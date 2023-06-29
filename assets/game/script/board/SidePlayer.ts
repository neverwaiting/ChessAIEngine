import { PIECE_TYPE_KING, SideType } from "./Common";
import { Piece } from "./Piece";

export class SidePlayer {
    // value: number
    side: SideType
    kingPiece: Piece
    pieces: Array<Piece>

    constructor(sideType: SideType) {
        this.side = sideType
        this.kingPiece = null
        this.pieces = new Array<Piece>()
    }

    addPiece(piece: Piece) {
        if (piece.type == PIECE_TYPE_KING) this.kingPiece = piece
        this.pieces.push(piece)
    }
}


