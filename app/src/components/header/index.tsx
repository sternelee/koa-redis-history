import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
            <div class={style.inner}>
                <h1>PA 同步你的记录</h1>
                <nav>
                    <Link activeClassName={style.active} href="/">
                        Home
                    </Link>
                    {/* <Link activeClassName={style.active} href="/me">
                        Me
                    </Link> */}
                    {/* <Link activeClassName={style.active} href="/profile/john">
                        John
                    </Link> */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
