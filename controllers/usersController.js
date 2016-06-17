/**
 * Created by Elf on 05.06.2016.
 */

var usersController = (User)=> {
    var getAllUsers = (req, res)=> {
        var callBack = (err, users)=> {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(users);
            }
        };

        //Test was limit params in query
        var usersCount = parseInt(req.query.count);

        if (!isNaN(usersCount) && isFinite(usersCount)) {
            User.find({})
                .limit(usersCount)
                .exec(callBack);
        } else {
            User.find({})
                .exec(callBack);
        }
    };

    var getUserByOptions = (req, res)=> {
        var callBack = (err, user)=> {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else if (user.length === 0) {
                res.status(404).json({
                    message: 'User not found!',
                    success: false
                });
            } else {
                res.status(200).json(user);
            }
        };

        //Test was limit params in query
        var email = req.query.email;
        var displayName = req.query.displayName;

        var options = {};

        if (email) {
            options.email = email;
        }
        if (displayName) {
            options.displayName = displayName;
        }

        User.find(options)
            .limit(1) //if no options return first one
            .exec(callBack);
    };

    var checkUserNameExists = (req, res)=> {
        var callBack = (err, users)=> {
            if (err) {
                //Server error
                console.log(err);
                res.status(500).json({
                    error: err,
                    message: 'Server error',
                    couldUseData: false
                });
            } else if (users.length === 0) {
                //Where is no user with such email
                res.status(200).json({
                    message: 'User not found could use name!',
                    couldUseData: true
                });
            } else {
                res.status(409).json({
                    message: 'User with this data already exists!',
                    couldUseData: false
                });
            }
        };

        var displayName = req.query.displayName;

        //Name not set so create User with such name not allowed
        if (!displayName) {
            res.status(409).json({
                message: 'User name for check not set',
                couldUseData: false
            });
            return;
        }

        User.find({displayName: displayName})
            .limit(1)
            .exec(callBack);
    };

    var checkUserEmailExists = (req, res)=> {
        var callBack = (err, users)=> {
            if (err) {
                //Server error
                console.log(err);
                res.status(500).json({
                    error: err,
                    message: 'Server error',
                    couldUseData: false
                });
            } else if (users.length === 0) {
                //Where is no user with such email
                res.status(200).json({
                    message: 'User email not found could use email!',
                    couldUseData: true
                });
            } else {
                res.status(409).json({
                    message: 'User with this data already exists',
                    couldUseData: false
                });
            }
        };

        var email = req.query.email;

        //Name not set so create User with such email not allowed
        if (!email) {
            res.status(409).json({
                message: 'User email for check not set',
                couldUseData: false
            });
            return;
        }

        User.find({email: email})
            .limit(1)
            .exec(callBack);
    };

    return {
        getAllUsers: getAllUsers,
        getUserByOptions: getUserByOptions,
        checkUserEmailExists: checkUserEmailExists,
        checkUserNameExists: checkUserNameExists
    }
}

module.exports = usersController;