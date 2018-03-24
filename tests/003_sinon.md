# Sinon - Spys, Stubs and Mocks

* Testing is not always straight forward
* Mocking objects is required to unit test (we can pass objects around), when we unit testing testing we don't want to test the other object that we passing in, we just want to isolate the thing we are dealing with. Mocking objects is required to do this.
* Sinon to the rescue!!!

Install the `sinon` package. We are going to start with the following example

```js
describe('getIndex', () => {
        it('should render index', () => {
            authController.getIndex()
        })
    })
``` 

In order to call the `authController.getIndex()` we need a couple of functions and some objects

In order to test this function:

```js
const getIndex = (req, res) => {
        res.render('index')
    }
``` 

We need now to add objects that we are passing in and the objects needs to have some functions like `render()``

```js
describe('getIndex', () => {
        it('should render index', () => {
            const req = {}
            const res = {
                render() {
                    
                }
            }
            authController.getIndex(req, res)
        })
``` 

In order to give us a fake function we can use `sinon.spy()`. We can use this to track execution. Instead of creating an empty function, a spy is going to give us a fake function. But the benefit of that function is that we can use it to track that functions execution. We can say has this function been executed or not or how many times it has been executed. 

```js
const func = sinon.spy()
``` 


`var spy = sinon.spy(object, "method");`

Creates a spy for object.method and replaces the original method with the spy. An exception is thrown if the property is not already a function. The spy acts exactly like the original method in all cases. The original method can be restored by calling object.method.restore(). The returned spy is the function object which replaced the original method. spy === object.method.

Spy either can create a dummy function or wrap an exisiting function and give us access to the method etc. we can track and analyse. It's kind of encapsulation of the method in an object, so you can simply run something else on top of it. 

In our example we wrapped a method into a spy

```js
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
``` 

Spies give us the opprotunity to watch a function and to check if e.g. the function will be called at all, with which arguments and so on. Somtimes we need to replace a function in the example above we basically wrapped a function and passed it in. But in the example above we have done to many check the object and the controller. Sometimes we just want to replace a function.

## Stubs

In case of if we need some data from the database, in order to do so we need stubs. `sinon.stub()` replaces a function. We can control it's behavior directly. The method is `sinon.stub(ob, 'function'). Stub is going to take a function and replace it with something else and that's going to do is give us the opportunity  to controll the behavior and make sure that it's working the way we wanted to work and will return the things that I want to return.

