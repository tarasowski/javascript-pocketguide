# Mocks

Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as pre-programmed expectations. 

A mock will fail your test if it is not used as expected.

[Source](http://sinonjs.org/releases/v1.17.6/mocks/)

```js
it('should render index if authorized', () => {
            const isAuth = sinon.stub(user, 'isAuthorized').returns(true)
            const req = {user: user}
            const res = {
                render: sinon.spy()
            }
            authController.getIndex(req, res)
            isAuth.calledOnce.should.be.true
            res.render.calledOnce.should.be.true
            res.render.firstCall.args[0].should.equal('index')
        })
``` 

Here is the example test. Mocks will encapsulate our `res` object and build all of this pre-programmed expectations. The mock wraps the object and we can set all kind of different expectations how this object is going to be interacted with.

```js
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
``` 

**Recap:**

* Testing is not always straightforward
* Spys for watching methods 
* Stubs for replacing objects 
* Mocks for easier expectations