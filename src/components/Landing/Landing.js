import React, { Component } from 'react';
import './landing.css';
import img from '../../assets/money-management.jpg';

export default class Landing extends Component {
  render() {
    return (
      <div>
        <img className="home-img" src={img} alt="broken" />
        <section className="features">
          <div className="feature-box">
            <h3>Budgets? You betcha</h3>
            <p>
              Easily create budgets, and see our suggestions based on your
              spending.
            </p>
          </div>
          <div className="feature-box">
            <h3>Bills? Done</h3>
            <p>
              Track your bills like never before. Get alerts when it's time to
              pay so you never miss one.
            </p>
          </div>
          <div className="feature-box">
            <h3>Credit score? Checked</h3>
            <p>
              Find out yours for free and get tips to help improve it, no credit
              card required.
            </p>
          </div>
        </section>
      </div>
    );
  }
}
