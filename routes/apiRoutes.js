var express 					= require('express');
var router 						= express.Router();
var constants					= require('../scripts/constants');

var apps 						= require(constants.paths.controllers + '/api/application');
var auth 						= require(constants.paths.controllers + '/api/auth');
var users 						= require(constants.paths.controllers + '/api/users');
var fileupload					= require(constants.paths.controllers + '/api/fileupload');
var groups					    = require(constants.paths.controllers + '/api/groups');
var positions                   = require(constants.paths.controllers + '/api/positions');
var candidates                = require(constants.paths.controllers + '/api/candidates');
var feedbackDef 			    = require(constants.paths.controllers + '/api/feedbackDefs');
var feedbacks				    = require(constants.paths.controllers + '/api/feedbacks');

router.post('/api/v1/login', auth.login);
router.get('/api/v1/app/info', apps.info);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
 router.get('/api/v1/secure/admin/users', users.getAll);
 router.get('/api/v1/secure/admin/users/:id', users.getOneById);
 router.post('/api/v1/secure/admin/users/', users.create);
 router.put('/api/v1/secure/admin/users/:id', users.updateById);
 router.delete('/api/v1/secure/admin/users/:id', users.deleteById);
 router.get('/api/v1/secure/admin/users/email/:email', users.getByEmail);
 router.get('/api/v1/secure/admin/users/findAll/data', users.getAllUsers);
 router.get('/api/v1/secure/admin/users/find/find', users.getWithQuery);

//Route for file upload
router.post('/api/v1/upload/:entity',fileupload.create);
router.post('/api/v1/multiupload/:entity',fileupload.create);

// List of service routes for groups
router.get('/api/v1/secure/admin/groups', groups.getAll);
router.get('/api/v1/secure/admin/groups/:id', groups.getOneById);
router.post('/api/v1/secure/admin/groups', groups.create);
router.put('/api/v1/secure/admin/groups/:id', groups.updateById);
router.delete('/api/v1/secure/admin/groups/:id', groups.deleteById);

// List of service routes for positions
router.get('/api/v1/secure/positions', positions.getAll);
router.get('/api/v1/secure/positions/:id/:candidateId/feedback', positions.getFeedbackById);
router.get('/api/v1/secure/positions/:id/candidates', positions.getCandidatesById);
router.get('/api/v1/secure/positions/:id', positions.getOneById);
router.post('/api/v1/secure/positions', positions.create);
router.put('/api/v1/secure/positions/:id', positions.updateById);
router.put('/api/v1/secure/positions/:id/:feedbackId', positions.updateFeedBackId);
router.delete('/api/v1/secure/positions/:id', positions.deleteById);
//router.delete('/api/v1/secure/positions/:id', positions.deleteById);
//router.put('/api/v1/secure/positions/addcandidates/:id/:candidate', positions.updateCandidates);

// List of service routes for feedbackDefs
router.get('/api/v1/secure/feedbackDefs/id/:id', feedbackDef.getOneById);
router.get('/api/v1/secure/feedbackDefs', feedbackDef.getAll);
router.post('/api/v1/secure/feedbackDefs', feedbackDef.create);
router.put('/api/v1/secure/feedbackDefs/:id', feedbackDef.updateById);
router.delete('/api/v1/secure/feedbackDefs/:id', feedbackDef.deleteById);
router.get('/api/v1/secure/feedbackDefs/find', feedbackDef.getWithQuery);

// List of service routes for feedbacks
router.get('/api/v1/secure/feedbacks', feedbacks.getAll);
router.get('/api/v1/secure/feedbacks/:id', feedbacks.getOneById);
router.get('/api/v1/secure/feedbacks/:id/:candidateId/:interviewerId', feedbacks.getFeedbackById);
router.post('/api/v1/secure/feedbacks', feedbacks.create);
router.put('/api/v1/secure/feedbacks/:id', feedbacks.updateById);
router.delete('/api/v1/secure/feedbacks/:id', feedbacks.deleteById);

// List of service routes for candidates
router.get('/api/v1/secure/candidates', candidates.getAll);

module.exports = router;
