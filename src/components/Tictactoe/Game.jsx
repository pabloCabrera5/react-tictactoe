import React from 'react';
//import logo from '../logo.svg';
import '../../assets/styles/index.css';
import Header from './Header';
import Board from './Board';
//import { tsConstructorType } from '@babel/types';
import { connect } from "react-redux";
import { setApi, setApiList } from "../../constants/constants";
import {
  playPosition, newPlayer, resetGame,
  fetchState, saveGame, existName, getUri
} from '../../reducers/actions';
// let p = require('../../constants/constants');


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { player_name: "", name_game: "" };
    this.appClick = this.appClick.bind(this);
    this.reset = this.reset.bind(this);
    this.handlePlayerInputChange = this.handlePlayerInputChange.bind(this);
    this.handlePlayerSubmit = this.handlePlayerSubmit.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.handleGameSubmit = this.handleGameSubmit.bind(this);
    this.handleGameName = this.handleGameName.bind(this);
    console.log('APPPP');
  }

  appClick(rowIndex, columIndex) {
    console.log('click')
    this.props.dispatch(playPosition(rowIndex, columIndex, this.props.turn, this.props.movements));
  }
  componentDidMount() {
    console.log(this.props.router)
    console.log(this.props.uri)
    console.log('*******')
    if (this.props.continue) {
      let uri = (this.props.router.split('/')[2] || undefined );
      console.log(uri)
      this.props.dispatch(fetchState(getUri(uri)));
    } else {
      // we set also the name player to '' otherwise in the render it will take as if it already have a name so we cant put a new name
      this.props.dispatch(newPlayer(''));
      // to reset the game
      this.props.dispatch(resetGame());
    }
  }
  handlePlayerSubmit(event) {
    console.log('Submiting value. ' + this.state.player_name);
    event.preventDefault();
    this.props.dispatch(newPlayer(this.state.player_name))
  }
  handlePlayerInputChange(event) {
    this.setState({ player_name: event.target.value });
  }

  async handleGameSubmit(event) {
    console.log('Submiting value. ' + this.state.name_game);
    event.preventDefault();
    if (!existName(this.state.name_game)) {
      await this.saveGame();
      alert('Your game have been saved');
    } else {
      alert('Sorry the choosen name already exist. Please type another')
    }
  }
  handleGameName(event) {
    this.setState({ name_game: event.target.value });
  }

  reset() {
    console.log('Reeeeeeeeset');
    this.props.dispatch(resetGame());
  }

  async saveGame() {
    let jsonSave = {
      values: this.props.values,
      turn: this.props.turn,
      player_name: this.state.player_name || this.props.player_name
    }
    console.log(jsonSave)
    let uri = await saveGame(jsonSave);
    console.log(uri);
    setApi(uri.uri, this.state.name_game);
    setApiList(uri.uri, this.state.name_game);
  }

  render() {
    console.log('in render :', this.state, this.props.player_name)
    if (this.props.fetch.fetching) {
      return <div className="loader"></div>;
    } else if (this.props.fetch.fetching === false && this.props.fetch.error) {
      console.log(this.props.fetch.error);
      return <h3> Error getting from server</h3>;
    } else {
      if (this.props.player_name !== "") {
        let text = "Turn of " + this.props.turn;
        let welcome_text = `Welcome ${this.props.player_name}`
        return (
          <div>
            <Header textt={text} welcome_text={welcome_text}>
            </Header>
            <Board appClick={this.appClick} values={this.props.values}>
            </Board>
            <p>Number of movements: {this.props.movements}</p>
            <button onClick={this.reset}>RESET</button>

            <form onSubmit={this.handleGameSubmit}>
              <label>
                Introduce your name game:
            <input type="text" value={this.state.name_game} onChange={this.handleGameName} />
                <input className="save" type="submit" value="SAVE GAME" />
              </label>
            </form>
            <button onClick={this.saveGame}>SAVE GAME</button>
          </div>
        );
      } else {
        return (<header>
          <form onSubmit={this.handlePlayerSubmit}>
            <label>
              Introduce player name:
            <input type="text" value={this.state.player_name} onChange={this.handlePlayerInputChange} />
              <input className="submit" type="submit" value="Submit" />
            </label>
          </form>
        </header>)
      }
    }
  }
}

//this function map the state to  props
function mapStateToProps(state) {
  console.log('mapstatetoprops')
  return {
    values: state.values,
    turn: state.turn,
    movements: state.movements,
    fetch: state.fetch,
    player_name: state.player_name,
    router: state.router.location.pathname
  }
};

//we export our App as a param
export default connect(mapStateToProps)(Game);
//export default App;
