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
            } else {
                res.status(200).json(user);
            }
        };

        //Test was limit params in query
        var email = req.query.email;
        var displayName = req.query.username;

        var options = {};

        if(email){
            options.email = email;
        }
        if(displayName){
            options.displayName = displayName;
        }

        User.find(options)
            .limit(1) //if no options return first one
            .exec(callBack);
    };

    return {
        getAllUsers: getAllUsers,
        getUserByOptions: getUserByOptions
    }
}

module.exports = usersController;