// types/firebase.ts

export interface FirebaseTransaction {
    id: string;
    date: string;
    amount: number;
    dc: "dr" | "cr";
    notes: string;
    account: string;
    category: string;
    status: "completed" | "pending" | "failed";
    createdAt: string;
    updatedAt: string;
    userId?: string;
}

export interface TransactionFormData {
    date: string;
    amount: number;
    dc: "dr" | "cr";
    notes: string;
    account: string;
    category: string;
    status?: "completed" | "pending" | "failed";
}

export type TransactionFilter = {
    status?: "completed" | "pending" | "failed";
    account?: string;
    dateFrom?: string;
    dateTo?: string;
    category?: string;
};