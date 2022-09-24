const mongoose = require ('mongoose')
const { Schema } = mongoose

const schemaServer = new Schema ({
    name : String,
    generations: String,
    creatorId: String,
    countMembers: Number
},{
    timestamps: true
})

module.exports = mongoose.model('Server', schemaServer)