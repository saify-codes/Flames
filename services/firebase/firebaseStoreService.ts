import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';


export default class FirestoreService {
    private collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }

    static collection(collectionName: string) {
        return new FirestoreService(collectionName)
    }

    // Add a new document
    async addDocument(data: FirebaseFirestoreTypes.DocumentData): Promise<{ id: string; data: FirebaseFirestoreTypes.DocumentData }> {
        try {
            const docRef = await firestore().collection(this.collectionName).add(data);
            return { id: docRef.id, data }
        } catch (error) {
            console.error(`Error adding document to ${this.collectionName}:`, error);
            throw error;
        }
    }

    // Get all documents
    async getDocuments(): Promise<Array<{ id: string; data: FirebaseFirestoreTypes.DocumentData }>> {
        try {
            const snapshot = await firestore().collection(this.collectionName).get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
        } catch (error) {
            console.error(`Error fetching documents from ${this.collectionName}:`, error);
            throw error;
        }
    }

    // Get a single document by ID
    async getDocumentById(docId: string): Promise<{ id: string; data: FirebaseFirestoreTypes.DocumentData } | null> {
        try {
            const doc = await firestore().collection(this.collectionName).doc(docId).get();
            if (doc.exists) {
                return { id: doc.id, data: doc.data() as FirebaseFirestoreTypes.DocumentData };
            } else {
                console.warn(`Document with ID ${docId} not found in ${this.collectionName}`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching document from ${this.collectionName}:`, error);
            throw error;
        }
    }

    // Update a document by ID
    async updateDocument(docId: string, data: Partial<FirebaseFirestoreTypes.DocumentData>): Promise<{ id: string; data: Partial<FirebaseFirestoreTypes.DocumentData> }> {
        try {
            await firestore().collection(this.collectionName).doc(docId).update(data);
            return { id: docId, data };
        } catch (error) {
            console.error(`Error updating document in ${this.collectionName}:`, error);
            throw error;
        }
    }

    // Delete a document by ID
    async deleteDocument(docId: string): Promise<boolean> {
        try {
            await firestore().collection(this.collectionName).doc(docId).delete();
            return true;
        } catch (error) {
            console.error(`Error deleting document from ${this.collectionName}:`, error);
            throw error;
        }
    }
}
