import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="LoaderBalls_container">
        <div className="LoaderBalls">
          <div className="LoaderBalls__item" />
          <div className="LoaderBalls__item" />
          <div className="LoaderBalls__item" />
        </div>
      </div>
    );
  }
}
