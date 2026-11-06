import type { Photo } from "../types/photo";

type Entry<K, V> = {
	key: K;
	value: V;
}

export class HashTable<K extends number, V> {
	private capacity = 101
	private buckets: Entry<K, V>[][]
	private entryCount = 0

	constructor(capacity: number = 101) {
		this.capacity = capacity
		this.entryCount = 0

		this.buckets = Array.from(
			{ length: this.capacity },
			() => []
		)
	}

	private hash(key: K): number {
		if (typeof key !== "number") {
			throw new Error("Hash key must be a number!")
		}
		return key % this.capacity
	}

	// O(1)
	insert(key: K, value: V): boolean {
		const index = this.hash(key)

		const bucket = this.buckets[index]

		for (const entry of bucket) {
			// If the key already exists in the bucket
			// Update the value
			if (entry.key === key) {
				entry.value = value
				return false
			}
		}

		bucket.push({ key, value })
		this.entryCount++

		return true
	}

	// O(1)
	get(key: K): V | undefined {
		const index = this.hash(key)
		const bucket = this.buckets[index]

		for (const entry of bucket) {
			if (entry.key === key) {
				return entry.value
			}
		}

		return undefined
	}

	getBuckets(): Entry<K, V>[][] {
		return this.buckets
	}

	// O(1)
	delete(key: K): boolean {
		const index = this.hash(key)
		const bucket = this.buckets[index]

		let i = 0
		while (i < bucket.length) {
			if (bucket[i].key === key) {
				bucket.splice(i, 1)
				this.entryCount--
				return true
			}

			i++
		}

		return false
	}

	get size(): number {
		return this.entryCount
	}
}

export function createHashTable(photos: Photo[], tableSize: number) {
	const table = new HashTable<number, Photo>(tableSize)

	for (const photo of photos) {
		table.insert(photo.photoId, photo)
	}

	return table
}
