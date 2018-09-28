describe('AuthService', () => {
  describe('validateForm', () => {
    it('should return true', () => {
      (2 + 2).should.equal(4);

      // becomes
      return Promise.resolve(2 + 2).should.eventually.equal(4);
    });
  });
});
