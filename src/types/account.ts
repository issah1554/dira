export interface Account {
    id: string;
    name: string;
    type: string;
    balance: string;
    accountNumber: string;
    status: "active" | "inactive" | "pending";
    lastTransaction: string;
    icon: string;
    openingBalance: number;
    currentBalance: number;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
}

export interface AccountCreateDTO {
    name: string;
    type: string;
    openingBalance: number;
    accountNumber?: string;
    description?: string;
}

export interface AccountUpdateDTO {
    name?: string;
    type?: string;
    status?: "active" | "inactive" | "pending";
    description?: string;
}

export interface AccountSummary {
    totalBalance: number;
    activeAccounts: number;
    accountTypes: number;
}