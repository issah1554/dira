import { useState } from "react";
import { Button } from "../../../components/ui/Buttons";
import { Modal } from "../../../components/ui/Modal";
import { TextInput } from "../../../components/ui/TextInput";

const sampleAccounts = [
    {
        id: 1,
        name: "Cash",
        type: "Cash",
        balance: "₹45,280.00",
        accountNumber: "CASH-001",
        status: "active",
        lastTransaction: "2024-01-15",
        icon: "bi-wallet2"
    },
    {
        id: 2,
        name: "HDFC Bank",
        type: "Bank Account",
        balance: "₹1,25,430.50",
        accountNumber: "XXXX-XXXX-1234",
        status: "active",
        lastTransaction: "2024-01-14",
        icon: "bi-bank"
    },
    {
        id: 3,
        name: "SBI Savings",
        type: "Savings Account",
        balance: "₹78,920.00",
        accountNumber: "XXXX-XXXX-5678",
        status: "active",
        lastTransaction: "2024-01-13",
        icon: "bi-piggy-bank"
    },
    {
        id: 4,
        name: "PhonePe Wallet",
        type: "Mobile Wallet",
        balance: "₹12,500.00",
        accountNumber: "PHONEPE-9087",
        status: "active",
        lastTransaction: "2024-01-15",
        icon: "bi-phone"
    },
    {
        id: 5,
        name: "PayTM Money",
        type: "Digital Wallet",
        balance: "₹8,750.30",
        accountNumber: "PAYTM-4567",
        status: "inactive",
        lastTransaction: "2024-01-10",
        icon: "bi-wallet"
    },
    {
        id: 6,
        name: "Petty Cash",
        type: "Cash",
        balance: "₹5,000.00",
        accountNumber: "CASH-002",
        status: "active",
        lastTransaction: "2024-01-14",
        icon: "bi-cash-stack"
    },
];

const accountTypes = [
    { value: "cash", label: "Cash" },
    { value: "savings", label: "Savings Account" },
    { value: "current", label: "Current Account" },
    { value: "mobile", label: "Mobile Wallet" },
    { value: "digital", label: "Digital Wallet" },
    { value: "credit", label: "Credit Card" },
];

