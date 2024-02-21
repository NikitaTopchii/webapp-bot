import {EntityIdGenerator} from "../entity-id-generator";

export class ProductIdGenerator extends EntityIdGenerator{

  generateProductId(product_name, product_description, product_amount){
    const product_name_length = product_name.length;
    const product_description_length = product_description.length;

    return this.generateId(product_name_length + product_description_length + product_amount);
  }

}
