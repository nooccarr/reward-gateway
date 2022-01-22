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
  if (words.length < 2) return false;
  for (let i = 0; i < words.length; i++) {
    let validWord = /^[a-zA-Z]+$/.test(words[i]); // alphabet only
    if (!validWord) return false;
  }
  return true;
};

const validEmail = (email) => {
  let parts = email.split('@');
  if (parts.length !== 2) return false;
  let first = parts[0];
  if (!/^[a-z0-9]+$/i.test(first)) return false;
  let second = parts[1];
  let splitSecond = second.split('.');
  console.log(second, splitSecond)
  if (second[0] === '.' || second[second.length - 1] === '.') {
    console.log('IM DOTDOTDOT', second[0], second[second.length - 1])
    return false;
  } else if (splitSecond.length !== 2) {
    console.log('IMSDFMSD')
    return false;
  }
  for (let i = 0; i < splitSecond.length; i++) {
    if (!/^[a-z0-9]+$/i.test(splitSecond[i])) return false;
  }

  return true;
};

const validPassword = (password) => {
  return password.length >= 8;
};

const validOccupation = (occupation) => {
  return !!occupation;
};

const validState = (state) => {
  return !!state;
};

export default validateUserInfo;