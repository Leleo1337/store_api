import mongoose from 'mongoose'

function connectDB(databaseAcess){
    return mongoose.connect(databaseAcess).then(() => console.log('connected to database'))
}

export default connectDB