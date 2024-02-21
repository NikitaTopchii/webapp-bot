import {EntityIdGenerator} from "../entity-id-generator";

export class StoreIdGenerator extends EntityIdGenerator{

  generateStoreId(store_name, store_description){
    const store_name_length = store_name.length;
    const store_description_length = store_description.length;

    return this.generateId(store_description_length + store_name_length);
  }
}
