const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = `mongodb://brainykids:${encodeURIComponent('K140790k')}@47.105.55.128:27017/homeworkblog`
// Connect MongoDB at default port 27017.
let mong = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
