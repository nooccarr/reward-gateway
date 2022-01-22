import React from 'react';
import axios from 'axios';
import SignUpForm from './signUpForm';
import crypt from '../../utils/cryptPassword';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      occupations: null,
      states: null,
      showForm: false
    };

    this.toggleShowForm = this.toggleShowForm.bind(this);
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
      .then(({ status }) => console.log(`${status} OK`))
      .catch(err => console.log(err));
  }

  toggleShowForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  render() {
    if (!this.state.occupations || !this.state.states) {
      return (
      <div className='app'>
        <img className='spinner' src='/img/spinner.gif' alt='main'/>
      </div>);
    } else {
      return (
        <div className='app'>
          <div className='logoContainer'>
            <img className='appLogo' src='/img/logo.png' alt='main'/>
          </div>
          <div className='newUserContainer'>
            {this.state.showForm ?
              <SignUpForm
                occupations={this.state.occupations}
                states={this.state.states}
                postNewUser={this.postNewUser}
                toggleShowForm={this.toggleShowForm}
              /> :
              <div>
                <div className='newUserMessage'>New to Fetch Rewards Portal?</div>
                <button className='newUserButton' onClick={this.toggleShowForm}>
                  Create your Fetch Rewards account
                </button>
              </div>
            }
          </div>
        </div>
      );
    }
  }
}

export default App;