const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

exports.getAllBootcamps = asyncHandler(async (req, res, next) => {

    let query;

    const reqQuery = { ...req.query };

    const removeFields = ["sort"];

    removeFields.forEach(val => delete reqQuery[val]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    query = Bootcamp.find(JSON.parse(queryStr));

    if(req.query.sort) {
        const sortByArr = req.query.sort.split(',');

        const sortByStr = sortByArr.join(' ');

        query = query.sort(sortByStr);
    } else {
        query = query.sort('-price');
    } 

    const bootcamps = await query;

    res.status(200).json({
        success: true,
        data: bootcamps
    })
});

exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(200).json({
        success: true,
        data: bootcamp
    })
});

exports.updateBootCampById = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp with id ${req.params.id}`, 404))
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(201).json({
        success: true,
        data: bootcamp
    })

});

exports.deleteBootCampById = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp with id ${req.params.id}`, 404))
    }

    await bootcamp.remove();

    res.status(200).json({
        success: true,
        data: {}
    })
});
