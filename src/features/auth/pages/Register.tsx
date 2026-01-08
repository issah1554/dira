import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
    const { register, loading, error } = useAuth();
    return <RegisterForm onRegister={register} loading={loading} error={error ?? undefined} />;

}

