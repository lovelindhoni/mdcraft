import defaultValues from './defaults/defaultValues';

let db: IDBDatabase | null = null; // Initialize a variable to hold the database reference

const openDB = async () => {
	// Return a promise that resolves with the database instance
	return new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open('myDatabase', 1); // Open the 'myDatabase' with version 1

		request.onerror = (event) => {
			reject(request.error); // Reject the promise if there is an error during database open
		};

		request.onsuccess = (event) => {
			resolve(request.result); // Resolve the promise with the database instance when it's successfully opened
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result; // Get the database instance during an upgrade
			db.createObjectStore('data', { keyPath: 'key' }); // Create an object store called 'data' with a key path of 'key'
		};
	});
};

const getValue = async <T>(key: string): Promise<T> => {
	if (!db) {
		db = await openDB(); // Open the database if it hasn't been opened yet
	}

	return new Promise<T>((resolve, reject) => {
		const transaction = db!.transaction('data', 'readonly'); // Start a readonly transaction on the 'data' object store
		const objectStore = transaction.objectStore('data');
		const request = objectStore.get(key); // Get a value by key

		request.onsuccess = (event) => {
			/*@ts-ignore */ // I am so sorry, i had to :(
			resolve(request.result ? request.result.value : defaultValues[key]); // Resolve with the value or a default value if not found
		};

		request.onerror = (event) => {
			reject(request.error); // Reject if there is an error during the operation
		};
	});
};

const setValue = async <T>(key: string, value: T) => {
	if (!db) {
		db = await openDB(); // Open the database if it hasn't been opened yet
	}

	return new Promise<void>((resolve, reject) => {
		const transaction = db!.transaction('data', 'readwrite'); // Start a readwrite transaction on the 'data' object store
		const objectStore = transaction.objectStore('data');
		const request = objectStore.put({ key, value }); // Put a key-value pair into the object store

		request.onsuccess = (event) => {
			resolve(); // Resolve when the operation is successful
		};

		request.onerror = (event) => {
			reject(request.error); // Reject if there is an error during the operation
		};
	});
};

export { getValue, setValue };
