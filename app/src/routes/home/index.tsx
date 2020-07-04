import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h4>快速创建您的同步列表</h4>
            <h4>仅需在地址上加上您的路由ID</h4>
            <h5>
                比如访问 <i>http://pa.leeapps.cn/pa</i>
            </h5>
            <br />
            <h4>操作方式说明：</h4>
            <h4>方法1：在输入框输入内容后回车；</h4>
            <h4>方法2：在页面上按 键盘 Ctrl + V </h4>
            <h4>方法3：拖动图片到输入框即可(最大512K)</h4>
            <br />
            <h3>点击列表条目即可复印！</h3>
            <br />
            <h5>注意：每条记录1个小时后失效</h5>
            <br />
            <h5>bug：插入图片后，原列表会被清空，此时刷新即可</h5>
        </div>
    );
};

export default Home;
