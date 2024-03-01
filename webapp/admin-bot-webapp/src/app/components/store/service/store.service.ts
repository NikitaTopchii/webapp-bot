import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, shareReplay, startWith, Subject, switchMap, tap } from "rxjs";
import { main_url } from "../../shared/application-context";
import { HelpersService } from "../../core/services/helpers/helpers.service";
import { CompetitionService } from "../../core/services/competition/competition.service";
import { CreateStoreRequest } from "../shared/models/create-store.request.model";
import { Product } from "../shared/models/product.model";
import { StoreDetails } from "../shared/models/store-details.model";
import { Store } from "../shared/models/store.model";
import { CreateProductRequest } from "../shared/models/create-product.request.model";
import { UpdateProductRequest } from "../shared/models/update-product.request.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private storeCreated$ = new Subject<void>();
  private productCreated$ = new Subject<void>();

  private currentProductSource: BehaviorSubject<Product | null> = new BehaviorSubject<Product | null>(null);
  public currentProduct$ = this.currentProductSource.asObservable();

  private currentStoreSource: BehaviorSubject<StoreDetails | null> = new BehaviorSubject<StoreDetails | null>(null);
  public currentStore$ = this.currentStoreSource.asObservable();

  constructor(private http: HttpClient,
              private helpersService: HelpersService,
              private competitionService: CompetitionService) {
  }

  public createStore(store: CreateStoreRequest): Observable<any> {
    return this.http
      .post(main_url + '/admin-store/create-store', this.helpersService.generateFormData(store))
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

  public getStoreById(store_id: number): Observable<StoreDetails> {
    if (this.currentStoreSource.value?.store_id === store_id) {
      return this.currentStore$ as Observable<StoreDetails>;
    }

    return this.http.get(main_url + '/admin-store/get-store', {params: {store_id}}).pipe(
      map((data: any) => data.results[0]),
      tap(data => this.currentStoreSource.next(data)),
      shareReplay(1))
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

  public getProducts$(store_id: string): Observable<Product[]> {
    return this.productCreated$.pipe(
      startWith(null),
      switchMap(() => this.http.get(main_url + '/admin-store/get-products', {
        params: {
          store_id
        }
      }).pipe(map((data: any) => data.results))),
      shareReplay(1)
    );
  }

  public getProductById(product_id: number): Observable<Product> {
    if (this.currentProductSource.value?.product_id === product_id) {
      return this.currentProduct$ as Observable<Product>;
    }

    return this.http.get(main_url + '/admin-store/get-product', {params: {product_id}}).pipe(
      map((data: any) => data.results[0]),
      tap(data => this.currentProductSource.next(data))
    )
  }

  public deleteProductById(product_id: number): Observable<any> {
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
