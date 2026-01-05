import CollapsibleTable, { type Column } from "../../../components/ui/Table";
import { Button } from "../../../components/ui/Buttons";
import { Toast } from "../../../components/ui/Toast";

/* =======================
   Row type
======================= */

type LedgerRow = {
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
    },
    {
        key: "amount",
        header: "Amount",
        sortable: true,
        priority: 10,
        render: row => (
            <span
                className={`font-semibold ${row.dc === "dr" ? "text-red-600" : "text-green-600"
                    }`}
            >
                {row.amount.toLocaleString()} TZS
            </span>
        ),
    },
    {
        key: "account",
        header: "Account",
        sortable: true,
        priority: 8,
    },
    {
        key: "notes",
        header: "Notes",
        sortable: false,
        priority: 5,
    },
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
        key: "actions",
        header: "Actions",
        sortable: false,
        priority: 9,
        render: () => (
            <div className="flex gap-2">
                <Button size="xs" color="primary">View</Button>
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
    },
    {
        id: 2,
        date: "2026-01-03",
        amount: 120000,
        dc: "dr",
        notes: "Internet bill",
        account: "Bank",
        status: "completed",
    },
    {
        id: 3,
        date: "2026-01-04",
        amount: 500000,
        dc: "cr",
        notes: "Client payment",
        account: "Bank",
        status: "pending",
    },
];

/* =======================
   Component
======================= */

export default function LedgerPage() {
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
                        className=""
                        size="sm"
                        onClick={() =>
                            Toast.fire({
                                icon: "success",
                                title: "Exported to PDF",
                            })
                        }
                    >
                        <i className="bi bi-file-pdf"></i>
                    </Button>

                    <Button
                        color="success"
                        size="sm"
                        onClick={() =>
                            Toast.fire({
                                icon: "success",
                                title: "Exported to Excel",
                            })
                        }
                    >
                        <i className="bi bi-file-excel text-md"></i>
                    </Button>
                </div>
            </div>

            {/* Table */}
            <CollapsibleTable
                data={transactions}
                columns={columns}
                rowsPerPage={5}
            />
        </div>
    );
}
