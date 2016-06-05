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

    return {
        getAllUsers: getAllUsers
    }
}

module.exports = usersController;