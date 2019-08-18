// Import packages
const helper = require('./helper.js')
const set = require('set-value');
const _ = require('lodash');

module.exports = {
  getStudent,
  updateStudent,
  deleteStudent
}

function getStudent(params) {
  return new Promise((resolve, reject) => {
    helper.studentIdExist('fetch', params)
      .then(student => {
        resolve(student.data)
      })
      .catch(err => reject(err))
  })
}

// function insertStudent(newStudent) {
//   return new Promise((resolve, reject) => {
//     const id = {
//       id: helper.newStudentId()
//     }
//
//     newStudent = {
//       ...id,
//       ...newStudent
//     }
//     students.push(newStudent)
//     helper.writeJSONFile(filename, students)
//     resolve(newStudent)
//   })
// }

function updateStudent(params, newStudent) {
  return new Promise((resolve, reject) => {
    helper.studentIdExist('update', params)
      .then(resp => {
        let student = resp.data ? resp.data : {}
        student.id = params.studentId;

        // set property
        set(student, resp.query, newStudent);
        helper.writeJSONFile(`./data/${params.studentId}.json`, student)

        let courses = _.pick(student, resp.query)
        if(resp.data) student.courses = courses;

        resolve(student)
      })
      .catch(err => reject(err))
  })
}

function deleteStudent(params) {
  return new Promise((resolve, reject) => {
    helper.studentIdExist('remove', params)
      .then((resp) => {
        let student = resp.data

        // get dynamic query and Item
        let deleteQuery = _.split(resp.query, '.')
        let deleteItem = deleteQuery.pop()
        deleteQuery = _.join(deleteQuery, '.')

        let courses = deleteQuery.split('.').reduce((a, b) => a[b], student)
        delete courses[deleteItem]

        set(student, deleteQuery, courses);
        helper.writeJSONFile(`./data/${params.studentId}.json`, student)

        resolve(student)
      })
      .catch(err => reject(err))
  })
}
