import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, startWith, Subject, switchMap, tap } from "rxjs";
import { main_url } from "../../shared/application-context";
import { HelpersService } from "../../core/services/helpers/helpers.service";
import { CompetitionService } from "../../core/services/competition/competition.service";

interface CreateStoreRequest {
  name: string;
  description: string;
  tokenId: string;
  owner_id: string;
}

interface Store {
  store_id: string;
  store_name: string;
}

export interface StoreDetails {
  store_id: string;
  store_name: string;
  store_description: string;
  game_token_id: string;
}

export interface CreateProductRequest {
  product_name: string;
  product_description: string;
  product_amount: number;
  product_price: number;
  product_media: File | string;
  game_token_id: string;
  store_id: string;
}

export interface UpdateProductRequest extends CreateProductRequest {
  product_id: string
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private storeCreated$ = new Subject<void>();
  private productCreated$ = new Subject<void>();


  constructor(private http: HttpClient,
              private helpersService: HelpersService,
              private competitionService: CompetitionService) {
  }

  public createStore(data: CreateStoreRequest): Observable<any> {
    return this.http
      .post(main_url + '/admin-store/create-store', this.helpersService.generateFormData(data))
      .pipe(tap(() => this.storeCreated$.next()));
  }

  public getStores$(owner_id: string): Observable<Store[]> {
    return this.storeCreated$.pipe(
      startWith(null),
      switchMap(() => this.http.get(main_url + '/admin-store/get-stores', {
        params: {
          owner_id
        }
      }).pipe(map((data: any) => data.results)))
    );
  }

  public getStoreById(store_id: string): Observable<StoreDetails> {
    return this.http.get(main_url + '/admin-store/get-store', {params: {store_id}}).pipe(
      map((data: any) => data.results[0])
    )
  }

  public createProduct(data: CreateProductRequest): Observable<any> {
    const formData = new FormData();
    formData.append('media', data.product_media);
    this.competitionService.uploadMedia(formData);
    if (typeof data.product_media !== 'string') {
      data['product_media'] = main_url + '/media/' + data.product_media.name;
    }
    return this.http
      .post(main_url + '/admin-store/create-product', this.helpersService.generateFormData(data))
      .pipe(tap(() => this.productCreated$.next()));
  }

  public getProducts$(store_id: string): Observable<any> {
    return this.productCreated$.pipe(
      startWith(null),
      switchMap(() =>  this.http.get(main_url + '/admin-store/get-products', {
        params: {
          store_id
        }
      }).pipe(map((data: any) => data.results)))
    );
  }

  public getProductById(product_id: string): Observable<any> {
    return this.http.get(main_url + '/admin-store/get-product', {params: {product_id}}).pipe(
      map((data: any) => data.results[0])
    )
  }

  public deleteProductById(product_id: string): Observable<any> {
    return this.http.post(main_url + '/admin-store/delete-product', {product_id})
      .pipe(tap(() => this.productCreated$.next()));
  }

  public updateProduct(data: UpdateProductRequest): Observable<any> {
    const formData = new FormData();
    formData.append('media', data.product_media);
    this.competitionService.uploadMedia(formData);
    if (typeof data.product_media !== 'string') {
      data['product_media'] = main_url + '/media/' + data.product_media.name;
    }
    return this.http
      .post(main_url + '/admin-store/edit-product', this.helpersService.generateFormData(data))
      .pipe(tap(() => this.productCreated$.next()));
  }
}
