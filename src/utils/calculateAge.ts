export const calculateAge = (birthday: string ) => {
  if (birthday) {
    let today = new Date(),
      dob = new Date(birthday),
      diff = today.getTime() - dob.getTime(),
      years = Math.floor(diff / 31556736000);
    return years;
  } else {
    return null
  }
}