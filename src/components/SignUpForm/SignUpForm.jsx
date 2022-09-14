import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import { Navigate } from 'react-router-dom';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  test = {
    redirect: false
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = {...this.state};
      delete formData.confirm;
      delete formData.error;
      const user = await signUp(formData);
      this.props.setUser(user);
      this.test.redirect = true;
    } catch {
      // An error occurred, like a dup email address
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  
  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form className="form-container" autoComplete="off" onSubmit={this.handleSubmit}>
            <div>
              <label>Name</label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </div>
            <div>
              <label>Confirm</label>
              <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            </div>
            <button className="form-button" type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
        { this.test.redirect && <Navigate to='/' replace={true} />}
      </div>
    );
  }
  
}