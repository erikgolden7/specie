import React from 'react';

export default function CarouselIndicator(props) {
  return (
    <div
      className={
        props.index === props.activeIndex
          ? 'carousel-indicator carousel-indicator-active'
          : 'carousel-indicator'
      }
      onClick={props.onClick}
    />
  );
}