export default function Accounts() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        accountNumber: "",
        openingBalance: "",
        description: ""
    });

    const handleClose = () => {
        setOpen(false);
        setFormData({ name: "", type: "", accountNumber: "", openingBalance: "", description: "" });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
        handleClose();
    };

    const getStatusBadge = (status: string) => {
        const colors: Record<string, string> = {
            active: "bg-success-100 text-success-800",
            inactive: "bg-red-100 text-red-800",
            pending: "bg-yellow-100 text-yellow-800"
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            "Cash": "bg-primary-100 text-primary-600",
            "Bank Account": "bg-success-100 text-success-600",
            "Savings Account": "bg-accent-100 text-accent-600",
            "Mobile Wallet": "bg-orange-100 text-orange-600",
            "Digital Wallet": "bg-pink-100 text-pink-600",
            "Credit Card": "bg-red-100 text-red-600"
        };
        return colors[type] || "bg-gray-100 text-gray-600";
    };

    return (
        <div className="flex-1 text-main-700">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text font-bold">Financial Accounts</h3>
                    <p className="text-sm text-main-500">Manage cash, bank accounts, and digital wallets</p>
                </div>
                <Button color="primary" size="sm" rounded="md" onClick={() => setOpen(true)}>
                    <i className="bi bi-plus-lg mr-2" />
                    Add Account
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-primary-100 border border-primary-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-primary-600">Total Balance</p>
                            <h4 className="text-2xl font-bold text-primary-700">₹2,75,880.80</h4>
                        </div>
                        <i className="bi bi-currency-rupee text-2xl text-primary-400"></i>
                    </div>
                    <p className="text-xs text-primary-500 mt-2">Across all active accounts</p>
                </div>
                <div className="bg-success-100 border border-success-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-success-600">Active Accounts</p>
                            <h4 className="text-2xl font-bold text-success-700">5</h4>
                        </div>
                        <i className="bi bi-check-circle text-2xl text-success-400"></i>
                    </div>
                    <p className="text-xs text-success-500 mt-2">1 account inactive</p>
                </div>
                <div className="bg-accent-100 border border-accent-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-accent-600">Account Types</p>
                            <h4 className="text-2xl font-bold text-accent-700">4</h4>
                        </div>
                        <i className="bi bi-wallet2 text-2xl text-accent-400"></i>
                    </div>
                    <p className="text-xs text-accent-500 mt-2">Cash, Bank, Mobile, Digital</p>
                </div>
            </div>

            {/* Accounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleAccounts.map(account => (
                    <div key={account.id} className="bg-main-200/60 rounded-lg  border border-main-300 p-5 hover:ring-primary/70 hover:ring-2 transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 ${getTypeColor(account.type)} rounded-lg flex items-center justify-center`}>
                                    <i className={`bi ${account.icon}`} />
                                </div>
                                <div>
                                    <h4 className="font-semibold">{account.name}</h4>
                                    <p className="text-xs text-main-500">{account.accountNumber}</p>
                                </div>
                            </div>
                            {getStatusBadge(account.status)}
                        </div>

                        <div className="mb-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(account.type)}`}>
                                {account.type}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-main-600">Current Balance:</span>
                                <span className="font-bold text-lg text-main-800">{account.balance}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-main-500">Last Transaction:</span>
                                <span className="text-main-700">{account.lastTransaction}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-main-300">
                            <Button color="neutral" size="xs" variant="outline" className="flex-1">
                                <i className="bi bi-eye mr-1" /> View
                            </Button>
                            <Button color="neutral" size="xs" variant="outline" className="flex-1">
                                <i className="bi bi-pencil mr-1" /> Edit
                            </Button>
                            <Button color="neutral" size="xs" variant="outline" className="flex-1">
                                <i className="bi bi-trash mr-1" /> Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Account Modal */}
            <Modal open={open} onClose={handleClose} size="md" position="center" blur closeOnBackdrop closeOnEsc>
                <div className={`bg-main-100 rounded-lg shadow-xl overflow-hidden ${open ? "animation-zoom-in" : ""}`}>
                    <div className="flex items-center justify-between px-6 py-4 text-main-700">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <i className="bi bi-wallet2" />
                            Add New Account
                        </h3>
                        <button onClick={handleClose}><i className="bi bi-x-lg" /></button>
                    </div>
                    <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                        <TextInput
                            label="Account Name"
                            labelBgColor="bg-main-100"
                            color="primary"
                            size="md"
                            rounded="md"
                            value={formData.name}
                            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                            required
                            placeholder="e.g., HDFC Savings, Cash Drawer, etc."
                        />

                        <div>
                            <label className="block text-sm font-medium text-main-700 mb-2">
                                Account Type
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-main-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                value={formData.type}
                                onChange={e => setFormData(p => ({ ...p, type: e.target.value }))}
                                required
                            >
                                <option value="">Select account type</option>
                                {accountTypes.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <TextInput
                            label="Account Number/Identifier"
                            labelBgColor="bg-main-100"
                            color="primary"
                            size="md"
                            rounded="md"
                            value={formData.accountNumber}
                            onChange={e => setFormData(p => ({ ...p, accountNumber: e.target.value }))}
                            placeholder="e.g., Bank account number, wallet ID"
                        />

                        <TextInput
                            label="Opening Balance"
                            labelBgColor="bg-main-100"
                            color="primary"
                            size="md"
                            rounded="md"
                            type="number"
                            value={formData.openingBalance}
                            onChange={e => setFormData(p => ({ ...p, openingBalance: e.target.value }))}
                            required
                            placeholder="0.00"
                        />

                        <TextInput
                            label="Description (Optional)"
                            labelBgColor="bg-main-100"
                            color="primary"
                            size="md"
                            rounded="md"
                            value={formData.description}
                            onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                            placeholder="Any additional details about this account"
                        />

                        <div className="flex justify-end gap-3 pt-4 border-t border-main-200">
                            <Button type="button" color="neutral" size="sm" variant="outline" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" size="sm">
                                <i className="bi bi-check-lg mr-2" />Create Account
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}