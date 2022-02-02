const validateUserInfo = (info) => {
  const invalidInputs = {};
  if (!validName(info.name)) invalidInputs.name = true;
  if (!validEmail(info.email)) invalidInputs.email = true;
  if (!validPassword(info.password)) invalidInputs.password = true;
  if (!validOccupation(info.occupation)) invalidInputs.occupation = true;
  if (!validState(info.state)) invalidInputs.state = true;
  return invalidInputs;
};

const validName = (name) => {
  let words = name.split(' ');
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