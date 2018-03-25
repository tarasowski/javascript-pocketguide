const assert = require('assert')
const authController = require('../../controllers/auth.controller')
const expect = require('chai').expect
const should = require('chai').should()
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
chai.use(chaiAsPromised)
chai.should()


describe('AuthController', () =>{
    beforeEach(() => {
        //console.log('running before each')
        //authController.setRoles(['user'])
    })
    describe('isAuthorized', () => {
        let user = {}
        beforeEach(function() {
            user = {
                roles: ['user'],
                isAuthorized: function (neededRole) {
                    return this.roles.indexOf(neededRole) >= 0
                }
            }
            sinon.spy(user, 'isAuthorized')
            authController.setUser(user)
            
        })
        it('Should return false if not authorized', () => {
            const isAuth = authController.isAuthorized('admin')
            user.isAuthorized.calledOnce.should.be.true
        })
        it('Should return true if authorized', () => {
            //authController.setRoles(['user', 'admin'])
            const isAuth = authController.isAuthorized('admin')
            isAuth.should.be.false
        })
        it('Should not allow a get if not authorized')
        it('Should allow get if authorized')
    })
    describe('isAuthorizedAsync', () => {
        it('Should return false if not authorized', function(done) {
            authController.isAuthorizedAsync('admin', (isAuth) => {
                assert.equal(false, isAuth) // we are looking for exception here
                done()
            })
            
        })
    })
    describe('isAuthorizedPromise', function() {
            it('Should return false if not authorized', function() {
                return authController.isAuthorizedPromise('admin').should.eventually.be.false
                })
                
    })
    describe.only('getIndex', () => {
            let user = {}
            beforeEach(function() {
                user = {
                    roles: ['user'],
                    isAuthorized: function (neededRole) {
                        return this.roles.indexOf(neededRole) >= 0
                    }
                }    
            })
        
        it('should render index if authorized', () => {
            const isAuth = sinon.stub(user, 'isAuthorized').returns(true)
            const req = {user: user}
            const res = {
                render: () => {}
            }
            const mock = sinon.mock(res)
            mock.expects('render').once().withExactArgs('index')
            authController.getIndex(req, res)
            isAuth.calledOnce.should.be.true

            mock.verify()
        })
    })
        
})