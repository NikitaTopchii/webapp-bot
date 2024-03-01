import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "../../service/store.service";
import { Observable, switchMap } from "rxjs";
import { TelegramService } from "../../../core/services/telegram/telegram.service";
import { StoreDetails } from "../../shared/models/store-details.model";

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrl: './store-details.component.scss'
})
export class StoreDetailsComponent implements OnInit {
  public currentStore$: Observable<StoreDetails> = this.route.params.pipe(
    switchMap(params => this.storeService.getStoreById(+params['id']))
  )

  constructor(private route: ActivatedRoute,
              private storeService: StoreService,
              private router: Router,
              private telegram: TelegramService) {
  }

  ngOnInit() {
    this.initBackButton();
  }

  public addProduct(): void {
    this.currentStore$.subscribe(({store_id, game_token_id}) => {
      this.router.navigate(['/store/create-product'], {
        relativeTo: this.route,
        queryParams: {
          store_id,
          game_token_id
        }
      })
    })
  }

  public initBackButton(): void {
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(() => this.goBack());
  }

  private goBack(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
