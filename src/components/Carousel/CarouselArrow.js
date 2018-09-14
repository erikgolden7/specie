// Component for left arrow
import React, { Component } from 'react';

export default class CarouselArrow extends Component {
  render() {
    if (this.props.arrow === 'left') {
      return (
        <div
          className="carousel__arrow carousel__arrow--left"
          onClick={this.props.onClick}
        >
          <div className="left-arrow" />
        </div>
      );
    }
    return (
      <div
        className="carousel__arrow carousel__arrow--right"
        onClick={this.props.onClick}
      >
        <div className="right-arrow" />
      </div>
    );
  }
}
