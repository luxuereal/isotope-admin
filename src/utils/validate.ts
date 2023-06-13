export const validatePassword = (old_password: string, new_password: string, confirm_pass: string) => {
    if (!new_password || !confirm_pass || !old_password) return false;
    if (new_password.length < 8) return false;
    if (confirm_pass !== new_password) return false;
    return true;
  };