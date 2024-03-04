const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  removeThought,
  createReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// Thoughts routes
router.get('/', getThoughts);
router.post('/', createThought);

router.get('/:thoughtId', getSingleThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', removeThought);

router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
