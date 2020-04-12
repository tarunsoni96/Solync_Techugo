/* To handle first name validation*/
export function validateFirstName(name) {
    var nameRegex = /^([a-zA-Z]+)$/;
  
    name = name.trim();
  
    if (name == "" || name == undefined || name == null) {
      return { status: false, error: 'Insert first name',borderColor:'#bb205a', height: 20 };
    }
    else if (!nameRegex.test(name)) {
      return { status: false, error: 'Invalid first name', borderColor:'#bb205a',height: 20 };
    }
    else {
      return { status: true, error: '',borderColor:'lightgrey', height: 0 };
    }
  }
  
  /* To handle address validation*/
  
  export function validateEmpty(data) {
    data = data.trim();
  
    if (data == "" || data == undefined || data == null) {
      return { status: false, error: '*Please enter address.', height: 20 };
    }
    else {
      return { status: true, error: '', height: 0 };
    }
  }
  
  /* To handle pincode validation*/
  
  export function validatePincode(pincode) {
    var pincodeRegex = /^[1-9][0-9]{5}$/;
  
    pincode = pincode.trim();
  
    if (pincode == "" || pincode == undefined || pincode == null) {
      return { status: false, error: '*Please enter post code.', height: 20 };
    }
    else if (!pincodeRegex.test(pincode)) {
      return { status: false, error: '*Please enter valid post code.', height: 20 };
    }
    else {
      return { status: true, error: '', height: 0 };
    }
  }
  
  /* To handle last name validation*/
  
  
  export function validateLastName(name) {
    var nameRegex = /^[a-zA-Z ]+$/;
  
    name = name.trim();
  
    if (name == "" || name == undefined || name == null) {
      return { status: false, error: 'Please enter last name.', height: 20 };
    }
    else if (!nameRegex.test(name)) {
      return { status: false, error: 'Please enter valid last name.', height: 20 };
    }
    else {
      return { status: true, error: '', height: 0 };
    }
  }
  
  /* *****Function to handle username************/
  
  export function validateUserName(username) {
    console.log("userName" + username);
    var usernameRegex = /^[a-zA-Z0-9]+$/;
  
    username = username.trim();
  
    if (username == "" || username == undefined || username == null) {
      return { status: false, error: 'Please enter first username.' };
    }
    else if (!usernameRegex.test(username)) {
      return { status: false, error: 'Please enter valid username.' };
    }
    else {
      return { status: true, error: '' };
    }
  }
  
  /* To handle last name validation*/
  
  
  export function validateUserId(userId) {
    var nameRegex = /^[a-zA-Z ]+$/;
  
    userId = userId.trim();
  
    if (userId == "" || userId == undefined || userId == null) {
      return { status: false, error: 'Please enter user id.' };
    }
    else {
      return { status: true, error: '' };
    }
  }
  
  /* To handle email and phone validation */
  
  export function validateEmail(email, message) {
    
    var emailRegex = /^[A-Z0-9_]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i;
    email = email.trim();
    if (email == "" || email == undefined || email == null) {
      if (message) {
        return { status: false, error: 'Enter email',borderColor:'#bb205a', height: 20 };
      } else {
        return { status: false, error: 'Invalid email',borderColor:'#bb205a', height: 20 ,image:'../../assets/Images/warning.png',errorBlank:'Insert email or password'};
      }
  
    }
    else if (!emailRegex.test(email)) {
      if (message) {
        return { status: false, error: 'Enter email',borderColor:'#bb205a', height: 20 };
      } else {
        return { status: false, error: 'Invalid email',borderColor:'#bb205a', height: 20 };
      }
    }
    else {
      return { status: true, error: '',borderColor:'lightgrey', height: 0 };
    }
  }
  
  /*To Validate number*/
  
  export function validatePhoneNumber(phoneNumber, message) {
    var phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
    phoneNumber = phoneNumber.trim();
  
    if (phoneNumber == "" || phoneNumber == undefined || phoneNumber == null) {
      if (message) {
        return { status: false, error: '*Please enter phone number.', height: 20 };
      } else {
        return { status: false, error: '*Please enter email id or phone number.', height: 20 };
      }
  
    }
    else if (!phoneRegex.test(phoneNumber)) {
      if (message) {
        return { status: false, error: '*Please enter valid phone number.', height: 20 };
      } else {
        return { status: false, error: '*Please enter valid email address or phone number.', height: 20 };
      }
  
    }
    else {
      return { status: true, error: '', height: 0 };
    }
  }
  
  /* To validate password */
  
  export function validatePassword(password,message) {
    var passwordRegex = /^.*(?=.*[A-Z].*)(?=.*\d)(?=.*[a-zA-Z]).{7}/;
    password = password.trim();
  
    if (password == "" || password == undefined || password == null) {
      return { status: false, error: 'Enter password',borderColor:'#bb205a', height: 20 }
    }
    else if (!passwordRegex.test(password)) {
      if (message) {
        return { status: false, error: 'Password not secure',borderColor:'#bb205a', height: 20 };
      } else {
        return { status: false, error: 'Password not secure',borderColor:'#bb205a', height: 20 };
      }
  
    }
    else {
      return { status: true, error: '',borderColor:'lightgrey', height: 0 }
    }
  }
  
  
  /* To validate country */
  
  export function validateLocation(country) {
    country = country.trim();
  
    if (country == "Location") {
      return { status: false, error: 'Please enter location.' }
    }
    else {
      return { status: true, error: '' }
    }
  
  }
  /* Updated by vaishnavi*/
  
  export function validateEmptySearch(data) {
    data = data;
  
    if (data == "" || data == undefined || data == null) {
      return { status: false, error: '*Please give input to search field.', height: 20 };
    }
    else {
      return { status: true, error: '', height: 0 };
    }
  }

  export function validateOccupation(occupation,message){
    var occupationRegex = /^([a-zA-Z]+)$/;
    occupation = occupation.trim();
  
    if (occupation == "" || occupation == undefined || occupation == null) {
      return { status: false, error: 'Insert occupation',borderColor:'#bb205a', height: 20 }
    }
    else if (!occupationRegex.test(occupation)) {
      if (message) {
        return { status: false, error: 'Occupation should only contain alphabets',borderColor:'#bb205a', height: 20 };
      } else {
        return { status: false, error: 'Occupation should only contain alphabets',borderColor:'#bb205a', height: 20 };
      }
  
    }
    else {
      return { status: true, error: '',borderColor:'lightgrey', height: 0 }
    }
  }