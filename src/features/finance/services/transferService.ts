import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    Timestamp,
    type DocumentData} from "firebase/firestore";
import { db } from "../../../firebase";
import type { Account, AccountCreateDTO, AccountUpdateDTO } from "../../../types/account";

// Collection reference
const ACCOUNTS_COLLECTION = "accounts";

// Convert Firestore document to Account object
const documentToAccount = (doc: DocumentData): Account => {
    const currentBalance = parseFloat(doc.data().currentBalance || doc.data().balance || "0");

    return {
        id: doc.id,
        name: doc.data().name,
        type: doc.data().type,
        balance: `₹${currentBalance.toLocaleString('en-IN')}`,
        accountNumber: doc.data().accountNumber || "",
        status: doc.data().status || "active",
        openingBalance: doc.data().openingBalance || 0,
        currentBalance: currentBalance,
        description: doc.data().description || "",
        lastTransaction: doc.data().lastTransaction ?
            doc.data().lastTransaction.toDate().toISOString().split('T')[0] :
            new Date().toISOString().split('T')[0],
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        icon: doc.data().icon || getDefaultIcon(doc.data().type)
    };
};

// Helper to get default icon based on account type
const getDefaultIcon = (type: string): string => {
    const iconMap: Record<string, string> = {
        "cash": "bi-wallet2",
        "savings": "bi-piggy-bank",
        "current": "bi-bank",
        "mobile": "bi-phone",
        "digital": "bi-wallet",
        "credit": "bi-credit-card"
    };
    return iconMap[type] || "bi-wallet2";
};

// Account Service
export const accountService = {
    // Create new account
    async createAccount(accountData: AccountCreateDTO, userId: string): Promise<Account> {
        try {
            const now = Timestamp.now();
            const accountToCreate = {
                ...accountData,
                userId,
                status: "active",
                currentBalance: parseFloat(accountData.openingBalance.toString()) || 0,
                createdAt: now,
                updatedAt: now
            };

            const docRef = await addDoc(collection(db, ACCOUNTS_COLLECTION), accountToCreate);

            return {
                id: docRef.id,
                name: accountData.name,
                type: accountData.type,
                balance: `₹${(parseFloat(accountData.openingBalance.toString()) || 0).toLocaleString('en-IN')}`,
                accountNumber: accountData.accountNumber || "",
                status: "active" as const,
                openingBalance: parseFloat(accountData.openingBalance.toString()) || 0,
                currentBalance: parseFloat(accountData.openingBalance.toString()) || 0,
                description: accountData.description || "",
                lastTransaction: new Date().toISOString().split('T')[0],
                createdAt: accountToCreate.createdAt.toDate(),
                updatedAt: accountToCreate.updatedAt.toDate(),
                icon: getDefaultIcon(accountData.type)
            };
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    },

    // Get all accounts for a user
    async getAccounts(userId: string): Promise<Account[]> {
        try {
            const q = query(
                collection(db, ACCOUNTS_COLLECTION),
                where("userId", "==", userId)
            );

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(documentToAccount);
        } catch (error) {
            console.error("Error fetching accounts:", error);
            throw error;
        }
    },

    // Get single account by ID
    async getAccountById(accountId: string): Promise<Account | null> {
        try {
            const docRef = doc(db, ACCOUNTS_COLLECTION, accountId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return documentToAccount({ id: docSnap.id, ...docSnap.data() });
            }
            return null;
        } catch (error) {
            console.error("Error fetching account:", error);
            throw error;
        }
    },

    // Update account
    async updateAccount(accountId: string, accountData: AccountUpdateDTO): Promise<void> {
        try {
            const docRef = doc(db, ACCOUNTS_COLLECTION, accountId);
            await updateDoc(docRef, {
                ...accountData,
                updatedAt: Timestamp.now()
            });
        } catch (error) {
            console.error("Error updating account:", error);
            throw error;
        }
    },

    // Delete account
    async deleteAccount(accountId: string): Promise<void> {
        try {
            const docRef = doc(db, ACCOUNTS_COLLECTION, accountId);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error deleting account:", error);
            throw error;
        }
    },

    // Get account summary stats
    async getAccountSummary(userId: string): Promise<{
        totalBalance: number;
        activeAccounts: number;
        accountTypes: number;
    }> {
        try {
            const accounts = await this.getAccounts(userId);
            const activeAccounts = accounts.filter(acc => acc.status === "active");

            const totalBalance = activeAccounts.reduce((sum, acc) => {
                const balance = typeof acc.currentBalance === 'number'
                    ? acc.currentBalance
                    : parseFloat(String(acc.currentBalance || "0").replace(/[^0-9.-]+/g, ""));
                return sum + balance;
            }, 0);

            const uniqueTypes = new Set(activeAccounts.map(acc => acc.type));

            return {
                totalBalance,
                activeAccounts: activeAccounts.length,
                accountTypes: uniqueTypes.size
            };
        } catch (error) {
            console.error("Error getting account summary:", error);
            throw error;
        }
    }
};