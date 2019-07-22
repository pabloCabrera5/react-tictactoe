import React from 'react';
//import logo from '../logo.svg';
import '../../assets/styles/index.css';
import { setApiList } from "../../constants/constants";
import { saveGame } from "../../reducers/actions";
import ItemList from "./itemList";

export default class SavedGames extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showGame: false, uri: '' }
        this.loadGame = this.loadGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        console.log(this.props)
    }

    async saveMatch() {
        let jsonSave = {
            values: this.props.values,
            turn: this.props.turn,
            player_name: this.state.player_name
        }
        let uri = await saveGame(jsonSave);
        console.log(uri);
        setApiList(uri.uri);
    }
    loadGame(el) {
        console.log('loading');
        console.log(el);
        this.setState({ showGame: true, uri: el });
    }
    deleteGame(el) {
        console.log('deleting');
    }
    render() {
        /*if (this.state.showGame) {
            return (
                <div>
                    <Game continue={true} uri={this.state.uri}>
                    </Game>
                </div>
            );
        } else {*/
            return (
                <div>
                    <h1>List of games saved:</h1>
                    <ItemList loadGame={this.loadGame} deleteGame={this.deleteGame}>
                    </ItemList>
                </div>
            )
        //}
    }
}
