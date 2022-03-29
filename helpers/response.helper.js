successResponse = (res, result, msg) => {
    return res.status(200).send({
        success: true,
        error: false,
        result,
        message: msg
    });
}

errorResponse = (res, err, msg) => {
    return res.status(500).send({
        success: false,
        error: true,
        err,
        message: msg
    });
}

module.exports = {
    successResponse, errorResponse
}