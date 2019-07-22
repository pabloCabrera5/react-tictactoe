import React from 'react';
import { NavLink } from 'react-router-dom'

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <h1>Welcome to TICTATOE</h1>
                <nav>
                    <NavLink exact to='/'> HOME</NavLink>
                    <NavLink exact to='/new'> NEW GAME</NavLink>
                    <NavLink exact to='/continue'> CONTINUE</NavLink>
                    <NavLink exact to='/savedGames' pep='pepep'> SAVED GAMES</NavLink>
                </nav>
            </header>
        );
    }
}