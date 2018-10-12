export default class EmptyEmailError extends Error {
  constructor (message) {
    super(message);
    this.name = 'EmptyEmailError';
  }
}
