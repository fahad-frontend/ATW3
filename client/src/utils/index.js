export const toArray = (obj) => {
	const result = []
	for (const prop in obj) {
		const value = obj[prop]
		if (typeof value === 'object') {
			result.push(toArray(value))
		} else {
			result.push(value)
		}
	}
	return result
}
