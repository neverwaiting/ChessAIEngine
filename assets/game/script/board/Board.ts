import { _decorator, Component, EventTouch, instantiate, Node, Prefab, UITransform, v3, Vec3 } from 'cc';
import { Piece } from './Piece';
import { getFileOfSolt, getRankOfSolt, getSoltByRankAndFile } from './Util';
import { PieceType, SIDE_TYPE_BLACK, SIDE_TYPE_RED, SideType } from './Common';
import { SidePlayer } from './SidePlayer';
import { FenParser } from './FenParser';
import { Config } from './Config';
import { SpriteFrameCache } from './SpriteFrameCache';
const { ccclass, property } = _decorator;

@ccclass('Board')
export class Board extends Component {
    @property(Node)
    leftTopPoint: Node = null
    @property(Node)
    leftTopPoint1: Node = null
    @property(Prefab)
    piecePrefab: Prefab = null
    @property(Node)
    lastTrackStart: Node = null
    @property(Node)
    lastTrackEnd: Node = null
    @property(Node)
    selectBox: Node = null

    squareSize: number = 56

    fenParser: FenParser
    pieces: Array<Piece> = new Array<Piece>(256).fill(null)
    redSidePlayer: SidePlayer
    blackSidePlayer: SidePlayer
    curSidePlayer: SidePlayer
    selectedPiece: Piece | null = null

    prompt: boolean = false

    protected onLoad(): void {
        this.init()
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
    }

    init() {
        // this.testAlphaNumber()
        this.fenParser = new FenParser(this)
        this.initSquareSize()
        this.showLastTrackNodes(false)
        this.showSelectBox(false)
        this.initSidePlayers()
        this.initPieces()
    }

    initSidePlayers() {
        this.redSidePlayer = new SidePlayer(SIDE_TYPE_RED)
        this.blackSidePlayer = new SidePlayer(SIDE_TYPE_BLACK)
    }

    initSquareSize() {
        let size = Math.abs(this.leftTopPoint.position.x - this.leftTopPoint1.position.x)
        this.squareSize = size
    }

    showLastTrackNodes(on: boolean) {
        this.lastTrackStart.active = on
        this.lastTrackEnd.active = on
    }

    showSelectBox(on: boolean) {
        this.selectBox.active = on
        if (on && this.selectedPiece) {
            this.selectBox.setPosition(this.selectedPiece.node.getPosition())
        } else {
            this.selectedPiece = null
        }
    }

    initPieces() {
        let side = this.fenParser.initPiecesFromFen(Config.INIT_FEN_STRING)
        this.curSidePlayer = side == SIDE_TYPE_RED ? this.redSidePlayer : this.blackSidePlayer
    }

    testAlphaNumber() {
        let i = '1'
        let a = 'c'
        let b = 'C'
        console.log(i >= '0' && i <= '9')
        console.log(i >= 'a' && i <= 'z')
        console.log(i >= 'A' && i <= 'Z')
        console.log(a >= '0' && a <= '9')
        console.log(a >= 'a' && a <= 'z')
        console.log(a >= 'A' && a <= 'Z')
        console.log(b >= '0' && b <= '9')
        console.log(b >= 'a' && b <= 'z')
        console.log(b >= 'A' && b <= 'Z')
    }

    convertToNodePos(solt: number) {
        let rank = getRankOfSolt(solt)
        let file = getFileOfSolt(solt)
        let pos = v3()
        pos.x = this.leftTopPoint.position.x + file * this.squareSize
        pos.y = this.leftTopPoint.position.y - rank * this.squareSize
        return pos
    }

    isValidClick(nodePos: Vec3) {
        let minX = this.leftTopPoint.position.x - this.squareSize / 2
        let maxX = this.leftTopPoint.position.x + this.squareSize * 9 + this.squareSize / 2
        let minY = this.leftTopPoint.position.y - this.squareSize * 10 - this.squareSize / 2
        let maxY = this.leftTopPoint.position.y + this.squareSize / 2
        return nodePos.x >= minX && nodePos.x <= maxX &&
               nodePos.y >= minY && nodePos.y <= maxY
    }

    convertToSolt(nodePos: Vec3) {
        let rank = Math.floor((this.leftTopPoint.position.y - nodePos.y + this.squareSize / 2) / this.squareSize)
        let file = Math.floor((nodePos.x - this.leftTopPoint.position.x + this.squareSize / 2) / this.squareSize)
        console.log(rank, file)
        return getSoltByRankAndFile(rank, file)
    }

    createPiece(pieceType: PieceType, sideType: SideType, solt: number) {
        let pieceNode = instantiate(this.piecePrefab)
        let piece = pieceNode.getComponent(Piece)
        let sidePlayer = sideType == SIDE_TYPE_RED ? this.redSidePlayer : this.blackSidePlayer
        piece.init(this, pieceType, solt, sidePlayer)
        pieceNode.setPosition(this.convertToNodePos(solt))
        this.node.addChild(pieceNode)
        this.pieces[solt] = piece
    }

    onTouchEnd(event: EventTouch) {
        let loc = event.getUILocation()
        let pos = this.node.getComponent(UITransform).convertToNodeSpaceAR(v3(loc.x, loc.y, 0))
        if (!this.isValidClick(pos)) return
        let solt = this.convertToSolt(pos)
        this.click(solt)
    }

    click(solt: number) {
        console.log(solt)
        if (!this.selectedPiece) {
            this.selectedPiece = this.pieces[solt]
            this.showSelectBox(true)
        } else {
            if (this.selectedPiece.solt == solt) {
                this.showSelectBox(false)
            } else {
                if (this.isSameSidePiece(this.selectedPiece, this.pieces[solt])) {
                    this.selectedPiece = this.pieces[solt]
                    this.showSelectBox(true)
                } else {
                    this.movePiece(this.selectedPiece, solt)
                }
            }
        }
    }

    movePiece(piece: Piece, dest: number) {

    }

    isSameSidePiece(pieceA: Piece, pieceB: Piece) {
        return pieceA && pieceB && pieceA.sidePlayer.side == pieceB.sidePlayer.side
    }
}
