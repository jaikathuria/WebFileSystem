const baseURL = 'http://localhost:3001'

export const getRootDirectory = () =>
	fetch(baseURL)
		.then(res =>  res.json())
		.then(res => {
			return res
		})