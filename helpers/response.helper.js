successResponse = (res, result, msg) => {
     res.status(200).send({
        success: true,
        error: false,
        result,
        message: msg
    });
}

errorResponse = (res, err, msg) => {
     res.status(500).send({
        success: false,
        error: true,
        err,
        message: msg
    });
}

module.exports = {
    successResponse, errorResponse
}