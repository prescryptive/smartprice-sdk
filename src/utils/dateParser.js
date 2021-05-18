// Copyright 2021 Prescryptive Health Inc
function dateOfBirth(dateOfBirthText) {
  if (isNaN(Date.parse(dateOfBirthText))){
    return null;
  }
  const dob = new Date(Date.parse((dateOfBirthText || "").trim()));
  const today = new Date();
  if (dob > today) {
    return null;
  }
  return dob;
}

function getDateOfBirth(dateOfBirthText) {
  return dateOfBirth(dateOfBirthText);
}
module.exports = {getDateOfBirth};