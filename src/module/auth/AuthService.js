import { QUERY_LOGIN } from './queries';
import EmptyEmailError from './exception/EmptyEmailError';
import EmptyPasswordError from './exception/EmptyPasswordError';

export default class AuthService {
  constructor (client) {
    this.client = client;
  }

  validateForm (email, password) {
    if (email === '') {
      throw new EmptyEmailError('Email is required');
    }

    if (password === '') {
      throw new EmptyPasswordError('Password is required');
    }
    return true;
  }

  login (email, password) {
    try {
      this.validateForm(email, password);

      return this.client.apiPost(QUERY_LOGIN, {
        credentials: {
          email: email,
          password: password
        }
      }).then((result) => {
        return result.data.login;
      })
        .catch((errors) => {
          console.log(errors.code);
          let errorsMessage = '';

          errors.graphQLErrors.forEach((error) => {
            errorsMessage += `${error.message}\n`;
          });

          return new Promise((resolve, reject) => {
            reject(errorsMessage);
          });
        });
    } catch (exception) {
      return new Promise((resolve, reject) => {
        reject(exception);
      });
    }
  }
}
