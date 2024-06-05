import { useSession, getSession } from "next-auth/react";

export default function ProtectedPage() {
    const { data: session } = useSession();

    if (!session) {
        return <p>Access Denied</p>;
    } else return <p>Welcome! This is a protected page.</p>;
}
