function validateEmail(email) { 
    var regularExpression = /\S+@\S+\.\S+/;
    return regularExpression.test(email.toLowerCase()); 
}