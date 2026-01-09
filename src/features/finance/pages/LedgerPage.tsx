import CollapsibleTable, { type Column } from "../../../components/ui/Table";
import { Button } from "../../../components/ui/Buttons";
import { Toast } from "../../../components/ui/Toast";
import { Modal } from "../../../components/ui/Modal";
import { useState } from "react";
import { TextInput } from "../../../components/ui/TextInput";

/* =======================
   Row type
======================= */

type LedgerRow = {
    category: string;
    id: number;
    date: string;
    amount: number;
    dc: "dr" | "cr";
    notes: string;
    account: string;
    status: "completed" | "pending" | "failed";
};

/* =======================
   Columns
======================= */

const columns: Column<LedgerRow>[] = [
    {
        key: "date",
        header: "Date",
        sortable: true,
        priority: 9,
        render: row => {
            const dateObj = new Date(row.date);

            const dateStr = dateObj.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
            });

            const timeStr = dateObj.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });

            return (
                <div className="flex flex-col">
                    <span className="font-medium">{dateStr}</span>
                    <span className="text-xs text-gray-500">{timeStr}</span>
                </div>
            );
        },
    },

    {
        key: "amount",
        header: "Amount",
        sortable: true,
        priority: 10,
        render: row => (
            <span
                className={`font-semibold ${row.dc === "dr" ? "text-red-600" : "text-green-600"}`}
            >
                {row.amount.toLocaleString()} TZS
            </span>
        ),
    },

    { key: "account", header: "Account", sortable: true, priority: 8 },

    {
        key: "category", header: "Category", sortable: true, priority: 8,
        render: row => (
            <span className="text-sm font-medium text-gray-700">
                {row.category || "—"}
            </span>
        )
    },

    { key: "notes", header: "Notes", priority: 5 },

    {
        key: "status",
        header: "Status",
        sortable: true,
        priority: 7,
        render: row => (
            <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${row.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : row.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
            >
                {row.status}
            </span>
        ),
    },

    {
        key: "_actions",
        header: "Actions",
        render: () => (
            <div className="flex gap-2">
                <Button size="xs" color="primary">Edit</Button>
                <Button size="xs" color="error">Reverse</Button>
            </div>
        ),
    },
];

/* =======================
   Data
======================= */

const transactions: LedgerRow[] = [
    {
        id: 1,
        date: "2026-01-02",
        amount: 250000,
        dc: "dr",
        notes: "Office supplies",
        account: "Cash",
        status: "completed",
        category: "Expenses",
    },
    {
        id: 2,
        date: "2026-01-03",
        amount: 120000,
        dc: "dr",
        notes: "Internet bill",
        account: "Bank",
        status: "completed",
        category: "Expenses",
    },
    {
        id: 3,
        date: "2026-01-04",
        amount: 500000,
        dc: "cr",
        notes: "Client payment",
        account: "Bank",
        status: "pending",
        category: "Income",
    },
];


/* =======================
   Component
======================= */

export default function LedgerPage() {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        date: "",
        amount: "",
        dc: "dr",
        account: "",
        notes: "",
    });

    const closeModal = () => {
        setOpen(false);
        setFormData({ date: "", amount: "", dc: "dr", account: "", notes: "" });
    };

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                    <select className="border rounded px-2 py-1 text-sm">
                        <option value="">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>

                    <select className="border rounded px-2 py-1 text-sm">
                        <option value="">All Accounts</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank">Bank</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <Button
                        color="error"
                        size="sm"
                        onClick={() =>
                            Toast.fire({ icon: "success", title: "Exported to PDF" })
                        }
                    >
                        <i className="bi bi-file-pdf" /> Export
                    </Button>

                    <Button
                        color="primary"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <i className="bi bi-plus-lg" /> Add Entry
                    </Button>
                </div>
            </div>

            {/* Add Ledger Entry Modal */}
            <Modal open={open} onClose={closeModal} size="md" position="center" blur>
                <div className="bg-main-200 rounded-lg shadow-xl">
                    <div className="flex items-center justify-between px-6 py-4">
                        <h3 className="text-lg text-main font-semibold flex items-center gap-2">
                            <i className="bi bi-journal-plus" />
                            Add Ledger Entry
                        </h3>
                        <button onClick={closeModal}>
                            <i className="bi bi-x-lg" />
                        </button>
                    </div>

                    <form className="p-6 space-y-4">
                        <TextInput
                            label="Date"
                            labelBgColor="bg-main-200"
                            value={formData.date}
                            onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                            required color={"neutral"}
                            size={"md"} />

                        <TextInput
                            label="Amount"
                            labelBgColor="bg-main-200"
                            type="number"
                            value={formData.amount}
                            onChange={e => setFormData(p => ({ ...p, amount: e.target.value }))}
                            required color={"primary"}
                            size={"md"} />

                        <div className="flex gap-2">
                            <label
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer border text-sm font-medium
                                ${formData.dc === "dr"
                                        ? "bg-red-50 border-red-500 text-red-600"
                                        : "border-main-300 text-main-600 hover:bg-main-50"}
                                `} >
                                <input
                                    type="radio"
                                    name="dc"
                                    value="dr"
                                    className="hidden"
                                    checked={formData.dc === "dr"}
                                    onChange={() => setFormData(p => ({ ...p, dc: "dr" }))}
                                />
                                <i className="bi bi-dash-circle" />
                                Debit
                            </label>

                            <label
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer border text-sm font-medium
                                        ${formData.dc === "cr"
                                        ? "bg-green-50 border-green-500 text-green-600"
                                        : "border-main-300 text-main-600 hover:bg-main-50"}
                            `}>
                                <input
                                    type="radio"
                                    name="dc"
                                    value="cr"
                                    className="hidden"
                                    checked={formData.dc === "cr"}
                                    onChange={() => setFormData(p => ({ ...p, dc: "cr" }))}
                                />
                                <i className="bi bi-plus-circle" />
                                Credit
                            </label>
                        </div>


                        <TextInput
                            label="Account"
                            labelBgColor="bg-main-200"
                            value={formData.account}
                            onChange={e => setFormData(p => ({ ...p, account: e.target.value }))}
                            required
                            color={"primary"}
                            size={"md"} />

                        <TextInput
                            label="Notes"
                            labelBgColor="bg-main-200"
                            value={formData.notes}
                            onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))} color={"primary"}
                            size={"md"} />

                        <div className="flex justify-end gap-3 pt-4 border-t border-main-300">
                            <Button variant="outline" size="sm" onClick={closeModal} color={"primary"}>
                                Cancel
                            </Button>
                            <Button size="sm" color="primary">
                                Save Entry
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Table */}
            <CollapsibleTable
                data={transactions}
                columns={columns}
                rowsPerPage={5}
            />
        </div>
    );
}
