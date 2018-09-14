const baseURL = 'http://localhost:3001'

export const getRootDirectory = () =>
	fetch(baseURL)
		.then(res =>  res.text())
		.then(JSON.parse)
		.then(res => {
			return res
		})