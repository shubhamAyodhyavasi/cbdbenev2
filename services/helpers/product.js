export const getProductImage = (product = {}, image = "main") => {
    if(image === "main"){
        if (product.productid) {
        if (product.productid.featurefilepath)
            return product.productid.featurefilepath;
        }
        if (product.featureimage) return product.featureimage;
        if (product.galleryimgdetails) return product.galleryimgdetails[0];
    }
    if(image === "sectionB"){
        if (product.productid) {
            if (product.productid.sectionbimage)
                return product.productid.sectionbimage;
        }
        if (product.sectionbimage) return product.sectionbimage;
    
    }
    return null
};
export const getProductAttributes = (product = {}, allProducts = []) => {
    if(product.combo){
        return product.products.map(el => {
            const {
              combo_pid
            } = el
            const thisProduct = allProducts.find(elx => elx._id === combo_pid)
            if(thisProduct){
              return {
                title: thisProduct.title || (thisProduct.productid && thisProduct.productid.producttitle),
                description: thisProduct.description || (thisProduct.productid && thisProduct.productid.description),
              }
            }
            return null
        }).filter(el => el)
    }
    return product.attributecontent || []
}