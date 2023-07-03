export type disputesRes = {
  reportee: string;
  reporter: string;
  reason: string;
  profiles: {
      name: string;
      gender: string;
      users: {
        email: string;
        phone_number: string;
      }
  } | undefined;
  users: {
    eamil: string;
    phone_number: string;
} | undefined
}

export type Disputes = {
  id: number;
  uid: string;
  email: string;
  phone_number: string;
  name: string;
  gender: string;
  reporter: string;
  by_email: string;
  by_phone_number: string;
  reason: string;
}