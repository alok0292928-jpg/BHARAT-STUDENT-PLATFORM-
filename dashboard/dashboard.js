const userId = localStorage.getItem("userId");

// Agar login nahi hua
if (!userId) {
    window.location.href = "../auth/index.html";
}

// Logout
window.logoutUser = function () {
    localStorage.removeItem("userId");
    window.location.href = "../auth/index.html";
};
