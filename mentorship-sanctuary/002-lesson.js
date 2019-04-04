const S = require("sanctuary")
const $ = require("sanctuary-def")
const fs = require("fs")

const Location = $.RecordType ({city: $.String})

// type constructor is $.Array (Location)
// User :: Type 
const User = $.RecordType 
({
  name: $.String, 
  age: $.NonNegativeInteger, 
  location: ($.Array (Location))
})



const file = fs.readFileSync("./test.json", "utf-8")

// parsedFile :: Maybe User
const parsedFile = S.parseJson (S.is (User)) (file)

console.log(
  file,
  parsedFile,
  // provide a User type as the first argument
  // use map rather than pulling out out of the maybe
  // take out the value at the edges of the program
  // work with either, it provides Left(exit 1) Right(exit 0)
  S.fromMaybe ({name: "Default", age: 35, location: [{city: "Berlin"}]}) (parsedFile)
)
