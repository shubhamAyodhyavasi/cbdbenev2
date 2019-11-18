import {encodeUrlFn} from './misc'
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

//

export const filteredAttr = (variation, attr) => {
    const attrX = variation.map(el => {
      const { sale_price, sku, bar, regular_price, ...rest } = el;
      return {
        ...rest
      };
    });
    const attrY = attrX.filter(el => Object.keys(el).length === attr.length);
    const attrZ = removeDuplicateObjAr(attrY);
  
    return attrZ;
};

export const removeDuplicateObjAr = arr =>
  arr.reduce(
    (r, i) =>
      !r.some(
        j =>
          Object.keys(i).length === Object.keys(j).length &&
          !Object.keys(i).some(k => i[k] !== j[k])
      )
        ? [...r, i]
        : r,
    []
  );
  
export const getAttrListing = (attr = []) =>
attr.length > 0
  ? Object.keys(attr[0]).map(el => ({
      names: el,
      values: [...new Set(attr.map(elx => elx[el]))]
    }))
  : [];
export const getFeaturedProduct = (products = []) => {
    const filterProduct = getVisibleProducts(products).filter(
      el => {
        if (!el) return false;
        if (el.featured !== true) return false;
  
        return true;
      }
    );
  
    return filterProduct;
  };
  export const getVisibleProducts = (products = []) => {
      console.log({
        products
      })
    const productsList = products.filter(el => {
      if (!el) return false;
      if (el.visibilitytype !== true) return false;
  
      return true;
    });
    return productsList.map(el => {
      if (el.variation) {
        const verifiedAttr = filteredAttr(el.variation, el.attributes);
        return {
          ...el,
          verifiedAttr,
          visibleAttrList: getAttrListing(verifiedAttr)
        };
      } else return el;
    });
  };

export const generateProductSlug = product => {
    const productSlug = product.title
      ? product.title.toLocaleLowerCase()
      : product.productid && product.productid.producttitle.toLocaleLowerCase();
  
    return encodeUrlFn(productSlug);
  };
export const addSlugToProduct = product => ({
  ...product,
  productImage: getProductImage(product),
  productSlug: generateProductSlug(product)
});

export const getCategoriesProducts = products => {
    const productsN = products.filter(el => el.categoryid);
    const combos = products.filter(el => el.combo);
  
    const filtered = productsN
      .map(el => {
        return productsN.filter(elx => {
          if (el.categoryid[0] && elx.categoryid[0])
            return el.categoryid[0]._id === elx.categoryid[0]._id;
  
          return false;
        });
      })
      .sort((a, b) => {
        if (a[0] && b[0])
          if (a[0].categoryid[0] && b[0].categoryid[0]) {
            if (a[0].categoryid[0]._id < b[0].categoryid[0]._id) return -1;
            if (a[0].categoryid[0]._id > b[0].categoryid[0]._id) return 1;
          }
        return 0;
      });
  
    const productsF = filtered.filter((el, x) => {
      if (x === 0) return true;
      if (filtered[x - 1] && el[0]) {
        if (filtered[x - 1][0]) {
          if (filtered[x - 1][0].categoryid[0] && el[0].categoryid[0]) {
            const prevEl = filtered[x - 1][0].categoryid[0]._id;
            const currentEl = el[0].categoryid[0]._id;
            return prevEl !== currentEl;
          }
        }
      }
      return false;
      // const prevEl = filtered[x - 1][0].categoryid[0]._id;
      // const currentEl = el[0].categoryid[0]._id;
  
      // return prevEl !== currentEl;
    });
    const cate = [...productsF, combos];
    return cate
      .map(el => {
        if (el.length) {
          if (el[0].combo) {
            return {
              category: {
                blockedcountries: [],
                catdescription: "Bundles",
                categoryid: "Bundles",
                categoryslug: "Bundles",
                categorytitle: "Bundles",
                _id: "Bundles",
                products: el
              },
              products: el
            };
          }
          return {
            category: {
              ...el[0].categoryid[0],
              products: el
            },
            products: el
          };
        }
        return null;
      })
      .filter(el => el);
  };