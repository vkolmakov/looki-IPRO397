import express from 'express';

const app = express()
const port = 3000


app.use('/', (req, res, next) => res.json({ hello: 'world' }))
app.listen(port, () => console.log(`Running on ${port}`))
