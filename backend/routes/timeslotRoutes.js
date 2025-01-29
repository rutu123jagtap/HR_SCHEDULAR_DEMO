const express = require('express');
// const TimeSlot = require('../models/Timeslot');
const TimeSlot = require('../models/TimeSlot'); // Import your model
const router = express.Router();

// POST route to create a time slot
router.post('/api/slots', async (req, res) => {
  try {
    const { startTime, endTime, title, description } = req.body;

    // Check for conflicts
    const conflict = await TimeSlot.findOne({
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: 'Time slot conflicts with existing appointment' });
    }

    const timeSlot = new TimeSlot({
      startTime,
      endTime,
      title,
      description,
      createdBy: req.user?._id // If using authentication
    });

    await timeSlot.save();
    res.status(201).json(timeSlot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to retrieve all time slots
router.get('/api/slots', async (req, res) => {
  try {
    const slots = await TimeSlot.find().sort({ startTime: 1 });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update a time slot
router.put('/api/slots/:id', async (req, res) => {
  try {
    const { startTime, endTime, title, description } = req.body;

    // Check for conflicts excluding current slot
    const conflict = await TimeSlot.findOne({
      _id: { $ne: req.params.id },
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: 'Time slot conflicts with existing appointment' });
    }

    const updatedSlot = await TimeSlot.findByIdAndUpdate(
      req.params.id,
      { startTime, endTime, title, description },
      { new: true }
    );
    res.json(updatedSlot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete a time slot
router.delete('/api/slots/:id', async (req, res) => {
  try {
    await TimeSlot.findByIdAndDelete(req.params.id);
    res.json({ message: 'Time slot deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
