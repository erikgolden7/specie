import React from 'react';

export default function CarouselSlide(props) {
  return (
    <li className={props.index === props.activeIndex ? 'carousel-slide carousel-slide-active' : 'carousel-slide'}>
      {props.slide}
    </li>
  );
}
