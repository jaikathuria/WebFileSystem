const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const { readDirectory } = require('./explorer')

app.get('/', (req, res) => {
    return res.json(readDirectory('root','root'));
})

app.listen(3001, () => console.log('Example app listening on port 3001!'))