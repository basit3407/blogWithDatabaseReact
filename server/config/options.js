const options = {
  usernameField: "email",
  errorMessages: {
    MissingPasswordError: "No password was given",
    AttemptTooSoonError: "Account is currently locked. Try again later",
    TooManyAttemptsError:
      "Account locked due to too many failed login attempts",
    NoSaltValueStoredError: "Authentication not possible. No salt value stored",
    IncorrectPasswordError: "Password or email are incorrect",
    IncorrectUsernameError: "Password or email are incorrect",
    MissingUsernameError: "No email was given",
    UserExistsError: "A user with the given email is already registered",
  },
};

module.exports = options;
