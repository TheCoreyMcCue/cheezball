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
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false
    };
    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
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
      let newJoke = res.data.joke;
      if (!this.seenJokes.has(newJoke)){
        jokes.push({ id: uuidv4(), text: newJoke, votes: 0 });
      } else {
        console.log("duplicate detected!!");
        console.log(newJoke);
      }
    }
    this.setState(st => ({
      loading: false,
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
    this.setState({ loading: true }, this.getJokes);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList-loader">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h2 className="JokeList-title">Loading New Jokes...</h2>
        </div>
      )
    }
    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes)
    return (
      <div className="JokeList">
        <div className="JokeList-side">
          <h1 className="JokeList-title"><span>Timm</span> Jokes</h1>
          <img src={cry} alt="" />
          <button className="JokeList-new-jokes" onClick={this.handleClick}>Get More Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {jokes.map(j => (
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
