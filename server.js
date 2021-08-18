
require('dotenv').config()
const { Octokit } = require('octokit')
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const PATH_PREFIX = process.env.PATH_PREFIX || ''
const PAT = process.env.PAT

const server = express()
server.use(cors())
server.use(express.json())

const octokit = new Octokit({ auth: PAT })

server.post(PATH_PREFIX + '/', async (req, res) => {
  octokit.graphql(req.body.query, req.body.variables)
    .then(response => res.send(response))
    .catch(e => res.status(400).send(e))
})

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})