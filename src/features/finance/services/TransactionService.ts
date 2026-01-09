import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    Timestamp,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";

/* =======================
   Types
======================= */

export type TransactionDTO = {
    date: string;
    amount: number;
    dc: "dr" | "cr";
    account: string;
    notes: string;
    category: string;
    status: "completed" | "pending" | "failed";
};

export type Transaction = TransactionDTO & {
    id: string;
};

/* =======================
   Collection ref
======================= */

const ref = collection(db, "transactions");

/* =======================
   Service
======================= */

export const TransactionService = {
    async list(): Promise<Transaction[]> {
        const q = query(ref, orderBy("date", "desc"));
        const snap = await getDocs(q);

        return snap.docs.map(d => {
            const data = d.data();
            return {
                id: d.id,
                ...data,
                date: data.date.toDate().toISOString(),
            } as Transaction;
        });
    },

    async create(payload: TransactionDTO) {
        return addDoc(ref, {
            ...payload,
            date: Timestamp.fromDate(new Date(payload.date)),
            createdAt: Timestamp.now(),
        });
    },

    async update(id: string, payload: Partial<TransactionDTO>) {
        return updateDoc(doc(ref, id), payload);
    },

    async remove(id: string) {
        return deleteDoc(doc(ref, id));
    },
};
