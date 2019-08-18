// Import packages
const student = require('./student')

module.exports = {
  getHealth,
  getStudentById,
  updateStudent,
  deleteStudent
}

async function getHealth(req, res, next) {
  res.json({
    success: true
  })
}

/* A student by id */
async function getStudentById(req, res, next) {
  await student.getStudent(req.params)
    .then(student => res.json({
      message: `The student #${req.params.studentId} fetched`,
      data: student,
      success: true
    })).catch(err => {
      if (err.status) {
        res.status(err.status).json({
          message: err.message,
          success: false
        })
      } else {
        res.status(500).json({
          message: err.message,
          success: false
        })
      }
    })
}

/* Insert or Update a student */
async function updateStudent(req, res, next) {
  await student.updateStudent(req.params, req.body)
    .then(student => res.json({
      message: `The student #${req.params.studentId} has been updated`,
      // message: `The student #${student.id} has been created`,
      data: student,
      success: true
    }))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({
          message: err.message,
          success: false
        })
      }
      res.status(500).json({
        message: err.message,
        success: false
      })
    })
}

/* Delete a student */
async function deleteStudent(req, res, next) {
  await student.deleteStudent(req.params)
    .then(student => res.json({
      message: `The student #${req.params.studentId} has been deleted`,
      data: student,
      success: true
    }))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({
          message: err.message,
          success: false
        })
      }
      res.status(500).json({
        message: err.message,
        success: false
      })
    })
}
