# Node Modules

## Importing Modules with require()

There are couple of steps that nodejs performs.

1. Resolving: wherever path you are giving to require node will resolve that path, there is a special function to do that.
2. Loading: the module will be loaded
3. Wrapping: then there is a wrapping a function that wraps your code what's why the variables which are in that file in that module they are not escaping into outer scope as you have in the browser JavaScript
4. Evaluation/Running: then the code runs, the code will be executed. This is what node is doing.
5. Caching: then the entire result of that module is cached for for future uses. You can require the same file many times it will be actually read just once and the rest of the times it will be pulled from the cache.

Here is a good description how the `require()` and modules stuff works in NodeJS [Requiring modules in Node.js: Everything you need to know](https://medium.freecodecamp.org/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8)

## Modules can have code

```js
code/modules/module-1.js
console.log(module) // console.log(global.module)

code/app.js
const init = require('./modules/module-1');
console.log(init);

Module {
  id: '/Users/myfamily-dl/Desktop/003_coding/javascript-pocketguide/nodejs/scripts/code/modules/module-1.js',
  exports: {},
  parent:
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/Users/tarasovsky-dl/Desktop/003_coding/javascript-pocketguide/nodejs/scripts/code/app.js',
     loaded: false,
     children: [ [Circular] ],
     paths:
      [ '/Users/tarasovsky-dl/Desktop/003_coding/javascript-pocketguide/nodejs/scripts/code/node_modules',
        '/Users/tarasovsky-dl/Desktop/003_coding/javascript-pocketguide/nodejs/scripts/node_modules',
        '/Users/tarasovsky-dl/Desktop/003_coding/javascript-pocketguide/nodejs/node_modules',
        '/Users/tarasovsky-dl/Desktop/003_coding/javascript-pocketguide/node_modules',
        '/Users/tarasovsky-dl/Desktop/003_coding/node_modules',
        '/Users/tarasovsky-dl/Desktop/node_modules',
        '/Users/tarasovsky-dl/node_modules',
        '/Users/node_modules',
        '/node_modules' ] },
  filename: '/Users/tarasovsky-dl/Desktop/003_coding/javascript-pocketguide/nodejs/scripts/code/modules/module-1.js',
  loaded: false,
  children: [],
  paths:
   [ '/Users/tarasovsky-dl/Desktop/003_coding/javascript-pocketguide/nodejs/scripts/code/modules/node_modules',
``` 

**Note:** There is a parent property in the example above. So the module has a parent and it's located under the url `filename/.../app.js`. Here we can also see very interesting information such as a property `exports` that is currently empty. 

```js
code/modules/module-1.js
'use strict'
// starting to load and execute the module
module.exports.runBit = 'hello from me'
console.log(module);

code/app.js
Module {
  id: '/Users/tarasovsky-dl/Desktop/003_coding/javascript-pocketguide/nodejs/scripts/code/modules/module-1.js',
  exports: { runBit: 'hello from me' }, // we see here exported value that we can access in the app.js
  parent:
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/Users/tarasovsky-dl/Desktop/003_coding/javascript-pocketguide/nodejs/scripts/code/app.js',
     loaded: false,
     children: [ [Circular] ],
     paths:

```
**Note:** The Module itself has a parent `parent:` property which will be the `app.js` in this case. 

## require()

Is a method that is available to all the scripts and all the node code anywhere in your node code. 
* Local path takes precedence (0 (local) to N (folder up, up, up))
* Module can be a file or a folder with index.js (or any file specified in package.json main in that nested folder)
* Loaded is true when this file is imported/required by another
* id is the path when this file is required by another (someone else requires that module)
* parent and children will be populated accordingly (the main program is a parent and module is a child)

## require.resolve()

Check if the package exists/installed or not, but does not execute (it's not going to run the code)

## How require() Check Files

1. Try name.js (express.js, module.js etc.) if it finds it that's good
2. Try name.json
3. Try name.node (compiled addon example)
4. Try folder i.e. name/index.js

## require.extensions

```js
{ '.js': [Function], '.json': [Function], '.node': [Function] }

function (module, filename) { // require.extensions['.js'].toString()
    const content = fs.readFileSync(filename, 'utf-8');
    module._compile(internalModule.stripBOM(content)), filename);
}

function (module, filename) { // require.extensions['.json'].toString()
    const content = fs.readFileSync(filename, 'utf-8');
    try {
        module.exports = JSON.parse(internalModule.stripBOM(content));
    } catch {
        err.message = filename + ' : ' + err.message;
        throw err;
    }
}

function (module, filename) { // require.extentions['.node'].toString()
    return process.dlopen(module, path._makeLong(filename));
}

``` 
**Note:** The way require() work is it uses `fs.readFileSync()` method it's a synchronous loading. Which might sound really bad, usng sync for I/O is general a bad thing, but the loading module in a sync mode allows us to avoid "race conditions". We need sequentially to load the modules.

JSON is a global object, they ported it from the browser it works the same way as in the browser. JSON the global object is available anywhere in the node code. And then the exports module it will create this module for you if no then you have the `.catch`. 

`stripBOM` BOM = bit at the end of the file, it takes care of that thing for cross platform. But you can expect the extentions by yourself anywhere by using `.toString()`. 

## Caching 

Running require() twice will not print twice but just once:

```js
cd code/modules && node
> require('./module-1.js');
...
> require('./module-1.js');
{}
``` 
(or run modules/main.js)

All subsequent `require()` calls will be cached, it will run only once. Just tried to run the same module code more than one time it simply returned an empty object `{}` looks like it just imported once and if you try to run it more than 1 time it's cached and is not running anymore. Because of the caching and caching prevents the second execution of the code. The second time it will load the module but will not run the code!!!

While importing the module it run once (imports the whole module > the whole file) and caches it. Therefore the code will be executed only once. You need to store all your data inside the `.exports` property, which is basically an empty object similar to `.prototype` that can have many different properties inside, which a) can be imported, b) can be run inside the mainapp.js.

