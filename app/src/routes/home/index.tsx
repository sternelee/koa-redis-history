import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h3>快速创建您的同步列表,仅需在地址上加上您的路由ID</h3>
            <p>比如访问 http://pa.leeapps.cn/li </p>
            <br />
            <h4>在页面上按 键盘 Ctrl + V , 即可增加记录</h4>
            <p>每条记录1小时间失效</p>
        </div>
    );
};

export default Home;
