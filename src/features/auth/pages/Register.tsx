import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../hooks/useAuth";
import { Toast } from "../../../components/ui/Toast";
import { useEffect } from "react";

export default function RegisterPage() {
    const { register, loading, error, user } = useAuth(); // user indicates successful registration

    // Show error toast
    useEffect(() => {
        if (error) {
            Toast.fire({ icon: "error", title: error });
        }
    }, [error]);

    // Show success toast
    useEffect(() => {
        if (user) {
            Toast.fire({ icon: "success", title: "Registration successful!" });
        }
    }, [user]);

    return <RegisterForm onRegister={register} loading={loading} />;
}
