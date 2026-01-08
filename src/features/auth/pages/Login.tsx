// src/pages/auth/LoginPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../../../contexts/AuthContext";

export default function LoginPage() {
    const { login, loading, error, user } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (user) navigate("/home");
    }, [user]);

    return <LoginForm onLogin={login} loading={loading} error={error ?? undefined} />;
}
