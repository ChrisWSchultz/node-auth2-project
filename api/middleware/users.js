const jwt = require("jsonwebtoken");

const hasToken = () => {
    return async (request, response, next) => {
        const gandalf = {"message": "You shall not pass!"};

        try {
            const token = request.cookies.token;

            if (token) {
                jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                    if(error) {
                        return response.status(401).json(gandalf);
                    } else {
                        request.token = decoded;

                        next();
                    }
                });
            } else {
                return response.status(401).json(gandalf);
            }

        } catch(error) {
            next(error);
        }
    }
};

module.exports = {
    hasToken,
};