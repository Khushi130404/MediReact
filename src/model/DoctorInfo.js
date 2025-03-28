class DoctorInfo {
  doctorId = 0;
  doctorName = "";
  doctorMail = "";
  doctorPass = "";
  doctorAge = 0;
  doctorGender = "male";
  doctorMobile = "";
  doctorAddress = "";
  specialist = "";

  constructor(
    doctorName,
    doctorMail,
    doctorPass,
    doctorAge,
    doctorGender,
    doctorMobile,
    doctorAddress,
    specialist
  ) {
    this.doctorName = doctorName;
    this.doctorMail = doctorMail;
    this.doctorPass = doctorPass;
    this.doctorAge = doctorAge;
    this.doctorGender = doctorGender;
    this.doctorMobile = doctorMobile;
    this.doctorAddress = doctorAddress;
    this.specialist = specialist;
  }
}

export default DoctorInfo;
