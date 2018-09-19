import React, { Component } from 'react';
import Carousel from '../Carousel/Carousel';
import './landing.css';
import img from '../../assets/money-management.jpg';
import icon1 from '../../assets/budgets.png';
import icon2 from '../../assets/bills_calendar.png';
import icon3 from '../../assets/credit_checked.png';

export default class Landing extends Component {
  render() {
    return (
      <div>
        <section>
          <div className="image-section">
            <img className="home-img" src={img} alt="coin stacks" />
            <h3 className="home-img-text"> Spend Smarter, Live Better </h3>
          </div>
        </section>

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
          <div className="about-section">
            <div className="savings-container">
              <h2>
                If your savings account balance is at or below $1,000, you're
                not alone.
              </h2>
              <p>20% of Americans don't save any of their annual income</p>
              <p>
                57% of Americans have less than $1,000 in their savings account.
              </p>
              <p>
                The most common financial mistake people over the age of 30
                admit to making is not saving enough.
              </p>
            </div>
          </div>

          <div className="about-section">
            <div className="debt-container">
              <div className="debt-image" />
              <div className="debt-text">
                <h2>
                  About half of Americans are “concerned, anxious or fearful
                  about their current financial well-being”
                </h2>
                <p>
                  55% of Americans feel lost when it comes to a long-term and
                  stable financial plan.
                </p>
                <p>
                  Nearly a third could never envisage a life for themselves
                  where they would never be in some sort of debt.
                </p>
                <p>
                  The economy might be prospering now, but that won't last
                  forever
                </p>
              </div>
            </div>
          </div>

          <Carousel />

          <div className="summary-section">
            <div style={{ fontSize: 42 }}>Get to Know Your Money</div>
            <p>
              From budgets and bills to free credit score and more, you’ll
              discover the effortless way to stay on top of it all.
            </p>
            <div className="summary-btns">
              <button className="summary-signup-btn">SIGN UP FREE</button>
              <button className="summary-login-btn">LOG IN</button>
            </div>
          </div>

          <div className="about-summary" style={{ background: '#2B2B2B' }}>
            <div className="summary-container">
              <h5 style={{ color: 'white' }}>copyright @ etc...</h5>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
