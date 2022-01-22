const validateUserInfo = (info) => {
  const invalidReasons = [];
  if (!validName(info.name)) invalidReasons.push('Name is not in proper format.');
  if (!validEmail(info.email)) invalidReasons.push('Email is not in proper format.');
  if (!validPassword(info.password)) invalidReasons.push('Password must be at least 8 characters long.');
  if (!validOccupation(info.occupation)) invalidReasons.push('Please select from the occupation options.');
  if (!validState(info.state)) invalidReasons.push('Please select from the state options.');
  return invalidReasons.join('\n');
};

const validName = (name) => {
  let words = name.split(' ');
  if (words.length < 2 || words.length > 3) return false;
  for (let i = 0; i < words.length; i++) {
    let validWord = /^[a-zA-Z]+$/.test(words[i]); // regex: alphabet only
    if (!validWord) return false;
  }
  return true;
};

const validEmail = (email) => {
  let parts = email.split('@');
  if (parts.length !== 2) return false;
  let first = parts[0];
  if (!/^[a-z0-9]+$/i.test(first)) return false; // regex: alphanumeric only
  let second = parts[1];
  let splitSecond = second.split('.');
  if (second[0] === '.' || second[second.length - 1] === '.') {
    return false;
  } else if (splitSecond.length !== 2) {
    return false;
  }
  for (let i = 0; i < splitSecond.length; i++) {
    if (!/^[a-z0-9]+$/i.test(splitSecond[i])) return false;
  }

  return true;
};
1
const validPassword = (password) => {
  if (password.length < 8) return false;
  if (password.indexOf(' ') !== -1) return false;
  return true;
};

const validOccupation = (occupation) => {
  return !!occupation;
};

const validState = (state) => {
  return !!state;
};

export default validateUserInfo;