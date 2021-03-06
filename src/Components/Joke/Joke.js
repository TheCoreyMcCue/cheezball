import React, { Component } from 'react';
import './Joke.css'; 

export default class Joke extends Component {

  getColor() {
    if (this.props.votes >= 10) {
      return "#006400";
    } else if (this.props.votes >= 7) {
      return "#38b000"
    } else if (this.props.votes >= 5) {
      return "#ccff33"
    } else if (this.props.votes >= 3) {
      return "#e4ff1a"
    } else if (this.props.votes >= 2) {
      return "#ffff3f"
    } else if (this.props.votes >= 0) {
      return "#ffa200"
    } else {
      return "#d90429"
    }
  };

  getEmoji() {
    if (this.props.votes >= 10) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 7) {
      return "em em-laughing"
    } else if (this.props.votes >= 5) {
      return "em em-smiley"
    } else if (this.props.votes >= 3) {
      return "em em-slightly_smiling_face"
    } else if (this.props.votes >= 2) {
      return "em em-neutral_face"
    } else if (this.props.votes >= 0) {
      return "em em-confused"
    } else {
      return "em em-angry"
    }
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
          <span className="Joke-votes" style={{borderColor: this.getColor()}}>{this.props.votes}</span>
          <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>
        </div>
        <div className="Joke-text">{this.props.text}</div>
        <div className="Joke-smile">
          <i className={this.getEmoji()}></i>
        </div>
      </div>
    )
  }
}
