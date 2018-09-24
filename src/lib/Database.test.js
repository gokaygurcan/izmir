const Database = require('./Database')
const store = new Database('users.db')

describe('Database tests', () => {
    beforeAll(() => store.remove({
        'a': {
            $ne: 5
        }
    }))
    test('Insert new docs remove and query them ', () => {
        store.insert({
                username: 'kucukkanat',
                email: 'htolgasahin@gmail.com'
            })
            
            store.insert({
                username: 'kucukkanat2',
                email: 'h.tolga.sahin@gmail.com'
            })

            store.insert({
                username: 'kucukkanat3',
                email: 'hsahin@gmail.com'
            })

            store.find({username:{$regex:/kuc/}})
            .then(docs => {
                // console.log(docs)
            })

            store.remove({username:'kucukkanat2'})
            .then(removed => {
                // console.log(removed)
            })
            store.find({username:{$regex:/kuc/}})
            .then(docs => {
                console.log(docs)
            })
    })
})