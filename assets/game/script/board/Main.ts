import { _decorator, Component, Node, SpriteComponent } from 'cc';
import { SpriteFrameCache } from './SpriteFrameCache';
import { Net } from './Net';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    protected onLoad(): void {
        this.initCacheMgr()
        Net.getInstance()
    }

    async initCacheMgr() {
        await SpriteFrameCache.getInstance().init()
        this.node.getChildByName('board').active = true
    }
}


