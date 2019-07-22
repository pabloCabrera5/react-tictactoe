import React from 'react';
import { Route } from "react-router-dom";
import Game from './Tictactoe/Game';
import Home from './Home';
import SavedGames from './Tictactoe/SavedGames'

export default class Main extends React.Component {
    render() {
        return (
            <section>
                <Route exact path='/' component={Home} />
                <Route path='/new' component={Game} />
                <Route exact path='/continue/(:id)' component={() => <Game continue={false}/>} />
                <Route path='/continue' component={() => <Game continue={true} />} />
                <Route path='/savedGames' component={SavedGames} />
            </section>)
    }
}
// this.props.routeParams.page.

// <Route exact path='/continue/:id' component={() => <Game continue={false}/>} />