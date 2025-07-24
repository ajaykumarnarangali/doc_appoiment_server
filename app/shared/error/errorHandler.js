const APIError = require('./APIError');

function bodyParserHandler(err, req, res, next) {
    console.log(err);
    if ((err instanceof SyntaxError) || (err instanceof TypeError)) {
        return next(new APIError(400, "Malformed JSON."));
    }
    next();
}

function fourOhFourHandler(req, res, next) {
    return next(new APIError(
        404,
        `${req.path} is not valid path to a resource.`
    ))
}

const fourOhFiveHandler = async (req, res, next) => {
    return next(new APIError(
        405,
        "Method Not Allowed",
        `${req.method} method is not supported at ${req.path}.`
    ))
}

const globalErrorHandler = async (err, req, res, next) => {

    let error = err;

    if (!(error instanceof APIError)) {
        error = new APIError(500, err.message);
    }
    res.status(error.status).json({
        success: false,
        message: error.message
    })
}

module.exports = {
    bodyParserHandler,
    fourOhFourHandler,
    fourOhFiveHandler,
    globalErrorHandler
}