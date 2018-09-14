import React from 'react';

export default function CarouselSlide(props) {
  return (
    <li
      className={
        props.index === props.activeIndex
          ? 'carousel__slide carousel__slide--active'
          : 'carousel__slide'
      }
    >
      <p className="carousel-slide__content">{props.slide.content}</p>
      <p>
        <strong className="carousel-slide__author">{props.slide.author}</strong>
        ,<small className="carousel-slide__source">{props.slide.source}</small>
      </p>
    </li>
  );
}
