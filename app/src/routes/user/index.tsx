import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";

interface Props {
    user: string;
}

const User: FunctionalComponent<Props> = (props: Props) => {
    const { user } = props;
    const [list, setList] = useState<any>(["这是一条记录"]);
    const [txt, setTxt] = useState<any>('')

    const fetchData = () => {
        fetch("/get?uid=" + user)
            .then(res => res.json())
            .then(list => {
                setList(list);
            });
    };

    const postData = (val: string) => {
        fetch("/post", {
            method: "POST",
            body: JSON.stringify({
                uid: user,
                val
            })
        });
    };

    const pasteEvent = (event: any) => {
        console.log("event", event);
        const data = event.clipboardData;
        // const items = event.clipboardData && event.clipboardData.items;
        // let file = null;
        console.log(event.clipboardData);
        if (data) {
            const txt = event.clipboardData.getData("text/plain");
            console.log(txt);
            if (txt) {
                postData(txt);
            }
        }
        // console.log(event.clipboardData.getData("text/plain"));
        // if (items && items.length) {
        //     // 检索剪切板items
        //     for (let i = 0; i < items.length; i++) {
        //         console.log(items[i]);
        //         if (items[i].type.indexOf("image") !== -1) {
        //             file = items[i].getAsFile();
        //             break;
        //         }
        //     }
        // }
    };

    // gets called when this route is navigated to
    useEffect(() => {
        fetchData();
        document.addEventListener("paste", pasteEvent);
    }, []);

    return (
        <div class={style.profile}>
            <h1>用户: {user}</h1>
            <input
                type="text"
                value={txt}
                onChange={(e: any) => setTxt(e.target.value)}
                onKeyUp={(e: any) => e.keyCode === 13 && postData(txt)}
            />
            <ul>
                {list.map((v: any, index: number) => {
                    return <li key={index}>{v}</li>;
                })}
            </ul>
        </div>
    );
};

export default User;
