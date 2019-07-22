import React from 'react';
import { APILIST } from "../../constants/constants";
import { Link } from "react-router-dom";


export default class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {APILIST};
        this.load = this.load.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }
    load(el){
        console.log('load');
        this.props.loadGame(el.uri);
    }
    delete(el){
        console.log('delete');
        let pos;
        APILIST.forEach((ele, index) => {
            if(el.name === ele.name){
                pos = index;
            }
        })
        APILIST.splice(pos, 1);
        this.setState(APILIST);
    }
    deleteAll(){
        APILIST.splice(0, APILIST.length);
        this.setState(APILIST);
    }

    render() {
        //let keys = Object.keys(APILIST)
        return (
        <div>
            {APILIST.map((el,index) => {
                return <div key={"item" + index}>
                {el.name} : 
                <Link to={`/continue/${el.name}`} pepe='pepe' > CONTINUE </Link> 
                <button onClick={() => this.delete(el)}> DELETE </button>
                </div>
            })}
            <button onClick={() => this.deleteAll()}> DELETE ALL</button>
        </div>
        );
    }
}