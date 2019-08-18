// Import packages
const fs = require('fs')
const _ = require('lodash');

module.exports = {
  newStudentId,
  studentIdExist,
  writeJSONFile
}

/* newStudentId */
function newStudentId() {
  return `rn${[...Array(5)].map(i=>(~~(Math.random()*36)).toString(36)).join('')}`
}

/* studentIdExist */
async function studentIdExist(type, id) {
  return new Promise(async (resolve, reject) => {
    let fPath = `./data/${id.studentId}.json`
    //file exists
    if (fs.existsSync(fPath) || type == 'update') {
      let array = fs.existsSync(fPath) ? JSON.parse(fs.readFileSync(fPath, 'utf8')) : [];

      let query = _.split(id['0'], `/${id.studentId}`)
      query = _.split(query[1], '/')
      query = _.filter(query, _.size)
      query = _.join(query, '.')
      // console.log(query)

      // make object clean and merge params
      // let conditions = _.pickBy(_.extend.apply({}, id.properties),_.identity)
      let row = _.filter([array], {
        id: id.studentId
      })[0]

      console.log(row, type);
      if (type == 'fetch') {
        let courses = _.pick(array, query)
        row.courses = courses;
      }

      if ((!row || _.isEmpty(row.courses, true)) && type != 'update') {
        reject({
          message: 'Student properties does not exist',
          status: 404
        })
      }
      let resp = {
        data: row,
        query
      }
      resolve(resp)
    } else {
      reject({
        message: 'Student id is not exist',
        status: 404
      })
    }
  })
}

/* writeFile */
function writeJSONFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}
