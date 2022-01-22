import React from 'react';
import axios from 'axios';
import SignUpForm from './signUpForm';

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

  render() {
    if (!this.state.occupations || !this.state.states) {
      return (<div>Loading...</div>);
    } else {
      return (
        <div>
          <SignUpForm
            occupations={this.state.occupations}
            states={this.state.states}
          />
        </div>
      );
    }
  }
}

export default App;