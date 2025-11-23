function notFoundMiddleware(res, res){
    res.status(404).json({success: false, message: "Route not found" });
}
module.exports = notFoundMiddleware;