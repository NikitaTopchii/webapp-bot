import { CreateProductRequest } from "./create-product.request.model";

export interface UpdateProductRequest extends CreateProductRequest {
  product_id: number
}
