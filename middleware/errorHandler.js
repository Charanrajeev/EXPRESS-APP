const {contants} = require("../constants")
const errorHandler = (err,req,res,next)=>{
const statusCode = res.statusCode?res.statusCode:500;
switch(statusCode){
    case contants.VALIDATION_ERRR:
        res.json({
            title:"Validation Failed",
            message:err.message,
            stackTrace:err.stack
        })
        break;
        case contants.NOT_FOUND:
            res.json({
                title:"Not Found",
                message:err.message,
                stackTrace:err.stack
            })
            break;
            case contants.FORBIDDEN:
                res.json({
                    title:"forbidden",
                    message:err.message,
                    stackTrace:err.stack
                })
                break;
                case contants.UNAUTHORIZED:
                    res.json({
                        title:"not authorized",
                        message:err.message,
                        stackTrace:err.stack
                    })
                    break;
                    case contants.SERVER_ERROR:
                        res.json({
                            title:"Server Error",
                            message:err.message,
                            stackTrace:err.stack
                        })
                        break;
                    default:
                     console.log("No Error All things are Good");

}
}
module.exports =errorHandler