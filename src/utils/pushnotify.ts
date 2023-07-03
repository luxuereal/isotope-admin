import * as admin from 'firebase-admin';
admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
});

export const sendNotify = (token: string, message: string) => {
    admin.messaging().sendEach([{
        token: token,
        notification: {
            title: "Isotope-Notification",
            body: message,
        }
    }]).catch(() => {
        return false;
    });
    return true;
}