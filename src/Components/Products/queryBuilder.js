
const builder = (from = 1, limit = 10) =>{
	return {
		data: {
	      query: `
	        {
	          products(from:${from},limit:${limit}){
	            id
	            name
	            price
	            image
	            description 
	          }
	        }
	      `
	    }
	}
}

const all = () =>{
	return {
		data: {
	      query: `
	        {
	          products{
	            id
	            name
	            price
	            image
	            description 
	          }
	        }
	      `
	    }
	}
}

export {builder, all}