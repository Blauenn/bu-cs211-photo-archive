import { ArrowsDownUpIcon, DatabaseIcon, ImagesIcon, RowsIcon, TreeViewIcon } from "@phosphor-icons/react"
import NavButton from "./components/nav/NavButton"
import { Route, Routes } from "react-router"
import Data from "./pages/Data"
import MergeSort from "./pages/MergeSort"
import HashTable from "./pages/HashTable"
import AVLTree from "./pages/AVLTree"
import NavAddButton from "./components/nav/NavAddButton"
import { useState } from "react"
import { initialPhotos } from "./data/photos"
import type { Photo } from "./types/photo"

export default function App() {
	const [photos, setPhotos] = useState<Photo[]>(initialPhotos)

	return (
		<div className="min-h-screen p-4">
			<nav className="border border-gray-200 p-4 rounded-2xl flex items-center justify-between">
				<div className="flex items-center gap-4 pl-4">
					<ImagesIcon size={36} weight="duotone" />
					<h1 className="text-2xl font-bold">Photo archive</h1>
				</div>
				<div className="flex gap-4">

					<NavButton to="/hashTable" icon={RowsIcon} label="Hash table" duotone />
					<NavButton to="/avlTree" icon={TreeViewIcon} label="AVL tree" duotone />
					<NavButton to="/mergeSort" icon={ArrowsDownUpIcon} label="Merge sort" />
					<NavButton to="/" icon={DatabaseIcon} label="All data" duotone />
					<NavAddButton setPhotos={setPhotos} />
				</div>
			</nav>

			<div className="pt-8">
				<Routes>
					<Route path="/hashTable" element={<HashTable />} />
					<Route path="/avlTree" element={<AVLTree />} />
					<Route path="/mergeSort" element={<MergeSort />} />
					<Route path="/" element={<Data photos={photos} />} />
				</Routes>
			</div>
		</div>
	)
}
