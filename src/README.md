# [SmartPRICE™](https://smartprice.myrx.io/) Web SDK
***includes***:
- Embedded Registration Form to sign up users to SmartPRICE™ by invoking a button
- APIs to register users to SmartPRICE™ with integrated verification system through SMS

## Installation

```sh
# npm:
$ npm install phx-smartprice
# yarn:
$ yarn add phx-smartprice
```
---
# Embedded Registration Form

### `index.js`

**import ```init``` to your workspace**

```js
import { init } from 'phx-smartprice';
```

**register a listener to receive messages from the iframe modal**

```js
window.addEventListener('message', receiveMessage, false);
```

**to receive member sign-up information as a callback**

```js
const receiveMessage = (event) => {
  if (event.data.message === 'confirmation') {
    console.log(event.data.value.smartPriceMemberId);
  }
};
```

**to receive modalClose message as a callback**

```js

if (event.data.message === 'closeModal'){
  document.querySelector('.iframe-lightbox-link').lightbox.close();
}

```

### `index.html`

**Add an element `<div>` to your markup with the smartprice-button class**

```html
<div class="smartprice-button"></div>
```
**additional colors available:**
```html
<div class="smartprice-button dark"></div>
<div class="smartprice-button blue"></div>
```

#### Live demo can be viewed [here](https://smartprice.test.myrx.io/modal-demo)
#### Example usage can be found [here](https://github.com/prescryptive/smartprice-sdk/tree/master/example)
&nbsp;

---
# SmartPrice APIs

> SmartPrice API allows for seamless interaction with Prescryptive's smartprice
services. We provide two environments (test and prod) for all of our APIs, allowing
developers to make calls directly in prod environment for real users and test
environment for development purposes. For every method we provide, developers
can pass in an optional string parameter "test" to make calls in test
environment. By default, it is set to make calls in production environment.

### `sendVerificationCode(phonenumber)`

### CommonJS usage

```js
const smartprice = require('phx-smartprice');
```

Invoking `sendVerificationCode` method

```js
const smartprice = require('phx-smartprice');

// Make a request to send a verification code to a given phonenumber
smartprice
  .sendVerification('2061234567')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Test Environment
smartprice
  .sendVerification('2061234567', 'test')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
```

### Response Example

### Success

```json
{ "message": "One Time Password sent successful", "status": "success" }
```

### Failure

```json
{
  "details": {
    "errors": [
      {
        "value": null,
        "msg": {
          "error_code": "V-2001",
          "message": "Phone number is Required"
        },
        "param": "phoneNumber",
        "location": "body"
      }
    ]
  },
  "message": "Missing/Invalid Request Data",
  "status": "failure"
}
```

### `registerUser(registrationForm)`

### CommonJS usage

```js
const smartprice = require('phx-smartprice');
```

Invoking `registerUser` method

```js
const smartprice = require('phx-smartprice');
let registrationForm = {
  firstName: 'userFirstName',
  lastName: 'userLastName',
  email: 'user@email.com',
  dateOfBirth: '01/01/1997',
  phoneNumber: '2061234567',
  verifyCode: '12345', //verification code from user's phone after invoking sendverification method
};

// Make a request to register a user to smartprice
smartprice
  .registerUser(registrationForm)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Test Environment
smartprice
  .registerUser(registrationForm, 'test')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
```

### Response Example

### Success

```json
{
  "data": {
    "memberId": "AB1CDO 01",
    "rxGroup": "100A23B",
    "rxBin": "123456",
    "carrierPCN": "X01"
  },
  "message": "Ok",
  "status": "success"
}
```

### Failure

```json
{
  "details": {
    "errors": [
      {
        "value": "12345",
        "msg": "Verification code is required",
        "param": "verifyCode",
        "location": "body"
      }
    ]
  },
  "message": "Missing/Invalid Request Data",
  "status": "failure"
}
```

### `getDeviceToken(code, phoneNumber)`

### CommonJS usage

```js
const smartprice = require('phx-smartprice');
```

Invoking `getDeviceToken` method

```js
const smartprice = require('phx-smartprice');

// Obtain deviceToken with verification code and phoneNumber
// NOTE: verification code is sent to user's phone number on sendVerificationCode
smartprice
  .getDeviceToken(code, phoneNumber)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Test Environment
smartprice
  .getDeviceToken(code, phoneNumber, 'test')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
```

### Response Example

# Success

#### valid code and phoneNumber

```json
{
  "data": {
    "deviceToken": "ansdknoker1n2k3n"
  },
  "message": "Phone Number has been verified successfully. Please verify device using pin",
  "responseCode": 2002,
  "status": "success"
}
```

# Failure

#### Invalid code and phoneNumber

```json
{ "message": "Internal Server Error", "status": "error" }
```

#### Request made with missing verification code

```json
{
  "details": {
    "errors": [
      {
        "msg": {
          "error_code": "V-2002",
          "message": "Verification Code is Required"
        },
        "param": "code",
        "location": "body"
      },
      {
        "msg": "Cannot read property 'match' of undefined",
        "param": "code",
        "location": "body"
      }
    ]
  },
  "message": "Missing/Invalid Request Data",
  "status": "failure"
}
```

### `isRegisteredUser(deviceToken)`

### CommonJS usage

```js
const smartprice = require('phx-smartprice');
```

Invoking `isRegisteredUser` method

```js
const smartprice = require('phx-smartprice');

// Verify existing SmartPrice user
// NOTE: deviceToken is generated on user registration
smartprice
  .isRegisteredUser(deviceToken)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Test Environment
smartprice
  .isRegisteredUser(deviceToken, 'test')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
```

### Response Example

# Success

#### valid SmartPrice user

```json
{ "data": true, "message": "Ok", "status": "success" }
```

#### Invalid/Non-Existent SmartPrice user

```json
{ "data": false, "message": "Ok", "status": "success" }
```

# Failure

#### Request made without deviceToken

```json
{
  "message": "Device token is not supplied",
  "status": "failure"
}
```

#### Request made with incorrect deviceToken

```json
{
  "code": 2005,
  "message": "Token is invalid",
  "status": "failure"
}
```

### `getMemberInformation(deviceToken)`

### CommonJS usage

```js
const smartprice = require('phx-smartprice');
```

Invoking `getMemberInformation` method

```js
const smartprice = require('phx-smartprice');

// get user's SmartPrice membership information
// NOTE: deviceToken is generated on user registration
smartprice
  .getMemberInformation(deviceToken)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Test Environment
smartprice
  .getMemberInformation(deviceToken, 'test')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
```

### Response Example

# Success

```json
  data: {
    "memberId": "AB1CDO 01",
    "rxGroup": "100A23B",
    "rxBin": "123456",
    "carrierPCN": "X01"
},
```

# Failure

#### Request made without deviceToken

```json
{
  "message": "Device token is not supplied",
  "status": "failure"
}
```

#### Request made with incorrect deviceToken

```json
{
  "code": 2005,
  "message": "Token is invalid",
  "status": "failure"
}
```
