# Using npm as a Taks Runner

[Source](https://teamtreehouse.com/library/overview-2)

What is a task?
A task is something you want to do over and over again. So if you automate the process you'll save a lot of time. 

Common web development tasks?
* Running test suites
* Compiling Sass/Typescript/CoffeeScript
* Download files from external source that your package needs
* Starting a web server
* Starting a worker (that goes through a queue of jobs like sending out emails or push notifications)

Popular JS tools like grunt/gulp are great for complex projects. For many of the projects you don't need such a powerful tools, you can simply use `npm`> `package.json` > `scripts`. Tasks have a name and a command. It's string that get's executed on the command line when the task is run.

```js
{
    "scripts": {
        "name": "command",
        "hello-world": "echo \"hello world\"",
        "start-server": "node app.js --port=8080",
        "move-files: "mv source/* destination/"
    }
}
``` 
**IMPORTANT** once you have added the command to the `package.json` file you can run it by simply typing `npm run <name>` e.g. `npm run test`, `npm run compile` etc.

## Types of Tasks

* Defaults: built-in tasks are those that are common to most projects
    + "test" - `test` don't require run command so you can simply run it by typing `npm test`
* Arbitrary tasks: are tasks that you can name yourself, they require `npm run` command such as `compile`, since there is not built in task with `compile` name you can run your own task by typing `npm run compile` 

If you don't specify anything in your `package.json` file you'll have per default 

```js
"test": "echo \"Error: no test specified\" && exit 1"   
``` 

It will print out `Error: no test specified` and will exit with `1` meaning that something went wrong. Computer programs successfully run exits with the code of `0` 

There are number of tasks that `npm` has built in. The most common is `test`. Another built in task is `npm install` it installs all dependencies that are part of the project and are defined in `package.json`

### Creating Built-in Task

In the `node_modules/.bin/mocha` in the `node_modules/` there is a hidden directory `/.bin/` and there are hidden command lines that execute e.g. `mocha`. So you can type `node_modules/.bin/mocha` and it will run mocha script. But you can run executables from npm without running this long commands. You can simply add it to the `package.json` 

```js
{
  "name": "dice_simulator_2015",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "test": "mocha"     
  },
  "author": "Andrew Chalkley",
  "license": "MIT",
  "devDependencies": {
    "mocha": "^2.2.5",
    "uglify-js": "^2.4.23"
  }
}
``` 
**Note:** Now you can run mocha by typing `npm test` or `npm run test`. NPM can run any binaries or command line applications.

### Creating Your Own Arbitrary Tasks

We can create a task with the name of our choice. In the sample project we are using `uglifyjs` to combine all javascript files into an `app.js` file. For that we are going to use `uglifyjs`. We can run it by simply use in the command line `node_modules/.bin/uglifyjs src/models/* src/frontend.js -m -c -o ./build/app.js` to run it. The `-m -c -o` are so-called flags e.g. `-c` flag combines the code over a single file and `-o` is the output flag where we want to be saved to.

**Note:** `/build` is the folder where we save our projects for deployment or production. 

**Important:** If you now want to add it to the `package.json`, you need to remove the `node_module...`. See under `scripts` > `uglify`.

```json
{
  "name": "dice_simulator_2015",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "test": "mocha",  
    "uglify": "uglifyjs src/models/* src/frontend.js -m -c -o ./build/app.js"
  },
  "author": "Andrew Chalkley",
  "license": "MIT",
  "devDependencies": {
    "mocha": "^2.2.5",
    "uglify-js": "^2.4.23"
  }
}

``` 
By running this task we are getting a single compresed js file in the `build` folder. Now we need to move all other files into the `build` folder such as `html/css` files. We can create a new task and automate this process. In order to do so we can add a new script to our `package.json`. We can just add commands that we can run in the terminal

```json
"copy-files": "cp src/*.html ./build/ & cp src/*.css ./build/"
// cp is the copy command
// src/*.html is the source folder with a wildcard to put copy all html files
// build/ is the target directory to copy all the files into this directory

``` 

Now we have got two different commands to run two different tasks `compilation` and copying files into the build directory. We can combine these both command but simply adding another script to the `package.json``

```js
"build": "npm run uglify && npm run copy-files"
// the first command runs
// afer the first command has finished the second starts to run
// now we can simply type npm run build and it's going to create a build for us
```

**Important:** If we use only one & (ampersand) it will run the commands at the same time (parallel). If we use && it will run one command after another (in sequence). In our example copying files can run in parallel and we'll not have any impact to each other. However I want each of the scripts to run sequentially so if one failes I know where it failed, I will then know where I need to go to clean up any files. 

**Note:** to clean up a directory we can simply type `rm ./build/*`and it's going to remove everything from inside of the directory.

Our final package.json file

```json
{
  "name": "dice_simulator_2015",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "test": "mocha",  
    "uglify": "uglifyjs src/models/* src/frontend.js -m -c -o ./build/app.js",
    "copy-files": "cp src/*.html ./build/ & cp src/*.css ./build/",
    "build": "npm run uglify && npm run copy-files"
  },
  "author": "Andrew Chalkley",
  "license": "MIT",
  "devDependencies": {
    "mocha": "^2.2.5",
    "uglify-js": "^2.4.23"
  }
}

``` 

NPM is just a dependency manager that NodeJS uses. Also NPM has a lot of built-in command that you can use. You can also build as many command as you like and program everything in a way you like. You don't have to deal with the overhead if you use other task runners such as gulp/grunt. You can check out other commands by simply typing `npm help` and you'll get the full list of built-in commands!


