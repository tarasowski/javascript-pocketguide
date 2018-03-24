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