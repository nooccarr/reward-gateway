import React from 'react';
import validateUserInfo from '../../utils/validateUserInfo';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      occupation: '',
      state: '',
      showErrorMessages: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const errorMessages = validateUserInfo(this.state);
    if (Object.keys(errorMessages).length) {
      this.setState({ showErrorMessages: errorMessages });
    } else {
      this.props.postNewUser(this.state);
      this.props.toggleShowForm();
      alert('Sign Up Successful!');
    }
  }

  render() {
    const { occupations, states } = this.props;

    return (
      <form className='newUserForm' onSubmit={e => this.handleSubmit(e)}>
        <h1 className='newUserFormHeader'>Create account</h1>
        <div className='newUserLabelContainer'>
          <label className='newUserFormLabel'>
            Your name
            <input
              name='name'
              type='text'
              value={this.state.name}
              onChange={e => this.handleChange(e)}
              className='newUserFormInput'
            />
          </label>
          {this.state.showErrorMessages.name ?
            <p className='errorMessage'>&#9432; Name is not in valid format. Please correct and try again.</p> : null
          }
        </div>
        <div className='newUserLabelContainer'>
          <label className='newUserFormLabel'>
            Email
            <input
              name='email'
              type='text'
              value={this.state.email}
              onChange={e => this.handleChange(e)}
              className='newUserFormInput'
            />
          </label>
          {this.state.showErrorMessages.email ?
            <p className='errorMessage'>&#9432; Wrong or Invalid email address. Please correct and try again.</p> : null
          }
        </div>
        <div className='newUserLabelContainer'>
          <label className='newUserFormLabel'>
            Password
            <input
              name='password'
              placeholder='At least 8 characters'
              type='password'
              value={this.state.password}
              onChange={e => this.handleChange(e)}
              className='newUserFormInput'
            />
          </label>
          {this.state.showErrorMessages.password ?
            <p className='errorMessage'>&#9432; Minimum 8 characters required.</p>: null
          }
        </div>
        <div className='newUserLabelContainer'>
          <label className='newUserFormLabel'>
            Occupation:
            <select
              name='occupation'
              onChange={e => this.handleChange(e)}
              className='newUserFormSelectInput'
            >
              <option value="">-Choose an occupation-</option>
              {occupations.map((occupation, idx) => {
                return (
                  <option value={occupation} key={idx}>
                    {occupation}
                  </option>
                );
              })}
            </select>
          </label>
          {this.state.showErrorMessages.occupation ?
            <p className='errorMessage'>&#9432; Please select from the occupation options.</p>: null
          }
        </div>
        <div className='newUserLabelContainer'>
          <label className='newUserFormLabel'>
            State:
            <select
              name='state'
              onChange={e => this.handleChange(e)}
              className='newUserFormSelectInput'
            >
              <option value="">-Choose a state-</option>
              {states.map((state, idx) => {
                return (
                  <option value={state.abbreviation} key={idx}>
                    {state.name}
                  </option>
                );
              })}
            </select>
          </label>
          {this.state.showErrorMessages.state ?
            <p className='errorMessage'>&#9432; Please select from the state options.</p>: null
          }
        </div>
        <button className='newUserFormSubmitButton'>Continue</button>
      </form>
    );
  }
}

export default SignUpForm;