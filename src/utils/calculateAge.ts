import { users } from '@/types/users.type'

export const calculateAge = (birthday: string ) => {
  let thisYear = new Date().getFullYear();
  if (birthday) {
    return thisYear - new Date(birthday).getFullYear();
  } else {
    return null
  }
}