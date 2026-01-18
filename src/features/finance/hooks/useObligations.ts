import { useEffect, useState } from "react";
import { TransactionService } from "../services/TransactionService";
import type { Transaction, TransactionDTO } from "../services/TransactionService";
import { Toast } from "../../../components/ui/Toast";

export function useTransactions() {
    const [data, setData] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = async () => {
        try {
            setLoading(true);
            setData(await TransactionService.list());
        } catch {
            setError("Failed to load transactions");
        } finally {
            setLoading(false);
        }
    };

    const create = async (payload: TransactionDTO) => {
        try {
            await TransactionService.create(payload);
            Toast.fire({ icon: "success", title: "Transaction added" });
            load();
        } catch {
            Toast.fire({ icon: "error", title: "Failed to add transaction" });
        }
    };

    const update = async (id: string, payload: Partial<TransactionDTO>) => {
        try {
            await TransactionService.update(id, payload);
            Toast.fire({ icon: "success", title: "Transaction updated" });
            load();
        } catch {
            Toast.fire({ icon: "error", title: "Update failed" });
        }
    };

    const remove = async (id: string) => {
        try {
            await TransactionService.remove(id);
            Toast.fire({ icon: "success", title: "Transaction removed" });
            load();
        } catch {
            Toast.fire({ icon: "error", title: "Delete failed" });
        }
    };

    useEffect(() => {
        load();
    }, []);

    return {
        data,
        loading,
        error,
        reload: load,
        create,
        update,
        remove,
    };
}
