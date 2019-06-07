/**
 * Response handler
 *
 * @param      {Object/Array}    response         The response
 * @param      {Function}  callback         The callback
 * @param      {Function}  failedCallback   The failed callback
 * @param      {Function}  failedCondition  The failed condition
 */
export default (response, callback, failedCallback, failedCondition) => {
    const data = response.data
    if (data.errors) {
        data.errors.forEach(error => {
            console.log(error);
        })
        if (typeof failedCallback === 'function') {
            return failedCallback()
        }
    }
    if (typeof failedCondition === 'function' && failedCondition(data.data)) {
        return failedCallback()
    }
    return callback(data.data)
}