/* =================================
    FREELANCEHUB AUTHENTICATION
    React-compatible Local Storage
================================= */

// Get all registered users
export function getUsers() {
    return JSON.parse(localStorage.getItem("freelanceUsers")) || [];
}

// SIGNUP
export function signupUser(name, email, password, role) {
    const users = getUsers();

  // Check duplicate email
    const existingUser = users.find(function (user) {
    return user.email === email;
    });

    if (existingUser) {
    return {
        success: false,
        message: "An account with this email already exists."
    };
    }

  // Create new user
    const newUser = {
    id: Date.now(),
    name: name,
    email: email,
    password: password,
    role: role
    };

  // Save user
    users.push(newUser);

    localStorage.setItem(
    "freelanceUsers",
    JSON.stringify(users)
    );

    return {
    success: true,
    message: "Account created successfully!"
    };
}

// LOGIN
export function loginUser(email, password) {
    const users = getUsers();

  // Find matching user
    const user = users.find(function (account) {
    return (
        account.email === email &&
        account.password === password
    );
    });

    if (!user) {
    return {
        success: false,
        message: "Invalid email or password."
    };
    }

  // Save logged-in user
    localStorage.setItem(
    "loggedInUser",
    JSON.stringify(user)
    );

    return {
    success: true,
    user: user,
    message: "Login successful!"
    };
}

// GET LOGGED-IN USER
export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}

// LOGOUT
export function logoutUser() {
    localStorage.removeItem("loggedInUser");
}