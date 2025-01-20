class UserInfo {
  userId = 0;
  userName = "";
  userMail = "";
  userPass = "";
  userAge = 0;
  userGender = "male";
  userMobile = "";
  userAddress = "";

  constructor(
    userName,
    userMail,
    userPass,
    userAge,
    userGender,
    userMobile,
    userAddress
  ) {
    this.userName = userName;
    this.userMail = userMail;
    this.userPass = userPass;
    this.userAge = userAge;
    this.userGender = userGender;
    this.userMobile = userMobile;
    this.userAddress = userAddress;
  }
}

export default UserInfo;
