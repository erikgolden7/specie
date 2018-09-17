import React from 'react';

export default function CarouselArrow(props) {
  return props.arrow === 'left' ? (
    <div className="carousel-arrow carousel-arrow-left" onClick={props.onClick}>
      <div className="left-arrow" />
    </div>
  ) : (
    <div
      className="carousel-arrow carousel-arrow-right"
      onClick={props.onClick}
    >
      <div className="right-arrow" />
    </div>
  );
}
