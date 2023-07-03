export default async function PushNotification(token: string, message: string | undefined) {
    const response = await fetch("/api/notify/multicast", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
            message,
        }),
    })
    if (response.ok === false)
        return 0;
    return 1;
}
