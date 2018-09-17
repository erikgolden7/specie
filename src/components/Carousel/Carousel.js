import React, { Component } from 'react';
import CarouselArrow from './CarouselArrow';
import CarouselSlide from './CarouselSlide';
import CarouselIndicator from './CarouselIndicator';
import SlideOne, { SlideTwo, SlideThree } from './SlideData';
import './carousel.css';
// import { slideData } from './carouselslideData';

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      slideData: [<SlideOne />, <SlideTwo />, <SlideThree />]
    };
  }

  goToSlide = index => {
    this.setState({ activeIndex: index });
  };

  goToPrevSlide = e => {
    e.preventDefault();
    const { slideData } = this.state;

    let index = this.state.activeIndex;

    if (index < 1) {
      index = slideData.length;
    }

    --index;

    this.setState({
      activeIndex: index
    });
  };

  goToNextSlide = e => {
    const { slideData } = this.state;
    e.preventDefault();

    let index = this.state.activeIndex;

    if (index === slideData.length - 1) {
      index = -1;
    }

    ++index;

    this.setState({ activeIndex: index });
  };

  render() {
    const { slideData } = this.state;
    const slides = slideData.map((e, i) => (
      <CarouselSlide
        key={i}
        index={i}
        activeIndex={this.state.activeIndex}
        slide={e}
      />
    ));

    const indicators = slideData.map((e, i) => (
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
