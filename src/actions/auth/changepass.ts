export default async function changePassword(email:string, old_password:string) {
    const response = await fetch("/api/changepass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          old_password,
        }),
      })
    return response.ok;
}