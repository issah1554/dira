// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from "react";
import type { User } from "firebase/auth";
import * as authService from "../services/authService";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = authService.subscribeAuth(
            (firebaseUser) => {
                setUser(firebaseUser);
                setLoading(false);
            },
            (error) => {
                setError(error.message);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    const register = useCallback(async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const user = await authService.register(email, password);
            setUser(user);
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const user = await authService.login(email, password);
            setUser(user);
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await authService.logout();
            setUser(null);
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { user, loading, error, register, login, logout };
};
