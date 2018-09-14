import React from 'react';

export default function CarouselSlide(props) {
  console.log(props.slide);
  return (
    <li
      className={
        props.index === props.activeIndex
          ? 'carousel__slide carousel__slide--active'
          : 'carousel__slide'
      }
    >
      {props.slide}
    </li>
  );
}
