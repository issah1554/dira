// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { JSX } from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();

    if (loading) {
        // Optional: you can show a spinner while checking auth
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
}
