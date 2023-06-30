import { Board } from "./Board"

enum ProtocolType {
    GAME_START_REQUEST = 1,
    GET_ENGINES_REQUEST = 2,
    GET_ENGINES_RESPONSE = 3,

    START = 4, // { red: { number }, black: { number }}
    MOVE = 5, // { mv: string, over: true }
}

class Package {
    type: number
    data: any
}

export class Net {
    websocket: WebSocket
    board: Board

    // protocol

    public static self: Net = null

    public static getInstance() {
        if (this.self == null) {
            this.self = new Net()
        }
        return this.self
    }

    constructor() {
        this.websocket = new WebSocket('ws://192.168.69.199:9948/test_websocket')
        this.websocket.onopen = this.onOpen.bind(this)
        this.websocket.onmessage = this.onMessage.bind(this)
        this.websocket.onclose = this.onClose.bind(this)
        this.websocket.onerror = this.onError.bind(this)
    }

    onOpen(event: Event) {
        console.log('ws connection open', event)
        this.sendGameStartReq()
    }

    onMessage(event: MessageEvent) {
        let message = JSON.parse(event.data)
        console.log('message:', message)
        this.handlePackage(message)
    }

    onError(event: Event) {
        console.log('ws connection error', event)
    }

    onClose(event: CloseEvent) {
        console.log('ws connection close', event.reason)
    }

    handlePackage(message: Package) {
        if (message.type == ProtocolType.MOVE) {
            if (!this.board) return
            this.board.playIccsMove(message.data["mv"])
        }
    }

    sendPackage(message: Package) {
        let data = JSON.stringify(message)
        this.websocket.send(data)
    }

    sendGameStartReq() {
        let pack = {
            type: ProtocolType.GAME_START_REQUEST,
            data: null
        }
        this.sendPackage(pack)
    }

    sendGetEnginesReq() {
        let pack = {
            type: ProtocolType.GET_ENGINES_REQUEST,
            data: null
        }
        this.sendPackage(pack)
    }
}


