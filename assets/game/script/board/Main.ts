import { _decorator, Component, Node, SpriteComponent } from 'cc';
import { SpriteFrameCache } from './SpriteFrameCache';
import { Net } from './Net';
import { Board } from './Board';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    protected onLoad(): void {
        this.initCacheMgr()
    }

    async initCacheMgr() {
        await SpriteFrameCache.getInstance().init()
        this.node.getChildByName('board').active = true
        Net.getInstance().board = this.node.getChildByName('board').getComponent(Board)
    }
}


