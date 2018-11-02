import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

export class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  }
  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const newClient = this.state;
    const {firestore, history} = this.props;

    if(newClient.balance === ''){
      newClient.balance = 0;
    }
    firestore.add({ collection: 'clients'}, newClient)
      .then(()=> history.push('/'))
  }
  render() {
    const { firstName, lastName, email, phone, balance } = this.state;
    return (
      <div>
        <div className="row">
            <div className="col-md-6">
                <Link to="/" className="btn btn-link">
                    <i className="fas fa-arrow-circle-left" /> back to Dashboard
                </Link>
            </div>
        </div>
        <div className="card">
          <div className="card-header">Add client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" 
                  className="form-control"
                  name="firstName"
                  id="firstName"
                  minLength="2"
                  onChange={this.onChange}
                  value={firstName}
                  required/>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" 
                  className="form-control"
                  name="lastName"
                  id="lastName"
                  minLength="2"
                  onChange={this.onChange}
                  value={lastName}
                  required/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" 
                  className="form-control"
                  name="email"
                  id="email"
                  onChange={this.onChange}
                  value={email}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" 
                  className="form-control"
                  name="phone"
                  id="phone"
                  onChange={this.onChange}
                  value={phone}
                  minLength="10"
                  />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input type="text" 
                  className="form-control"
                  name="balance"
                  id="balance"
                  onChange={this.onChange}
                  value={balance}
                  />
              </div>
              <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(AddClient)
