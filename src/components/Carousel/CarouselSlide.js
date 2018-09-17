import React from 'react';

export default function CarouselSlide(props) {
  console.log(props.slide);
  return (
    <li
      className={
        props.index === props.activeIndex
          ? 'carousel-slide carousel-slide-active'
          : 'carousel-slide'
      }
    >
      {props.slide}
    </li>
  );
}
