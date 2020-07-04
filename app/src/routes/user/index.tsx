import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import { copyToClipboard } from "../../utils";

interface Props {
    user: string;
}

const User: FunctionalComponent<Props> = (props: Props) => {
    const { user } = props;
    const [list, setList] = useState<any>([]);
    const [txt, setTxt] = useState<any>("");

    const fetchData = (): void => {
        fetch("/get?uid=" + user)
            .then(res => res.json())
            .then(list => {
                setList(list);
            })
            .catch(err => console.log(err));
    };

    const postData = (val: string): void => {
        fetch("/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: user,
                val
            })
        })
            .then(() => {
                setTxt("");
                setList([val, ...list]);
            })
            .catch(err => console.log(err));
    };

    const pasteEvent = (event: any): void => {
        console.log("event", event);
        const data = event.clipboardData;
        // const items = event.clipboardData && event.clipboardData.items;
        // let file = null;
        if (data) {
            const txt = event.clipboardData.getData("text/plain");
            console.log(txt);
            if (txt && txt.length < 1000) {
                postData(txt);
            }
        }
        // if (items && items.length) {
        //     console.log(items);
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

    const dropEvent = (event: any): void => {
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            const img = files[i];
            console.log(img);
            if (img.type.indexOf("image") < 0 || img.size > 1024 * 512)
                continue;
            const reader = new FileReader();
            reader.onload = function(e): void {
                const data = e.target && e.target.result;
                console.log(data);
                data && postData(String(data));
            };
            reader.readAsDataURL(files[i]);
        }
    };

    // gets called when this route is navigated to
    useEffect(() => {
        fetchData();
        document.addEventListener("paste", pasteEvent);
        document.addEventListener("drop", dropEvent);
    }, []);

    const copyData = (str: string): void => {
        copyToClipboard(str);
    };

    return (
        <div class={style.profile}>
            <h2>欢迎您: {user}</h2>
            <p>
                <input
                    class={style.input}
                    placeholder="输入文字并回车，或拖入图片"
                    type="text"
                    value={txt}
                    onChange={(e: any) => setTxt(e.target.value)}
                    onKeyUp={(e: any) => e.keyCode === 13 && postData(txt)}
                />
            </p>

            <ul>
                {list.map((v: any, index: number) => {
                    return (
                        <li key={index} onClick={() => copyData(v)}>
                            {v.indexOf("data") !== 0 ? v : <img src={v} />}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default User;
