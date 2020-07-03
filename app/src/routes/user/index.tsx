import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";

interface Props {
    user: string;
}

const User: FunctionalComponent<Props> = (props: Props) => {
    const { user } = props;
    const [time, setTime] = useState<number>(Date.now());
    const [count, setCount] = useState<number>(0);
    const [list, setList] = useState<any>(["这是一条记录"]);

    const fetchData = () => {
        fetch("http://pa.leeapps.cn/get?uid=" + user).then(list => {
            console.log(list);
            setList(list);
        });
    };
    // gets called when this route is navigated to
    useEffect(() => {
        // const timer = window.setInterval(() => setTime(Date.now()), 1000);
        fetchData();

        // gets called just before navigating away from the route
        // return () => {
        //     clearInterval(timer);
        // };
    }, []);

    // update the current time
    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div class={style.profile}>
            <h1>用户: {user}</h1>
            <ul>
                {list.map((v: any, index: number) => {
                    return <li key={index}>{v}</li>;
                })}
            </ul>
        </div>
    );
};

export default User;
