export interface CreateProductRequest {
  product_name: string;
  product_description: string;
  product_amount: number;
  product_price: number;
  product_media: File | string;
  game_token_id: string;
  store_id: number;
}