**There is a possiblity to delete the cache**

```js
delete require.cache([require.resolve('./module-1.js')]);
``` 
**Note:** `delete` is an operator which removes the property on an object. 


# Exporting Code

How we should modularize our code? We need to export the module as a function or as a class with methods.

```js
module.exports = () => {

}
``` 

`modules.exports` is a global variable and it's available to you anywhere you can use it to export code functionality. 

**CSV to Node Object Converter Module**

```js
code/modules/module-2.js

module.exports.parse = (csvString = '') => {
    const lines = csvString.split('\n'); // comma separated string
    let result = [];
    ...
    return result;
}
``` 

```js
code/modules/module-2.js
const csvConverter = require('.module-2.js').parse;
const csvString = 'id,first_name,last_name,email,gender...';
console.log(csvConverter(csvString));
``` 

**Note:** What you are exporting is exactly the same what you need to import. 

There is a pattern where you can run a function before returning assigning an export.

```js
// in modules/module-3.js
const parse = () => console.log('this is a function that will be running');
module.exports = (arg1) => {
    //do something
    // do something
    return parse
}

// in app.js
const parser = require('./modules/module-3.js')({pretty: true}).parse
//.... code goes here

```

## Module Patterns

* Export Function: exporting a function the easiest and most powerful way to export a function (stateless)
* Export Class: with ES6 we can export a class or a function factory (you can have a state)
* Function Factory: everytime you invoke it you would have an object
* Export Object
* Export Object with Methods: mostly for some utility some methods which are not related to each other

```js
module.exports.parse = () => {} // ok
exports.parse = () => {} // ok
global.module.exports.parse = () => {} // not ok, use local module
``` 
You can have multiple `module.exports.` all of them could be in one file, if they are not related, when they are not having shared state, when they are stateless. 

**Note:** There is a big difference between `global.module.exports` and `module.exports`. The `module` is a local global, it's a variable which is given to you because there is a wrapping function. One of the steps requiring a module is a wrapping function, wrap the code in another function. And that basically the wrapper function will have the `module` argument. 

```js
exports.parse = () => {} //ok
module.exports = {parse: () => {}} // ok again
exports = {parse: () => {}} // not ok, creates a new variable
``` 

## Module Wrapper Function

Keeps local vars local

```js
require('module').wrapper
node 
> require('module').wrapper
['(function (exports, require, module, __filename, __dirname) {','\n});']
``` 
**Note:** you can see it if you `console.log(require('module).wrapper)` you can see who the wrapper function looks like. That function has 5 arguments and they ara local and are available to you in that file.

```js
console.log(require('module').wrapper);
console.log(__dirname);
console.log(__filename);
console.log(exports);
console.log('show the args of the wrapper functon: ', arguments.length); // 5
``` 
**Note:** you can access all these variables, because they are parameters of the IFEE funciton that wraps every node module. By running a file they all get parameterized = the values are assigned, that's why you can access them. 

