
export default (response, callback, failedCallback, failedCondition) => {
	const data = response.data
	if (data.errors) {
		data.errors.forEach(error => {console.log(error);})
		if (typeof failedCallback === 'function') {
			return failedCallback()
		}
	}
	if (typeof failedCondition === 'function' && failedCondition(data.data)) {
		return failedCallback()
	}
	return callback(data.data)
}