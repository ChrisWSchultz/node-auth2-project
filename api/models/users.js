const db = require('../../data/config');

const get = () => {
    return db.table('users');
};

const getByUsername = (username) => {
    return db.table('users')
        .where('username', username)
        .first();
};

const register = async (data) => {
    let [id] = await db.table('users').insert(data);

    return id;
};

module.exports = {
    get,
    getByUsername,
    register
};