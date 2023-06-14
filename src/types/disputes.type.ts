export type disputesRes = {
  uid: string;
  disputes: {
    reporter: string;
    reason: string;
  };
  profiles: {
      name: string;
      gender: string;
  } | undefined
}

export type Disputes = {
  id: number;
  uid: string;
  name: string;
  gender: string;
  reporter: string;
  reason: string;
}