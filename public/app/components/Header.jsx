import React from 'react';
import logo from '../../assets/logo.png';

export class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="navbar-brand logo">
                        <img className="d-inline-block align-top logo__img"
                             src={logo}
                             width="200" height="200"
                             alt="block.io logo"/>
                    </div>
                    <div className="header__title">
                        <h1 className="title">
                            Moving blocks rocks!
                        </h1>
                        <span>v0.0.1-alpha</span>
                    </div>
                    <a href="">
                        <img className="github-icon"
                             src="https://image.flaticon.com/icons/svg/25/25231.svg"
                             alt="github link"
                             width="32"
                             height="32"/>
                    </a>
                </nav>
            </header>
        )
    }
}
