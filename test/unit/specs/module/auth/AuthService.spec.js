import AuthService from '../../../../../src/module/auth/AuthService';
import GraphQLClient from '../../../../../src/client/GraphqlClient';
import EmptyEmailError from '../../../../../src/module/auth/exception/EmptyEmailError';
import EmptyPasswordError from '../../../../../src/module/auth/exception/EmptyPasswordError';
const sinon = require('sinon');

describe('AuthService', () => {
    let client;
    let authService;
    const VALID_EMAIL = 'validl@email.com';
    const EMPTY_EMAIL = '';
    const EMPTY_PASSWORD = '';
    const VALID_PASSWORD = 'VALID';
    const WRONG_PASSWORD = 'wrong';

    const EXPECTED_MESSAGE_EMPTYEMAIL = 'Email is required';
    const EXPECTED_MESSAGE_EMPTYPASSWORD = 'Password is required';

    beforeEach(() => {
        client = sinon.mock(GraphQLClient.prototype);
        authService = new AuthService(new GraphQLClient());
    });

    describe('validateForm', () => {
        it('should return true', () => {
            authService.validateForm(VALID_EMAIL, VALID_PASSWORD).should.be.true;
        });

        it('should not thrown any exception', () => {
            (() => authService.validateForm(VALID_EMAIL, VALID_PASSWORD)).should.not.throw();
        });

        it('should have thrown an Empty email exception', () => {
            (() => authService.validateForm(EMPTY_EMAIL, EMPTY_PASSWORD)).should.throw(EXPECTED_MESSAGE_EMPTYEMAIL);
        });

        it('should have thrown an Empty password exception', () => {
            (() => authService.validateForm(VALID_EMAIL, EMPTY_PASSWORD)).should.throw(EXPECTED_MESSAGE_EMPTYPASSWORD);
        });
    });

    describe('login', () => {
        it('should return promise resolve', () => {
            client.expects('apiPost').once().resolves(
                { data: { login: 'test' } }
            );
            let promise = authService.login(VALID_EMAIL, VALID_PASSWORD);
            return promise.should.eventually.equal('test').then(() => {
                client.verify();
            });
        });
        it('should return promise rejected', () => {
            client.expects('apiPost').once().rejects();
            let promise = authService.login(VALID_EMAIL, WRONG_PASSWORD);
            return promise.should.be.rejected.then(() => {
                client.verify();
            });
        });
        it('should return promise reject with EmptyEmailError', () => {
            let promise = authService.login(EMPTY_EMAIL, VALID_PASSWORD);
            return promise.should.be.rejectedWith(EmptyEmailError);
        });

        it('should return promise reject with EmptyPasswordError', () => {
            let promise = authService.login(VALID_EMAIL, EMPTY_PASSWORD);
            return promise.should.be.rejectedWith(EmptyPasswordError);
        });
    });
});
