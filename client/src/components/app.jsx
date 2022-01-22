import React from 'react';
import axios from 'axios';
import SignUpForm from './signUpForm';
import crypt from '../../utils/cryptPassword';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      occupations: null,
      states: null
    };
  }

  componentDidMount() {
    this.getOccupationsAndStates();
  }

  getOccupationsAndStates() {
    axios.get('https://frontend-take-home.fetchrewards.com/form')
      .then(({ data }) => {
        this.setState({
          occupations: data.occupations,
          states: data.states
        });
      })
      .catch(err => console.log(err));
  }

  postNewUser(userInfo) {
    var encryptUser = userInfo;
    var ciphered = crypt.encrypt(encryptUser.password);
    encryptUser.password = ciphered;
    axios.post('https://frontend-take-home.fetchrewards.com/form', encryptUser)
      .then(({ status }) => console.log(`${status} New User Has Been Successfully Added`))
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.occupations || !this.state.states) {
      return (<div>Loading...</div>);
    } else {
      return (
        <div>
          <h1>reward portal</h1>
          <SignUpForm
            occupations={this.state.occupations}
            states={this.state.states}
            postNewUser={this.postNewUser}
          />
        </div>
      );
    }
  }
}

export default App;