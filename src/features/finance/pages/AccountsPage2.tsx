import React from "react";
import { AccountCard } from "../../../components/ui/AccountCard";

const sampleAccounts = [
    {
        id: "1",
        name: "Main Salary Account",
        number: "1234 5678 9012",
        type: "Savings",
        status: "active",
        balance: 1250000,
        currency: "TZS",
    },
    {
        id: "2",
        name: "Emergency Fund",
        number: "2234 5678 9012",
        type: "Savings",
        status: "inactive",
        balance: 450000,
        currency: "TZS",
    },
    {
        id: "3",
        name: "USD Investment",
        number: "US-7788-9900",
        type: "Current",
        status: "frozen",
        balance: 2300,
        currency: "USD",
    },
    {
        id: "4",
        name: "Old Account",
        number: "9988 7766 5544",
        type: "Current",
        status: "closed",
        balance: 0,
        currency: "TZS",
    },
];

export const AccountsGridPage: React.FC = () => {
    return (
        <main className="min-h-screen bg-main-50 px-4 py-6">
            <div className="mx-auto w-full max-w-6xl">
                {/* Page header */}
                <header className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-main-900">
                            Accounts
                        </h1>
                        <p className="text-sm text-main-500">
                            Overview of your linked accounts.
                        </p>
                    </div>

                    <button className="mt-2 inline-flex items-center justify-center rounded-md border border-main-300 bg-main-100 px-3 py-1.5 text-sm font-medium text-main-800 hover:bg-main-200 sm:mt-0">
                        + Add Account
                    </button>
                </header>

                {/* Responsive grid of credit-card–ratio cards */}
                <section
                    className={`
                        grid gap-4
                        grid-cols-1      
                        sm:grid-cols-1  
                        md:grid-cols-1 
                        lg:grid-cols-2 
                        xl:grid-cols-3
                    `}
                >
                    {sampleAccounts.map((acc) => (
                        <div
                            key={acc.id}
                            className="
                                relative w-full
                                max-w-sm
                                aspect-85/54   /* ≈ real credit card ratio */
                            "
                        >
                            <div className="absolute inset-0">
                                <AccountCard
                                    accountName={acc.name}
                                    accountNumber={acc.number}
                                    accountType={acc.type}
                                    status={acc.status as any}
                                    balance={acc.balance}
                                    currency={acc.currency}
                                    className="h-full"
                                    onEdit={() => console.log("Edit", acc.id)}
                                    onDelete={() => console.log("Delete", acc.id)}
                                />
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
};
