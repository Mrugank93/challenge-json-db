const tape = require('tape')
const jsonist = require('jsonist')

const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())
const endpoint = `http://localhost:${port}`
const helper = require('./helper.js')

const server = require('./server')

tape('health', async function(t) {
  const url = `${endpoint}/health`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful healthcheck')
    t.end()
  })
})

/* GET /:student-id/:propertyName(/:propertyName) STARTS*/

tape('student\'s courses', async function(t) {
  const url = `${endpoint}/rn1abu8/courses/calculus`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful response')
    t.end()
  })
})

tape('student\'s quizzes for particular course', async function(t) {
  const url = `${endpoint}/rn1abu8/courses/calculus/quizzes`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful response')
    t.end()
  })
})

tape('student\'s quiz by id', async function(t) {
  const url = `${endpoint}/rn1abu8/courses/calculus/quizzes/ye0ab61`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful response')
    t.end()
  })
})

/* GET /:student-id/:propertyName(/:propertyName) ENDS*/

/* PUT /:student-id/:propertyName(/:propertyName) STARTS*/
const studentId = helper.newStudentId();
console.log(`Dynamic Student Id ${studentId}`)

tape('create file', async function(t) {
  const url = `${endpoint}/${studentId}/courses/calculus/quizzes/ye0ab61`
  const data = {
    'score': 50
  }
  jsonist.put(url, data, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful response')
    t.end()
  })
})

tape('create properties', async function(t) {
  const url = `${endpoint}/${studentId}/courses/calculus/quizzes/ye0ab62`
  const data = {
    'score': 90
  }
  jsonist.put(url, data, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful response')
    t.end()
  })
})

tape('student\'s quizzes for particular course : after create', async function(t) {
  const url = `${endpoint}/${studentId}/courses/calculus/quizzes`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful response')
    t.end()
  })
})

tape('update properties ', async function(t) {
  const url = `${endpoint}/${studentId}/courses/calculus/quizzes/ye0ab61`
  const data = {
    'score': 98
  }
  jsonist.put(url, data, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful response')
    t.end()
  })
})

tape('student\'s quiz by id : after update', async function(t) {
  const url = `${endpoint}/${studentId}/courses/calculus/quizzes`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful response')
    t.end()
  })
})
/* PUT /:student-id/:propertyName(/:propertyName) ENDS*/

/* DELETE /:student-id/:propertyName(/:propertyName) STARTS*/
tape('student\'s quiz by id : after delete', async function(t) {
  const url = `${endpoint}/${studentId}/courses/calculus/quizzes/ye0ab61`
  jsonist.delete(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful response')
    t.end()
  })
})

tape('student\'s quizzes for particular course : after delete', async function(t) {
  const url = `${endpoint}/${studentId}/courses/calculus`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful response')
    t.end()
  })
})
/* DELETE /:student-id/:propertyName(/:propertyName) ENDS*/

tape('cleanup', function(t) {
  server.close()
  t.end()
})
