// Copyright 2021 Prescryptive Health Inc
const minAge = 13;
function dateOfBirth(dateOfBirthText) {
  if (isNaN(Date.parse(dateOfBirthText))){
    return null;
  }
  const dob = new Date(Date.parse((dateOfBirthText || "").trim()));
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const minDateOfBirth = new Date(year - minAge, month, date);

  if (dob > minDateOfBirth) {
    return { value: dob, error: 'You must be older than 13' };
  }

  return dob;
}

function getDateOfBirth(dateOfBirthText) {
  return dateOfBirth(dateOfBirthText);
}
module.exports = {getDateOfBirth};