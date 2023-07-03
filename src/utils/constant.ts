export const itemsPerPage: number = 5;

export const filterOptions = {
  type: [
    { name: "Premium", code: true },
    { name: "Standard", code: false },
  ],
  status: [
    { name: "Normal", code: "0" },
    { name: "Suspended", code: "1" },
    { name: "Flagged", code: "2" },
    { name: "Active", code: "3" },
  ],
  gender: [
    { name: "Man", code: "Man" },
    { name: "Woman", code: "Woman" },
    { name: "Nonbinary", code: "Nonbinary" },
  ],
};

export const bioFields = [
  { name: 'First Name', code: 'fname' },
  { name: 'Last Name', code: 'lname' },
  { name: 'Gender', code: 'gender' },
  { name: 'Age', code: 'age' },
  { name: 'D.O.B', code: 'birthday' },
  { name: 'Zodiac', code: 'zodiac' },
  { name: 'City', code: 'city' },
  { name: 'State', code: 'state' },
  { name: 'Country', code: 'country' },
  { name: 'Phone', code: 'phone_number' },
  { name: 'Email', code: 'email' }
]