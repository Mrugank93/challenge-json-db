// Import packages
const { STATUS_CODES } = require('http')

module.exports = {
  notFound,
  handleError,
  mustHaveId,
  checkFields
}

function handleError (err, req, res, next) {
  if (res.headersSent) return next(err)

  if (!err.statusCode) console.error(err)
  const statusCode = err.statusCode || 500
  const errorMessage = STATUS_CODES[statusCode] || 'Internal Error'
  res.status(statusCode).json({ error: errorMessage })
}

function notFound (req, res) {
  res.status(404).json({ error: 'Not Found' })
}

function mustHaveId(req, res, next) {
    const params = req.params[0].split('/');
    req.params.studentId = params[1];

    let propertyArray = [];
    params.forEach(function (item , index) {
      if(item && index > 0){
        if ( index % 2 == 0) {
          let obj = {};
        	obj[item] = params[index+1]
          propertyArray.push(obj);
        }
      }
    })
    req.params.properties = propertyArray;

    // console.log(req.params);
    if (!req.params.studentId) {
        res.status(400).json({ message: 'Student Id is required' })
    } else {
        next()
    }
}

function checkFields(req, res, next) {
    const { fname, lname, courses, score } = req.body
    if (fname || lname || courses || score || quizzes) {
        next()
    } else {
        res.status(400).json({ message: 'Fields are not valid' })
    }
}
