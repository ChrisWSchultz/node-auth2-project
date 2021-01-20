const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

const { hasToken } = require('../middleware/users');

const router = express.Router();

router.get('/users', hasToken(), async (request, response) => {
    try {
        let users = await User.get();

        return response.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({"message": "something went wrong"});
    }
});

router.post('/login', async (request, response) => {
    try {
        let {username, password} = request.body;
        let user = await User.getByUsername(username);

        if (user) {
            let isValid = bcrypt.compare(user.password, password);

            if (isValid) {
                const token = jwt.sign({
                    userId: user.id,
                }, process.env.JWT_SECRET);

                response.cookie("token", token);

                return response.status(200).json({"message": `logged in with user id ${user.id}`})
            } else {
                return response.status(401).json({"message": "You shall not pass!"})
            }
        } else {
            return response.status(401).json({"message": "You shall not pass!"})
        }
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({"message": "something went wrong"});
    }
});

router.post('/register', async (request, response) => {
    try {
        const {username, password} = request.body;
        const data = {
            username: username,
            password: await bcrypt.hash(password, 10),
        };

        const user = await User.register(data);

        console.log(user);

        return response.status(201).json({"message": `user created with id: ${user}`});
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({"message": "something went wrong"});
    }
});

module.exports = router;