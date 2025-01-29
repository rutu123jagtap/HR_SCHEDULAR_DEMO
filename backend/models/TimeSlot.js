const mongoose = require('mongoose');
const timeSlotSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    title: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  
  const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);
  module.exports = TimeSlot;

//   app.post('/api/slots', async (req, res) => {
//     try {
//       const { startTime, endTime, title, description } = req.body;
      
//       // Check for conflicts
//       const conflict = await TimeSlot.findOne({
//         $or: [
//           {
//             startTime: { $lt: endTime },
//             endTime: { $gt: startTime }
//           }
//         ]
//       });
  
//       if (conflict) {
//         return res.status(400).json({ message: 'Time slot conflicts with existing appointment' });
//       }
  
//       const timeSlot = new TimeSlot({
//         startTime,
//         endTime,
//         title,
//         description,
//         createdBy: req.user?._id // If using authentication
//       });
  
//       await timeSlot.save();
//       res.status(201).json(timeSlot);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
//   app.get('/api/slots', async (req, res) => {
//     try {
//       const slots = await TimeSlot.find().sort({ startTime: 1 });
//       res.json(slots);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
//   app.put('/api/slots/:id', async (req, res) => {
//     try {
//       const { startTime, endTime, title, description } = req.body;
      
//       // Check for conflicts excluding current slot
//       const conflict = await TimeSlot.findOne({
//         _id: { $ne: req.params.id },
//         $or: [
//           {
//             startTime: { $lt: endTime },
//             endTime: { $gt: startTime }
//           }
//         ]
//       });
  
//       if (conflict) {
//         return res.status(400).json({ message: 'Time slot conflicts with existing appointment' });
//       }
  
//       const updatedSlot = await TimeSlot.findByIdAndUpdate(
//         req.params.id,
//         { startTime, endTime, title, description },
//         { new: true }
//       );
//       res.json(updatedSlot);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
//   app.delete('/api/slots/:id', async (req, res) => {
//     try {
//       await TimeSlot.findByIdAndDelete(req.params.id);
//       res.json({ message: 'Time slot deleted' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
//   // Auth routes
//   app.post('/api/register', async (req, res) => {
//     try {
//       const { email, password, name } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new User({ email, password: hashedPassword, name });
//       await user.save();
//       res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
//   app.post('/api/login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ message: 'User not found' });
//       }
//       const validPassword = await bcrypt.compare(password, user.password);
//       if (!validPassword) {
//         return res.status(400).json({ message: 'Invalid password' });
//       }
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//       res.json({ token });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));