let jwt = require('jsonwebtoken');
let sequelize = require('../db');
let User = sequelize.import('../models/user');

module.exports = function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next()
    } else {
        let sessionToken = req.headers.authorization;
        console.log(sessionToken)
        if(!sessionToken) return res.status(403).send({ auth : false,message: 'No token provided.' });
        else {
            jwt.verify(sessionToken, process.env.JWT, (err, success) => {
                console.log()
                if(success){
                    User.findOne({where: {id: success.id}}).then(user => {
                        req.user = user;
                        next();
                    },
                    function(){
                        res.status(401).send({error: 'Not autorized'});
                        console.log(res)
                    });
                } else {
                    res.status(400).send({error: 'Not authorized'});
                    console.log(res)
                }
            });
        }
    }
}