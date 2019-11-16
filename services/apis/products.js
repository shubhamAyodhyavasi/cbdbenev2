import rest from '../rest'

export const getProductById = id => rest.get("/products/api/getbyid/", id)