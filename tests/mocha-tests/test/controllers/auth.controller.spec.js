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
    describe.only('isAuthorized', () => {
        let user = {}
        beforeEach(function() {
            user = {
                roles: ['user'],
                isAuthorized: function (neededRole) {
                    return this.roles.indexOf(neededRole) >= 0
                }
            }
            authController.setUser(user)
            console.log(user, 'user object to inspect')
        })
        it('Should return false if not authorized', () => {
            const isAuth = authController.isAuthorized('admin')
            console.log(isAuth, 'what is inside of isAuth')
            expect(isAuth).to.be.false
        })
        it.skip('Should return true if authorized', () => {
            //authController.setRoles(['user', 'admin'])
            const isAuth = authController.isAuthorized('admin')
            isAuth.should.be.true
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
    describe('getIndex', () => {
        it('should render index', () => {
            const req = {}
            const res = {
                render: sinon.spy()
            }
            authController.getIndex(req, res)
            res.render.calledOnce.should.be.true
            res.render.firstCall.args[0].should.equal('index')
        })
    })
        
})