## What you export === what you use

```js
module.exports = {
    parse: (csv) => {
        //....
    }
}
``` 
Importing object, so use:

```js
const parse = require('./file.js').parse; // if you don't need the entire object
const {parse} = require('./file.js'); // if you want to use destructuring as well
``` 

Or you can do it in that way:

```js
const Parser = {
    parse: (csv) => {
        //....
    }
}

modules.exports = Parser;
``` 

There is another pattern where you can export a function and invoke it immediately

```js
module.exports = () => {
    return {
        parse: (csv) => {
            //....
        }
    }
    
}

const {parse} = require('./file.js')();
const parse = require('.file.js').parse;
``` 

Another example where a class extends another class:

```js
class Parser extends BaseClass {
    parse(csv) {
        //...
    }
}

module.exports = Parser

const Parser = require('./file.js')
const parser = new Parser()
const parse = parser.parse // or const {parse} = parser
``` 

## import vs. import() vs. require()

They are all 3 different ways to import `require()` is a native nodejs method.

* import is static (you need to know what you are importing) and require is dynamic 
* *.mjs experimental https://nodejs.org/api/esm.html
* import() method (stage 3) - separate feature, later and not a standard - it's dynamic
* No require.extentions or require.cache in import

#### Node experimental ESM support

```js
import fs from 'fs';
import('./button.js')
``` 

For now, it's better to use Babel or just stick with require(). ES standas for ACMAScript M stands for Modules.

## Caching

Caching is very important mechanism, the require is sync and often times it will be blocking and decreasing the perfomance. By using cache it will increase the performance because it's doesn't have to read/load the module from a file it simply loads it from the memory (cache).

