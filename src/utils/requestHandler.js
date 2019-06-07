import axios from 'axios'
import queryString from 'query-string'
import responseHandler from './responseHandler'

/**
 * Default graphql call request
 *
 * @param      {Object}    arg1             The argument 1
 * @param      {String}    arg1.method      The method
 * @param      {Object}    arg1.data        The data
 * @param      {Array}     arg1.headers     The headers
 * @param      {Function}  callback         The callback
 * @param      {Function}  failedCallback   The failed callback
 * @param      {Function}  failedCondition  The failed condition
 */
export default ({ method, data, headers = {} }, callback, failedCallback, failedCondition) => {
	// provide live url if it's a production. else target local server
	let url = "http://localhost:8000/graphql"
	if (process.env.NODE_ENV === 'production') {
		url = 'http://139.59.65.130:8000/graphql'
	}
	// default request header
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

/**
 * custom request if any.
 *
 * @param      {Object}    arg1         The argument 1
 * @param      {<type>}    arg1.url     The url
 * @param      {<type>}    arg1.method  The method
 * @param      {<type>}    arg1.data    The data
 * @param      {Function}  callback     The callback
 */
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