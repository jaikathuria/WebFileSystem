export const getDirectories = (directory) => {
	const files = []
	const allContents = directory.content || {}
	for (const file of Object.keys(allContents)) {
		if (allContents[file].type === 'directory') {
			allContents[file].label = allContents[file].name
			allContents[file].to = `/${allContents[file].url}`
			allContents[file].icon = 'folder-o'
			allContents[file].content = getDirectories(allContents[file])
			files.push(allContents[file])
		}
	}
	return files
}

export const pathArray = (url) => {
	const array = url.split('/')
	return array.filter(path => path !== '' && path !== 'root')
}

export const getCurrentDirectory = (url, root) => {
	let newRoot = root
	const array = pathArray(url)
	for (const folder of array) {
		if ('content' in newRoot) {
			if (folder in newRoot.content) {
				newRoot = newRoot.content[folder]
			} else {
				return null
			}
		} else {
			return []
		}
	}
	if (newRoot.type !== 'directory') return null
	return Object.values(newRoot.content)
}


export const addToRoot = (root, url, file) => {
	const newRoot = JSON.parse(JSON.stringify(root))
	const array = pathArray(url)
	if (array.length === 0) {
		if (newRoot.type === 'directory') {
			newRoot.content[file.name] = file
		}
		return newRoot
	}
	newRoot.content[array[0]] = addToRoot(newRoot.content[array[0]], array.slice(1).join('/'), file)
	return newRoot
}

export const deleteFromRoot = (root, url) => {
	const array = pathArray(url)
	const newRoot = JSON.parse(JSON.stringify(root))
	const toRemove = array.pop()
	if (array.length === 0) {
		if (newRoot.type === 'directory') {
			delete newRoot.content[toRemove]
		}
		return newRoot
	}
	array.push(toRemove)
	newRoot.content[array[0]] = deleteFromRoot(newRoot.content[array[0]], array.slice(1).join('/'))
	return newRoot
}


export const createFileObject = (name, creator, url, size, directory) => {
	const array = pathArray(url)
	const file = {
		name,
		size,
		creator,
		url: array.length !== 0 ? `root/${array.join('/')}/${name}` : `root/${name}`,
	}
	if (directory) {
		file.type = 'directory'
		file.content = {}
	} else {
		const lastPeriod = name.lastIndexOf('.')
		if (lastPeriod <= 0) {
			file.type = 'system'
		} else {
			file.type = name.slice(lastPeriod)
		}
	}
	return file
}
