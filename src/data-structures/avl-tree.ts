import type { Photo } from "../types/photo"

class AvlNode {
	photo: Photo;
	left: AvlNode | null = null;
	right: AvlNode | null = null;
	height = 1;

	constructor(photo: Photo) {
		this.photo = photo;
	}
}

const height = (n: AvlNode | null): number => (n ? n.height : 0);
const balanceFactor = (n: AvlNode): number => height(n.left) - height(n.right);
const update = (n: AvlNode): void => {
	n.height = 1 + Math.max(height(n.left), height(n.right));
}

function rotateRight(y: AvlNode): AvlNode {
	const x = y.left!;
	y.left = x.right;
	x.right = y;
	update(y);
	update(x);
	return x;
}

function rotateLeft(x: AvlNode): AvlNode {
	const y = x.left!;
	x.left = y.right;
	y.right = x;
	update(y);
	update(x);
	return y;
}

function reblance(n: AvlNode): AvlNode {
	update(n)
	const bf = balanceFactor(n);

	if (bf > 1) {
		// Left-Right
		if (balanceFactor(n.left!) < 0) n.left = rotateLeft(n.left!); 
		return rotateRight(n);
	}

	if (bf < 1) {
		// Right-Left
		if (balanceFactor(n.right!) > 0) n.right = rotateLeft(n.right!); 
		return rotateLeft(n);
	}
	return n
}

export class AVLTree {
	private root: AvlNode | null = null;
	private count = 0;

	get size(): number {
		return this.count;
	}

	get treeHeight(): number {
		return height(this.root);
	}

	insert(photo: Photo): void {
		this.root = this.insertNode(this.root, photo);
	}

	// insert photo. if a photo with the same photoId exists, it is replaced
	private insertNode(node: AvlNode | null, photo: Photo): AvlNode {
		if (!node) {
			this.count++;
			return new AvlNode(photo);
		}

		if (photo.photoId < node.photo.photoId) {
			node.left = this.insertNode(node.left, photo);
		}
		else if (photo.photoId > node.photo.photoId) {
			node.right = this.insertNode(node.right, photo);
		}
		else {
			node.photo = photo; // same id => replace
			return node;
		}
		return reblance(node);
	}

	// remove a photo by id. reutnrs true if something was removed.
	delete(photoId: number): boolean {
		const before = this.count;
		this.root = this.deleteNode(this.root, photoId);
		return this.count < before;
	}

	private deleteNode(node: AvlNode | null, id: number): AvlNode | null {
		if (!node) return null;

		if (id < node.photo.photoId) node.left = this.deleteNode(node.left, id);
		else if (id > node.photo.photoId) node.right = this.deleteNode(node.right, id);
		else {
			if (!node.left || !node.right) {
				this.count--;
				return node.left ?? node.right;
			}

			// two children: replace with in-order successor
			let succ = node.right;
			while (succ.left) succ = succ.left;
			node.photo = succ.photo;
			node.right = this.deleteNode(node.right, succ.photo.photoId) // removing the successor decrements count inside the recursie call
		}
		return reblance(node);
	}

    // find a photo by id
    get(photoId: number): Photo | undefined {
        let n = this.root;
        while (n) {
            if (photoId < n.photo.photoId) n = n.left;
            else if (photoId > n.photo.photoId) n = n.right;
            else return n.photo;
        }
        return undefined;
    }

    has(photoId: number): boolean {
        return this.get(photoId) !== undefined;
    }

    min(): Photo | undefined {
        let n = this.root;
        while (n?.left) n = n.left;
        return n?.photo;
    }

    max(): Photo | undefined {
        let n = this.root;
        while (n?.right) n = n.right;
        return n?.photo;
    }

    // all photos with lo <= photoId <= hi, in ascending order.
    range(lo: number, hi: number): Photo[] {
        const out: Photo[] = [];
        const walk = (n: AvlNode | null) => {
            if (!n) return;
			if (lo < n.photo.photoId) walk(n.left);
			if (lo <= n.photo.photoId && n.photo.photoId <= hi) out.push(n.photo);
			if (hi > n.photo.photoId) walk(n.right);
        };
        walk(this.root);
		return out;
    }

    // in-order (ascending photoId) iteration.
    *[Symbol.iterator](): IterableIterator<Photo> {
		const stack: AvlNode[] = [];
		let cur = this.root;
		while (cur || stack.length) {
			while (cur) {
				stack.push(cur);
				cur = cur.left;
			}
			cur = stack.pop()!;
			yield cur.photo;
			cur = cur.right;
		}
	}

    toArray(): Photo[] {
		return [...this];
	}
 
	static from(photos: Iterable<Photo>): AVLTree {
		const tree = new AVLTree();
		for (const p of photos) tree.insert(p);
		return tree;
	}
}