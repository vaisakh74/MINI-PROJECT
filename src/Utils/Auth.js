// src/utils/auth.js
const USERS_KEY = "foody_users";
const CURRENT_KEY = "foody_currentUser";

// load users array
export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register({ name, email, password, role }) {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    return { success: false, message: "Email already registered" };
  }
  const newUser = { id: Date.now(), name, email, password, role };
  users.push(newUser);
  saveUsers(users);
  // automatically log in after registration
  localStorage.setItem(CURRENT_KEY, JSON.stringify({ id: newUser.id, name, email, role }));
  return { success: true, user: { id: newUser.id, name, email, role } };
}

export function login({ email, password }) {
  const users = getUsers();
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) {
    return { success: false, message: "Invalid credentials" };
  }
  const user = { id: found.id, name: found.name, email: found.email, role: found.role };
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function logout() {
  localStorage.removeItem(CURRENT_KEY);
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
