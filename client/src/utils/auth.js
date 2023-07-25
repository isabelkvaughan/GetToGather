import decode from "jwt-decode";

class AuthService {
  getProfile() {
    try {
      return decode(this.getToken());
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    try {
      localStorage.setItem("id_token", idToken);
      window.location.assign("/");
    } catch (error) {
      console.error("Error saving token:", error);
    }
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
