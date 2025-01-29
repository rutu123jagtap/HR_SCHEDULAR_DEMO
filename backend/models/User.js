const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String
  });
  
  const User = mongoose.model('User', userSchema);