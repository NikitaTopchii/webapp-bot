import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, startWith, Subject, switchMap, tap } from "rxjs";
import { main_url } from "../../../shared/application-context";
import { HelpersService } from "../../../core/services/helpers/helpers.service";
import { CompetitionService } from "../../../core/services/competition/competition.service";
import { CreateStoreRequest } from "../models/create-store.request.model";
import { Product } from "../models/product.model";
import { StoreDetails } from "../models/store-details.model";
import { Store } from "../models/store.model";
import { CreateProductRequest } from "../models/create-product.request.model";
import { UpdateProductRequest } from "../models/update-product.request.model";
import { SourceRequestInterface } from "../models/source.request.model";


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private http = inject(HttpClient);
  private helpersService = inject(HelpersService);
  private competitionService = inject(CompetitionService);

  private storeCreated$ = new Subject<void>();
  private productCreated$ = new Subject<void>();

  private currentProductSource: BehaviorSubject<SourceRequestInterface<Product | null>> = new BehaviorSubject<SourceRequestInterface<Product | null>>({
    data: null,
    isLoading: false
  });
  public currentProduct$ = this.currentProductSource.asObservable().pipe(map(product => product?.data));

  private currentStoreSource: BehaviorSubject<SourceRequestInterface<StoreDetails | null>> = new BehaviorSubject<SourceRequestInterface<StoreDetails | null>>({
    data: null,
    isLoading: false
  });
  public currentStore$ = this.currentStoreSource.asObservable().pipe(map(store => store.data));

  private storeListSource: BehaviorSubject<SourceRequestInterface<Store[]>> = new BehaviorSubject<SourceRequestInterface<Store[]>>({
    data: [],
    isLoading: false
  });
  public storeList$ = this.storeListSource.asObservable().pipe(map(storeList => storeList.data));

  private productListSource: BehaviorSubject<SourceRequestInterface<Product[]>> = new BehaviorSubject<SourceRequestInterface<Product[]>>({
    data: [],
    isLoading: false
  });
  public productList$ = this.productListSource.asObservable().pipe(map(productList => productList.data));

  public createStore(store: CreateStoreRequest): Observable<any> {
    return this.http
      .post(main_url + '/admin-store/create-store', this.helpersService.generateFormData(store))
      .pipe(tap(() => this.storeCreated$.next()));
  }

  public getStores$(owner_id: string): Observable<Store[]> {
    const {isLoading} = this.storeListSource.value;
    if (isLoading) {
      return this.storeList$;
    }

    this.storeListSource.next({data: [], isLoading: true});

    return this.storeCreated$.pipe(
      startWith(null),
      switchMap(() => this.http.get(main_url + '/admin-store/get-stores', {
        params: {
          owner_id
        }
      }).pipe(map((data: any) => data.results))),
      tap(data => this.storeListSource.next({data, isLoading: false})),
    );
  }

  public getStoreById(store_id: number): Observable<StoreDetails> {
    const {isLoading} = this.currentStoreSource.value;
    if (isLoading) {
      return this.currentStore$ as Observable<StoreDetails>;
    }

    return this.http.get(main_url + '/admin-store/get-store', {params: {store_id}}).pipe(
      map((data: any) => data.results[0]),
      tap(data => this.currentStoreSource.next({data, isLoading: false})))
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
    const {isLoading} = this.productListSource.value;
    if (isLoading) {
      return this.productList$;
    }

    this.productListSource.next({data: [], isLoading: true});

    return this.productCreated$.pipe(
      startWith(null),
      switchMap(() => this.http.get(main_url + '/admin-store/get-products', {
        params: {
          store_id
        }
      }).pipe(map((data: any) => data.results))),
      tap(data => this.productListSource.next({data, isLoading: false})),
    );
  }

  public getProductById(product_id: number): Observable<Product> {
    const {data, isLoading} = this.currentProductSource.value;
    if (isLoading) {
      return this.currentProduct$ as Observable<Product>;
    }

    this.currentProductSource.next({data, isLoading: true});

    return this.http.get(main_url + '/admin-store/get-product', {params: {product_id}}).pipe(
      map((data: any) => data.results[0]),
      tap(data => this.currentProductSource.next({data, isLoading: false})),
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
