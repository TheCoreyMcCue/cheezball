import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Joke from '../Joke/Joke';

import cry from '../../assets/cry.svg';
import './JokeList.css';

export default class JokeList extends Component {
  static defaultProps = {
    jokeStart: 10
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")
    };
    this.handleClick = this.handleClick.bind(this);
  };

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  };

  async getJokes() {
    let jokes = [];
    while (jokes.length < this.props.jokeStart) {
      let res = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: "application/json" }
      });
      jokes.push({ id: uuidv4(), text: res.data.joke, votes: 0 });
    }
    this.setState(st => ({
      jokes: [...st.jokes, ...jokes]
    }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)));
  }


  handleVote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j)
    }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  };

  handleClick() {
    this.getJokes();
  }

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-side">
          <h1 className="JokeList-title"><span>Timm</span> Jokes</h1>
          <img src={cry} alt="" />
          <button className="JokeList-new-jokes" onClick={this.handleClick}>Get More Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map(j => (
            <Joke
              votes={j.votes}
              text={j.text}
              key={j.id}
              upvote={() => this.handleVote(j.id, 1)}
              downvote={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    )
  }
}
