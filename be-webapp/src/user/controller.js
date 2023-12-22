const UsersService = require('./service');

exports.getUser = async (req, res) => {
    try {
        console.log(req.query.id)
        const user = await UsersService.getUser(req.query.id);
        res.json(user);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while getting user' });
    }
};

// exports.updateUser = async (req, res) => {
//     try {
//         const updatedUser = await UsersService.updateUser(req.body.user_id, req.body.userLogin, req.body.passHash);
//         res.cookie('login', userLogin);
//         res.cookie('hash', passHash);
//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).send({ message: 'Error while updating user' });
//     }
// };