import React, { Component } from 'react';

export default class Modal extends Component {
  render() {
    const { title, children, toggleModal } = this.props;

    return (
      <div className="backdrop">
        <div className="modal">
          <form className="transaction-form" onSubmit={this.handleSubmit}>
            <header className="header">
              <div className="modal-title">{title}</div>
              <div className="modal-close" onClick={toggleModal} />
            </header>

            <body>{children}</body>

            <footer className="footer">
              <button className="submit-btn" type="submit" onClick={toggleModal}>
                Submit
              </button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

// title = modal title
// toggleModal = toggles modal open/close
// children = comes from parent component
