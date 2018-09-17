import React, { Component } from 'react';
import '../Landing/landing.css';
import carousel2 from '../../assets/carousel2.png';
import carousel3 from '../../assets/carousel4.png';

export default class SlideOne extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#BA324B' }} className="slide-section">
        <div className="about-outer">
          <div className="slide-left">
            <h2>Effortlessly stay on top of bills</h2>
            <p>
              At last, your bills and money are together in one place and easier
              than ever to track. Just add your bills to see how helpful we can
              be.
            </p>
            <ul>
              <li>See bills and money in one place.</li>
              <li>Get alerts about upcoming bills.</li>
              <li>Say goodbye to late fees.</li>
            </ul>
          </div>
          <div className="slide-right">
            <img
              src={
                'https://www.mint.com/sites/default/files/billsmodule%402x_1.png?timestamp=1535430201'
              }
              style={{ height: 370 }}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}

export class SlideTwo extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#3871C3' }} className="about-section">
        <div className="about-outer" style={{ width: '70%' }}>
          <div className="slide-left">
            <img
              src={carousel2}
              style={{
                width: 500,
                height: '100%'
              }}
              alt=""
            />
          </div>
          <div className="about-right">
            <h2>Get started simply & securely</h2>
            <ul>
              <li>
                It’s easy to set up your free account in seconds, and help’s
                available if you should ever need it.
              </li>
              <li>
                We work to keep your information secure. All your data is
                encrypted with a 256-bit encryption level and the data exchanged
                with Mint is encrypted with 128-bit SSL.
              </li>
              <li>
                Mint comes from the makers of TurboTax®, trusted by millions
                every year with their most sensitive data.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export class SlideThree extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#359172' }} className="about-section">
        <div className="about-outer">
          <div className="slide-left">
            <h2>Get started simply & securely</h2>
            <p>
              It’s easy to set up your free account in seconds, and help’s
              available if you should ever need it.
            </p>
            <p>
              We work to keep your information secure. All your data is
              encrypted with a 256-bit encryption level and the data exchanged
              with Mint is encrypted with 128-bit SSL.
            </p>
            <p>
              Mint comes from the makers of TurboTax®, trusted by millions every
              year with their most sensitive data.
            </p>
          </div>
          <div className="slide-right">
            <img src={carousel3} style={{ height: 370 }} alt="" />
          </div>
        </div>
      </div>
    );
  }
}