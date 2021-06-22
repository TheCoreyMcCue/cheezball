import React, { Component } from 'react';
import axios from 'axios';
import cry from '../../assets/cry.svg';
import './JokeList.css';

export default class JokeList extends Component {
  static defaultProps = {
    jokeStart: 10
  };

  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  };

  async componentDidMount() {
    let jokes = [];
    while (jokes.length < this.props.jokeStart) {
      let res = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: "application/json" }
      });
      jokes.push(res.data.joke);
    }
    this.setState({ jokes: jokes });
  };

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-side">
          <h1 className="JokeList-title"><span>Bad</span> Jokes</h1>
          <img src={cry} alt="" />
          <button className="JokeList-new-jokes">New Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map(j => (
            <div>{j}</div>
          ))}
        </div>
      </div>
    )
  }
}
