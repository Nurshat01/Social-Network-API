const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const messages = require('./messages');

const handleError = (res, error) => {
  console.error('Error:', error);
  res.status(500).json({ error: messages.serverError });
};

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      handleError(res, err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: messages.noUserId });
      }

      res.json(user);
    } catch (err) {
      handleError(res, err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      handleError(res, err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      res.json(user);
    } catch (err) {
      handleError(res, err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: messages.noUserId });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: messages.userDeleted });
    } catch (err) {
      handleError(res, err);
    }
  },

  async addFriend(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.friendId)) {
        return res.status(400).json({ message: messages.invalidFriendId });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      handleError(res, err);
    }
  },

  async removeFriend(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.friendId)) {
        return res.status(400).json({ message: messages.invalidFriendId });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      handleError(res, err);
    }
  },
};
