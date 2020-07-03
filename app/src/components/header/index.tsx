import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
            <h1>PA同步您的记录</h1>
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
        </header>
    );
};

export default Header;
