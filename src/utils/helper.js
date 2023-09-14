
exports.handleResponse = (res, data, status = 200) => {
   return res.status(status).json({data, error: false})
}

exports.handleError = (res, error, status = 400) => {
        if(error.details){
            const data = {}
            error?.details.forEach(v => {
                data[v.context?.key] = [v.message.replace(/"/g, '')]
            })
        return res.status(status).json({error: data})
        }
        else{
            return res.status(400).json({message:error, error:true})
        }
}