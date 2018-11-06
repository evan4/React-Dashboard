import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';

export class Register extends Component {
    state = {
        email: '',
        password: ''
    }
    componentDidMount(){
        const { allowRegistration } = this.props.settings;
        if(!allowRegistration) {
            this.props.history.push('/')
        }
    }
    onChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {firebase, notifyUser } = this.props;
        const { email, password } = this.state;
        
        firebase.createUser({email, password})
            .catch(err => notifyUser('That user already exists', 'error'));
    }
  render() {
    const { message, messageType } = this.props.notify;
    const {email, password } = this.state;

    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
            <div className="card">
                <div className="card-boyd">
                    {message ? (
                        <Alert message={message} messageType={ messageType} />
                    ) : null}
                    <h1 className="text-center pb-4 pt-2">
                        <span className="text-primary">
                            <i className="fas fa-lock"></i> Register
                        </span>
                    </h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" 
                                name="email"
                                className="form-control"
                                value={email}
                                onChange={this.onChange}
                                required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" 
                                name="password"
                                className="form-control"
                                value={password}
                                onChange={this.onChange}
                                required/>
                        </div>
                        <input type="submit" value="Register" className="btn btn-primary btn-block"/>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        notify: state.notify, 
        settings: state.settings
    }), {notifyUser}
))(Register);
