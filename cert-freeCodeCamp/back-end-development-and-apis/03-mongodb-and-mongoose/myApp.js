require('dotenv').config()

const mongoose = require('mongoose')

const MONGO_URI = process.env['MONGO_URI']

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] },
})

let Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['pizza', 'burger'],
  })
  person.save((err, data) => {
    done(err, data)
  })
}

const createManyPeople = (arrayOfPeople, done) => {
  const modelsOfPeople = Person.create(arrayOfPeople, (err, data) => {
    done(err, data)
  })
}

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    done(err, data)
  })
}

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    done(err, data)
  })
}

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    done(err, data)
  })
}

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger'
  Person.findById(personId, (err, data) => {
    if (err) {
      return done(err)
    }
    data.favoriteFoods.push(foodToAdd)
    data.save((err, data) => {
      done(err, data)
    })
  })
}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      done(err, data)
    }
  )
}

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    done(err, data)
  })
}

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary'
  Person.remove({ name: nameToRemove }, (err, data) => {
    done(err, data)
  })
}

const queryChain = (done) => {
  const foodToSearch = 'burrito'
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      done(err, data)
    })
}

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person
exports.createAndSavePerson = createAndSavePerson
exports.findPeopleByName = findPeopleByName
exports.findOneByFood = findOneByFood
exports.findPersonById = findPersonById
exports.findEditThenSave = findEditThenSave
exports.findAndUpdate = findAndUpdate
exports.createManyPeople = createManyPeople
exports.removeById = removeById
exports.removeManyPeople = removeManyPeople
exports.queryChain = queryChain
