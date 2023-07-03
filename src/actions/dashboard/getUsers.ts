import { ProfileType } from "@/types/profile.type";


export default async function getUsers(setRegisteredUsers: any, setActiveUsers: any, setPremiumUsers: any) {

    const response = await fetch("/api/dashboard/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    })

    if (response.ok === true) {
        const data = await response.json();
        let count = data.data.filter((item: ProfileType) => item.is_disabled === false).length;
        let premium = data.data.filter((item: ProfileType) => item.is_premium === true).length;
        if (data) {
            setRegisteredUsers(data.data.length);
            setActiveUsers(count);
            setPremiumUsers(premium);
        }

    }
}
