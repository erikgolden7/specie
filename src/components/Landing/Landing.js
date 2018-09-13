import React, { Component } from 'react';
import './landing.css';
import img from '../../assets/money-management.jpg';
import icon1 from '../../assets/budgets.png';
import icon2 from '../../assets/bills_calendar.png';
import icon3 from '../../assets/credit_checked.png';

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
            <img
              className=""
              src={icon1}
              alt="broken"
              width="90"
              height="auto"
            />
          </div>
          <div className="feature-box">
            <h3>Bills? Done</h3>
            <p>
              Track your bills like never before. Get alerts when it's time to
              pay so you never miss one.
            </p>
            <img
              className=""
              src={icon2}
              alt="broken"
              width="60"
              height="auto"
            />
          </div>
          <div className="feature-box">
            <h3>Credit score? Checked</h3>
            <p>
              Find out yours for free and get tips to help improve it, no credit
              card required.
            </p>
            <img
              className=""
              src={icon3}
              alt="broken"
              width="90"
              height="auto"
            />
          </div>
        </section>
        <section className="about">
          <div className="about-section">top</div>
          <div className="about-section">middle</div>
          <div className="about-section">bottom</div>
        </section>
      </div>
    );
  }
}
