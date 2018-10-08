import React, { Component } from 'react';

export default class Modal extends Component {
  render() {
    const { title, children, toggleModal, trash, handleSubmit } = this.props;

    return (
      <div className="backdrop">
        <div className="modal">
          <header className="header">
            <div className="modal-title">{title}</div>
            <div className="modal-close" onClick={toggleModal} />
          </header>

          {children}

          <footer className="footer">
            {trash && <div className="delete-icon" />}
            <button className="submit-btn" type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

// ---- PROPS ----
// title = modal title
// toggleModal = toggles modal open/close
// children = comes from parent component
// trash = true/false for displaying delete icon
// handleSubmit = function for handling data submission
