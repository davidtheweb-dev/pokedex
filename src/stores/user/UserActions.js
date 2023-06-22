export default {
  setUserData(loginData) {
    this.logged = loginData.logged;
    this.name = loginData.name;
    this.token = loginData.token;
  },
};
