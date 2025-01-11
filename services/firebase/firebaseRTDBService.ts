import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database';

export default class RealTimeDatabaseService {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    static ref(path: string) {
        return new RealTimeDatabaseService(path);
    }

    // Add or update data at a specific path
    async setData(data: any): Promise<void> {
        try {
            await database().ref(this.path).set(data);
            console.log(`Data set at ${this.path}:`, data);
        } catch (error) {
            console.error(`Error setting data at ${this.path}:`, error);
            throw error;
        }
    }

    // Update specific fields at a path
    async updateData(data: any): Promise<void> {
        try {
            await database().ref(this.path).update(data);
            console.log(`Data updated at ${this.path}:`, data);
        } catch (error) {
            console.error(`Error updating data at ${this.path}:`, error);
            throw error;
        }
    }

    // Fetch data from a specific path
    async getData(): Promise<any> {
        try {
            const snapshot = await database().ref(this.path).once('value');
            if (snapshot.exists()) {
                console.log(`Data fetched from ${this.path}:`, snapshot.val());
                return snapshot.val();
            } else {
                console.warn(`No data found at ${this.path}`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching data from ${this.path}:`, error);
            throw error;
        }
    }

    // Listen to real-time updates at a path
    listen(callback: (data: any) => void): () => void {
        const ref = database().ref(this.path);
        const listener = ref.on('value', (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
            callback(snapshot.val());
        });

        // Return an unsubscribe function
        return () => ref.off('value', listener);
    }

    // Delete data at a specific path
    async deleteData(): Promise<void> {
        try {
            await database().ref(this.path).remove();
            console.log(`Data deleted at ${this.path}`);
        } catch (error) {
            console.error(`Error deleting data at ${this.path}:`, error);
            throw error;
        }
    }
}
