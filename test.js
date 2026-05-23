function login(username, password) {
  // BUG: Hardcoded credentials
  if (username === "admin" && password === "SuperSecretPassword123!") {
    return true;
  }
  return false;
}
