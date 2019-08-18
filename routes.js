// Import packages
const express = require('express')
const router = express.Router()
const m = require('./middleware')
const api = require('./api')

/* A student by id */
router.get(/^(.*)/, m.mustHaveId, api.getStudentById);

/* Add or Update a student */
router.put(/^(.*)/, m.mustHaveId, m.checkFields, api.updateStudent);

/* Delete a student */
router.delete(/^(.*)/, m.mustHaveId, api.deleteStudent);

module.exports = router;
