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
      alert('Successfully updated!');
    }
  }

  render() {
    const { occupations, states } = this.props;

    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label>Your name </label>
        <input
          name='name'
          type='text'
          value={this.state.name}
          onChange={e => this.handleChange(e)}
        />
        {this.state.showErrorMessages.name ?
          <p>Name is not in valid format. Please correct and try again.</p> : null
        }
        <label>Email </label>
        <input
          name='email'
          type='text'
          value={this.state.email}
          onChange={e => this.handleChange(e)}
        />
        {this.state.showErrorMessages.email ?
          <p>Wrong or Invalid email address. Please correct and try again.</p> : null
        }
        <label>Password </label>
        <input
          name='password'
          placeholder='At least 8 characters'
          type='password'
          value={this.state.password}
          onChange={e => this.handleChange(e)}
        />
        {this.state.showErrorMessages.password ?
          <p>Minimum 8 characters required.</p>: null
        }
        <label>Occupation: </label>
        <select
          name='occupation'
          onChange={e => this.handleChange(e)}
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
        {this.state.showErrorMessages.occupation ?
          <p>Please select from the occupation options.</p>: null
        }
        <label>State: </label>
        <select
          name='state'
          onChange={e => this.handleChange(e)}
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
        {this.state.showErrorMessages.state ?
          <p>Please select from the state options.</p>: null
        }
        <button>Continue</button>
      </form>
    );
  }
}

export default SignUpForm;