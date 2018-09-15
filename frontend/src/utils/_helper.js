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
	root = JSON.parse(JSON.stringify(root))
	 // Logic to Add File to given url of the root
	return root	
}