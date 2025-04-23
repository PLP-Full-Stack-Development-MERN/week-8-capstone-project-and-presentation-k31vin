
// Dummy users data
const users = [
  {
    id: "1",
    name: "Emma Thompson",
    email: "client@example.com",
    password: "$2a$10$cktX8YjwzShQ2a7d5wgm1eIZtFlXIBj9NR6hryqTYizSPgk4QhyoG", // "password"
    role: "client",
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    pregnancyStage: "Second Trimester",
    dietaryRestrictions: ["Lactose Intolerant"],
    allergies: ["Nuts"]
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    email: "nutritionist@example.com",
    password: "$2a$10$cktX8YjwzShQ2a7d5wgm1eIZtFlXIBj9NR6hryqTYizSPgk4QhyoG", // "password"
    role: "nutritionist",
    profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
    specialization: ["Prenatal Nutrition", "Gestational Diabetes"],
    yearsOfExperience: 8
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$cktX8YjwzShQ2a7d5wgm1eIZtFlXIBj9NR6hryqTYizSPgk4QhyoG", // "password"
    role: "admin",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg"
  }
];

/**
 * Get all users
 */
const getAllUsers = (req, res) => {
  // Return users without passwords
  const sanitizedUsers = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  
  res.status(200).json(sanitizedUsers);
};

/**
 * Get user by ID
 */
const getUserById = (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Remove password from response
  const { password, ...userWithoutPassword } = user;
  
  res.status(200).json(userWithoutPassword);
};

/**
 * Login user
 */
const loginUser = (req, res) => {
  const { email, password } = req.body;
  
  // Simple password check for mock data
  const user = users.find(u => u.email === email);
  
  if (!user || password !== "password") {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  
  // Remove password from response
  const { password: pass, ...userWithoutPassword } = user;
  
  res.status(200).json({
    user: userWithoutPassword,
    token: "mock-jwt-token-" + user.id
  });
};

/**
 * Register user
 */
const registerUser = (req, res) => {
  const { name, email, password, role } = req.body;
  
  // Check if user already exists
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }
  
  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    role: role || "client",
    password: "$2a$10$cktX8YjwzShQ2a7d5wgm1eIZtFlXIBj9NR6hryqTYizSPgk4QhyoG", // "password"
    profilePicture: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`
  };
  
  users.push(newUser);
  
  // Remove password from response
  const { password: pass, ...userWithoutPassword } = newUser;
  
  res.status(201).json({
    user: userWithoutPassword,
    token: "mock-jwt-token-" + newUser.id
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  loginUser,
  registerUser
};
