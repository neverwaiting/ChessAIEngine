import { _decorator, assetManager, Component, EventTouch, Node, Sprite, SpriteFrame } from 'cc';
import { PIECE_NAME_STRING, PieceType } from './Common';
import { SidePlayer } from './SidePlayer';
import { Board } from './Board';
import { SpriteFrameCache } from './SpriteFrameCache';
const { ccclass, property } = _decorator;


@ccclass('Piece')
export class Piece extends Component {
    type: PieceType
    solt: number
    sidePlayer: SidePlayer
    pieceName: string
    board: Board

    changeTexture() {
        this.node.getComponent(Sprite).spriteFrame =
            SpriteFrameCache.getInstance().getPieceSpriteFrame(this.type, this.sidePlayer.side)
    }

    init(board: Board, type: PieceType, solt: number, sidePlayer: SidePlayer) {
        this.board = board
        this.type = type
        this.solt = solt
        this.sidePlayer = sidePlayer
        this.pieceName = PIECE_NAME_STRING[sidePlayer.side][type]
        this.changeTexture()
    }
}
