import { Sprite, SpriteFrame, Texture2D, assetManager } from "cc";
import { PIECE_FEN_STRING, PieceType, SIDE_TYPE_RED, SideType } from "./Common";

const PIECE_DIR = 'texture/pieces'

export class SpriteFrameCache {
    pieceSpriteFrameMap: Map<string, SpriteFrame>
    boardSpriteFrameMap: Map<string, SpriteFrame>

    private static self: SpriteFrameCache = null

    public static getInstance() {
        if (!this.self) this.self = new SpriteFrameCache()
        return this.self
    }

    constructor() {
        this.pieceSpriteFrameMap = new Map<string, SpriteFrame>()
        this.boardSpriteFrameMap = new Map<string, SpriteFrame>()
    }

    public async init() {
        return new Promise((resolve, reject) => {
            assetManager.loadBundle('game', (err, bundle) => {
                bundle.loadDir(PIECE_DIR, SpriteFrame, (err, spriteFrames) => {
                    for (let spriteFrame of spriteFrames) {
                        this.pieceSpriteFrameMap.set(spriteFrame.name, spriteFrame)
                    }
                    console.log(this.pieceSpriteFrameMap)
                    return resolve(0)
                })
            })
        })
    }

    public getPieceSpriteFrame(pieceType: PieceType, side: SideType) {
        let name = (side == SIDE_TYPE_RED ? 'R' : 'B') + PIECE_FEN_STRING[0][pieceType]
        return this.pieceSpriteFrameMap.get(name)
    }
}


