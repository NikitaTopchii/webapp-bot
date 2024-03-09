import { UpdateProductRequest } from "./update-product.request.model";

export interface Product extends UpdateProductRequest {
  id: number
}
