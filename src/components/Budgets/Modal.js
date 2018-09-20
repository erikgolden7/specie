import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props){
    super(props)

    this.state = {}
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div
        className="backdrop"
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 200
        }}
      >
        <div
          className="modal"
          style={{
            backgroundColor: '#fff',
            borderRadius: 3,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
          }}
        >
        <form onSubmit={this.props.submit}>
        <h3 style={{ margin: '5px 0 5px 0' }}>Change Name:</h3>
        <input
          className="modal-input"
          type="text"
          placeholder="Enter Name..."
          value={this.props.name}
          name="nameInput"
          onChange={this.props.handleChange}
        />
        <h3 style={{ margin: '25px 0 10px 0' }}>Change Amount:</h3>
        <input
          className="modal-input"
          type="text"
          placeholder="Enter Amount..."
          value={this.props.amount}
          name="amountInput"
          onChange={this.props.handleChange}
        />
        <input style={{display:'block', marginTop: 73, width: 150, height: 30, padding:5, background: '#77B070', fontSize:14, color:'#fff'}} type="submit" value="Submit" />
      </form>

          <div className="footer">
            <button style={{display:'block', marginTop: 10, width: 150, height: 30, padding:5, background: '#E16753', fontSize:14, color:'#fff'}} onClick={this.props.onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
