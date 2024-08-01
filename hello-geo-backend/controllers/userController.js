const User = require('../models/User.model');

// GET: List of users with pagination, filtering, search, and sorting
exports.getUsers = async (req, res, next) => {
    const { search, limit, offset } = req.query;

    try {
        const query = {};

        // Search logic
        if (search) {
            query.$or = [
                { userName: new RegExp(search, "i") },
                { userEmail: new RegExp(search, "i") },
                { permalink: new RegExp(search, "i") }
            ];
        }

        const options = {};
        if (limit) {
            options.limit = parseInt(limit);
        }
        if (offset) {
            options.skip = parseInt(offset);
        }

        const users = await User.find(query, null, options);
        const totalUsers = await User.countDocuments(query);

        res.json({
            total: totalUsers,
            limit: limit ? parseInt(limit) : totalUsers,
            offset: offset ? parseInt(offset) : 0,
            users: users,
        });
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// GET: Specific user by ID
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// POST: Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const { userName, userEmail, userPassword } = req.body;
        const newUser = new User({ userName, userEmail, userPassword });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// PUT: Update a user completely
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// PATCH: Partially update a user
exports.partialUpdateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// DELETE: Delete a user (soft delete by setting the 'deleted' flag)
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500);
        next(error);
    }
};
