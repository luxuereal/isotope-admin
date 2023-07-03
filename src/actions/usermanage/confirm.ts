export default async function confirmFunc(uid: string, type: number) {
  const response = await fetch("/api/usermanage/confirm", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
        type
      }),
  })
  
  if(response.ok === false)
      return 0;
  const { data } = await response.json();
  return data;
}
