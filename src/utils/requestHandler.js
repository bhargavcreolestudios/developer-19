import axios from 'axios'
import queryString from 'query-string'
import responseHandler from './responseHandler'

export default ({ method, data, headers = {} }, callback, failedCallback, failedCondition) => {
	const url = 'http://localhost:8080/graphql'
	let requestHeaders = {
		'Content-Type': 'application/x-www-form-urlencoded',
	}
	const sendHeaders = {
		...requestHeaders,
		...headers
	}
	axios({
		url,
		data: sendHeaders['Content-Type'] === 'application/x-www-form-urlencoded' ? queryString.stringify(data) : data,
		method: 'POST',
		headers: sendHeaders
	})
	.then(response => responseHandler(response, callback, failedCallback, failedCondition))
	.catch(error => {
		if (typeof failedCallback === 'function') {
			failedCallback()
		}
		console.error(error)
	})
}

export const request = ({ url, method, data }, callback) => {
	axios({
		url,
		method,
		data
	})
	.then(response => responseHandler(callback, response))
	.catch(error => {
		console.error(error)
	})
}