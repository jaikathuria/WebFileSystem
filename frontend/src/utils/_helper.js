export const getDirectories = directory => {
	const files = []
	const allContents = directory.content || {}
	for (let file of Object.keys(allContents)){
		if(allContents[file].type === 'directory'){
			allContents[file].label = allContents[file].name
			allContents[file].to = `/${allContents[file].url}`
			allContents[file].icon = 'folder-o'
			allContents[file].content = getDirectories(allContents[file])
			files.push(allContents[file])
		}
	}
	return files
}

export const pathArray = url => {
	const array = url.split('/')
	return array.filter(path => path !== '' && path !== 'root')
}

export const getCurrentDirectory = (url,root) => {
	const array = pathArray(url)
	for (let folder of array){
		if('content' in root){
			if(folder in root.content){
				root = root.content[folder]
			} else {
				return null
			}
		} else {
			return []
		}
	}
	if(root.type !== 'directory') return null
	return Object.values(root.content)
}


export const addToRoot = (root, url, file) => {
	const array = pathArray(url)
	if(array.length === 0) {
		if(root.type === 'directory'){
			root.content[file.name] = file
		}
		return JSON.parse(JSON.stringify(root))
	}
	root.content[array[0]] = addToRoot(root.content[array[0]],array.slice(1).join('/'),file)
	return JSON.parse(JSON.stringify(root))
}

export const createFileObject = (name, creator, url, size, directory) => {
	const array = pathArray(url)
	const file = {
		name,
		size,
		creator,
		url: array.length !== 0 ? `root/${array.join('/')}/${name}` : `root/${name}`
	}
	if (directory){
		file.type = 'directory'
		file.content = {}
	} else {
		const lastPeriod = name.lastIndexOf('.')
		if(lastPeriod <= 0){
			file.type = 'system'
		} else {
			file.type = name.slice(lastPeriod)
		}
	}
	return file
}