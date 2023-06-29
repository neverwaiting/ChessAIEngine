enum ProtocolType {
    GET_ENGINES_REQUEST = 1,
    GET_ENGINES_RESPONSE = 2,

    START = 3, // { red: { number }, black: { number }}
    MOVE = 4, // { mv: string, over: true }
}

class Package {
    type: number
    data: any
}

export class Net {
    websocket: WebSocket

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
        setInterval(() => {
            this.sendGetEnginesReq()
        }, 1000);
    }

    onMessage(event: MessageEvent) {
        let message = JSON.parse(event.data)
        console.log('message:', message)
    }

    onError(event: Event) {
        console.log('ws connection error', event)
    }

    onClose(event: CloseEvent) {
        console.log('ws connection close', event.reason)
    }

    sendPackage(message: Package) {
        let data = JSON.stringify(message)
        this.websocket.send(data)
    }

    sendGetEnginesReq() {
        let pack = {
            type: ProtocolType.GET_ENGINES_REQUEST,
            data: null
        }
        this.sendPackage(pack)
    }
}


