const router = require('express').Router();
const Hero = require('../models/model');
const errorHandler = require('../error-handler');

// save, findById, findByIdAndUpdate, findAll, findByIdAndRemove