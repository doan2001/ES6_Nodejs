import User from './../models/user';

export const detailUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
}

export const list = (req, res) => {
    User.find((error, data) => {
        if(error) {
            return res.status(400).json({
                message: 'Không tìm thấy danh sách user'
            })
        }
        res.json(data);
    })
}

export const userById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if(error || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next();
    })
}

export const id = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if(error || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.user = user;
        next();
    })
}

export const update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: 'You are not authorized to perform in action'
                })
            }
            req.profile.hashed_password = undefined;
            req.profile.salt = undefined;
            res.json(user);
        }

    );
}

export const remove = (req, res) => {
    const removeUser = req.user;
    removeUser.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                err: 'Xóa user không thành công !'
            })
        }
        res.json({
            data,
            message: 'Xóa thành công user !'
        })
    })
}