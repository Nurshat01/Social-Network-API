const { Thought, User } = require('../models');
const messages = require('./messages');

const handleError = (res, error) => {
  console.error('Error:', error);
  res.status(500).json({ error: messages.serverError });
};

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      handleError(res, err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: messages.noThoughtId });
      }

      res.json(thought);
    } catch (err) {
      handleError(res, err);
    }
  },

  async createThought(req, res) {
    try {
      const { thoughtText, username, userId } = req.body;
      if (!thoughtText || !username || !userId) {
        return res.status(400).json({ message: messages.incompleteData });
      }
  
      const thought = await Thought.create({ thoughtText, username, userId });
  
      await User.updateOne(
        { _id: userId },
        { $addToSet: { thoughts: thought._id } }
      );
  
      res.status(201).json(thought);
    } catch (err) {
      handleError(res, err);
    }
  },
  
  

  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: messages.noThoughtId });
      }

      res.json(thought);
    } catch (err) {
      handleError(res, err);
    }
  },

  async removeThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: messages.noThoughtId });
      }

      await User.updateOne(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.json({ message: messages.thoughtDeleted });
    } catch (err) {
      handleError(res, err);
    }
  },

  async createReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      handleError(res, err);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      handleError(res, err);
    }
  },
};

module.exports = thoughtController;
