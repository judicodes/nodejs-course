import Product from "../model/product.interface";

const replaceTemplate = (template: string, product: Product): string => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%ORIGIN%}/g, product.origin);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity.toString());
  output = output.replace(/{%PRICE%}/g, product.price.toString());
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id.toString());

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

export default replaceTemplate;
