import React, { Component } from 'react';
import CarouselArrow from './CarouselArrow';
import CarouselSlide from './CarouselSlide';
import CarouselIndicator from './CarouselIndicator';
import Test, { Test1, Test2 } from '../Test';
import './carousel.css';
// import { testData } from './carouselTestData';

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      testData: [<Test />, <Test1 />, <Test2 />]
    };
  }

  goToSlide = index => {
    this.setState({ activeIndex: index });
  };

  goToPrevSlide = e => {
    e.preventDefault();
    const { testData } = this.state;

    let index = this.state.activeIndex;

    if (index < 1) {
      index = testData.length;
    }

    --index;

    this.setState({
      activeIndex: index
    });
  };

  goToNextSlide = e => {
    const { testData } = this.state;
    e.preventDefault();

    let index = this.state.activeIndex;

    if (index === testData.length - 1) {
      index = -1;
    }

    ++index;

    this.setState({ activeIndex: index });
  };

  render() {
    const { testData } = this.state;
    const slides = testData.map((e, i) => (
      <CarouselSlide
        key={i}
        index={i}
        activeIndex={this.state.activeIndex}
        slide={e}
      />
    ));

    const indicators = testData.map((e, i) => (
      <CarouselIndicator
        key={i}
        index={i}
        activeIndex={this.state.activeIndex}
        onClick={e => this.goToSlide(i)}
      />
    ));

    return (
      <div className="carousel">
        <CarouselArrow arrow="left" onClick={e => this.goToPrevSlide(e)} />
        <ul className="carousel__slides">{slides}</ul>
        <CarouselArrow arrow="right" onClick={e => this.goToNextSlide(e)} />
        <ul className="carousel__indicators">{indicators}</ul>
      </div>
    );
  }
}
