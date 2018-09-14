import React from 'react';

export default function CarouselIndicator(props) {
  return (
    <div
      className={
        props.index === props.activeIndex
          ? 'carousel__indicator carousel__indicator--active'
          : 'carousel__indicator'
      }
      onClick={props.onClick}
    />
  );
}
