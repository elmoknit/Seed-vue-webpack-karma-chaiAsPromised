export default class EmptyPasswordError extends Error {
  constructor (message) {
    super(message);
    this.name = 'EmptyPasswordError';
  }
}
