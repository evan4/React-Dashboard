import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

export class EditClient extends Component {
    constructor(props){
        super(props);
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }

  onSubmit = (e) => {
    e.preventDefault();
    
    const {client, firestore, history} = this.props;
    const updClient = {
        firstName: this.firstNameInput.current.value,
        lastName: this.lastNameInput.current.value,
        email: this.emailInput.current.value,
        phone: this.phoneInput.current.value,
        balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value
    }
 
    firestore.update({ collection: 'clients', doc: client.id}, updClient)
      .then(()=> history.push('/'))
  }
  render() {
    const {client } = this.props;
    if(client){
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
            <div className="card-header">Edit client</div>
            <div className="card-body">
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" 
                    className="form-control"
                    name="firstName"
                    id="firstName"
                    minLength="2"
                    ref={this.firstNameInput}
                    defaultValue={client.firstName}
                    required/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" 
                    className="form-control"
                    name="lastName"
                    id="lastName"
                    minLength="2"
                    ref={this.lastNameInput}
                    defaultValue={client.lastName}
                    required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    className="form-control"
                    name="email"
                    id="email"
                    ref={this.emailInput}
                    defaultValue={client.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" 
                    className="form-control"
                    name="phone"
                    id="phone"
                    ref={this.phoneInput}
                    defaultValue={client.phone}
                    minLength="10"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <input type="text" 
                    className="form-control"
                    name="balance"
                    id="balance"
                    ref={this.balanceInput}
                    defaultValue={client.balance}
                    
                    />
                </div>
                <input type="submit" defaultValue="Submit" className="btn btn-primary btn-block"/>
                </form>
            </div>
            </div>
        </div>
        )
    }else{
       return  <Spinner/>
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
      client: ordered.client && ordered.client[0]
    }))
)(EditClient);