* require.cache has the cache (don't put require in request handlers, because every request will block). Put all require statements in the beginning and then use require.cache
* delete require.cache['...'] by doing so you can clear the cache

## Global

```js
const limit = 100; // local not available outside
const height = 50; // local
let i = 10; // local
console = () => {} // global, overwrites console outside
global.Parse = {} // global, available in other files
max = 999; // global too, if you are not saying var, let, const you are creating a global > singleton pattern
```
You can overwrite the global console. In the example above you just overwrite the global console, by loading the module all global console.log() will be overwritten.

If you want to make a variable global explicit, you can type:

```js
global.max = 999;
```

## npm 

* it's a registry
* it's also a command line tool (CLI): git, private registries (self hosted npm, nexus, artifactory)

## Creating package.json for LAZY PROGRAMMERS

```js
npm init -y // -y yes flag it will answer yes or pick all default answers
npm config ls // setting init configuration to look at them - these are CLI configuration for node 
npm config set registry "http...." // set is the command and registry is the key name and in "" is the value
npm config set proxy http://proxy_host:port // you can configure the proxy also for npm install
``` 

**Note:** rc = configuration and `.` means this is a hidden file

## Dependency Option

* npm i express -S (default in npm v5) you need to use it in node6
* npm i express -D (dev dependencies): there are three dependecies normal, dev, optional. It's good for tools such as webpack, babel tools which you don't want to have it in production. 
* npm i express -O that's for optional dependencies, npm will try to get it if it didn't get it it's going to work
* npm i express -E it will put the exact version in the package.json (EXACT VERSION)

Some useful commands:

```js
npm home express // will open up homepage of express
npm repo express // will open up repo of express
npm docs express // will open up a documentation page of express
``` 

---
## Requiring modules in Node.js: Everything you need to know

[Source](https://medium.freecodecamp.org/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8)

In REPL type $ node && module
```repl
> module
Module {
  id: '<repl>',
  exports: {},
  parent: undefined,
  filename: null,
  loaded: false,
  children: [],
  paths: [ ... ] }
``` 
Each module has it's own path, under path Node is going to do search for our module if we want to load it. We can require files to load `file.js` but also we can require folders to load `require('folder')` In the same folder there needs to be e.g. `index.js` that is going to be loaded. The `index.js` will be used by default but we can set another file to load inside the `package.json` 

```repl
~/learn-node $ echo "console.log('I rule');" > node_modules/find-me/start.js
~/learn-node $ echo '{ "name": "find-me-folder", "main": "start.js" }' > node_modules/find-me/package.json
~/learn-node $ node
> require('find-me');
I rule
{}
>
``` 
**Note:** We can place our file not only in the node_modules directory we can place it anywhere we want. In order to call it we just need to provide a relative path to it `./lib/file.js` 

### What is an absolute path?
An absolute path is defined as the specifying the location of a file or directory from the root directory(/). In other words we can say absolute path is a complete path from start of actual filesystem from / directory.

### What is a relative path?
Relative path is defined as path related to the present working directory(pwd). Suppose I am located in /var/log and I want to change directory to /var/log/kernel.

## Child & Parent Relationship

Now we can create following folder structure and files to investigate the child/parent relationship of modules

```
learn-node
|   index.js
|___lib
    |   util.js
``` 

**index.js**
```js
console.log('Iam index', module); require('./lib/util.js') 
``` 

**./lib/util.js**
```js
console.log('Iam util', module);
``` 

If we run $ node index.js we'll get the following output:

``` 
Iam index Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/familyname/Desktop/003_coding/javascript-pocketguide/nodejs/scripts/learn-node/index.js',
  loaded: false,
  children: [],
  paths:...

In util Module {
  id: '/Users/familyname/Desktop/003_coding/javascript-pocketguide/nodejs/scripts/learn-node/lib/util.js',
  exports: {},
  parent:
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/Users/familyname/Desktop/003_coding/javascript-pocketguide/nodejs/scripts/learn-node/index.js',
     loaded: false,
     children: [ [Circular] ],
     paths:

``` 

**Note:** The module.exports object in every module is what the require function returns when we require that module. 

## Circular module dependency

Let’s now try to answer the important question about circular dependency in Node: What happens when module 1 requires module 2, and module 2 requires module 1?

module-1.js
```js
'use strict'
console.log('Loading module 1');
exports.a = 1;

require('./module-2');

exports.b = 2;
exports.c = 3;

``` 
module-2.js
```js
'use strict'
console.log('Loading module', 2);
const Module1 = require('./module-1');
console.log('Module 1 is partially loaded here', Module1);
``` 

Output
``` 
Loading module 1
Loading module 2
Module 1 is partially loaded here { a: 1 }
``` 
We required module2 before module1 was fully loaded, and since module2 required module1 while it wasn’t fully loaded, what we get from the exports object at that point are all the properties exported prior to the circular dependency. Only the a property was reported because both b and c were exported after module2 required and printed module1.

Node keeps this really simple. During the loading of a module, it builds the exports object. You can require the module before it’s done loading and you’ll just get a partial exports object with whatever was defined so far.

## JSON and C/C++ addons

We can natively require JSON files and C++ addon files with the require function. You don’t even need to specify a file extension to do so.

Requiring JSON files is useful if, for example, everything you need to manage in that file is some static configuration values, or some values that you periodically read from an external source. For example, if we had the following config.json file:

```
{
  "host": "localhost",
  "port": 8080
}
``` 

We can require it directly like this:

```js
const { host, port } = require('./config');
console.log(`Server will run at http://${host}:${port}`);
// Server will run at http://localhost:8080
``` 

## All code you write in Node will be wrapped in functions

We can use the exports object to export properties, but we cannot replace the exports object directly because it’s just a reference to module.exports

```js
exports.id = 42; // This is ok.
exports = { id: 42 }; // This will not work.
module.exports = { id: 42 }; // This is ok.
``` 

In a browser, when we declare a variable in a script like this:

```js
var answer = 42;
``` 

That answer variable will be globally available in all scripts after the script that defined it. **This is not the case in Node.** When we define a variable in one module, the other modules in the program will not have access to that variable. 

The answer is simple. Before compiling a module, Node wraps the module code in a function, which we can inspect using the wrapper property of the module module.

```
~ $ node
> require('module').wrapper
[ '(function (exports, require, module, __filename, __dirname) { ',
  '\n});' ]
>
``` 

Node does not execute any code you write in a file directly. It executes this wrapper function which will have your code in its body. This is what keeps the top-level variables that are defined in any module scoped to that module.

This wrapper function has 5 arguments: `exports, require, module, __filename, __dirname`. This is what makes them appear to look global when in fact they are specific to each module.

All of these arguments get their values when Node executes the wrapper function. `exports` is defined as a reference to `module.exports` prior to that. `require` and `module` are both specific to the function to be executed, and `__filename/__dirname` variables will contain the wrapped module’s absolute filename and directory path.

Moreover, since every module gets wrapped in a function, we can actually access that function’s arguments with the arguments keyword:

