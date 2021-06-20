import React, { Component } from 'react';
import axios from 'axios';

export default class JokeList extends Component {
  static defaultProps = {
    jokeStart: 10
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }
  async componentDidMount() {
    let joke = await axios.get('https://icanhazdadjoke.com/', {
      headers: { Accept: "application/json" }
    });
  }
  render() {
    return (
      <div>
        <h1>Bad Jokes</h1>
      </div>
    )
  }
}
