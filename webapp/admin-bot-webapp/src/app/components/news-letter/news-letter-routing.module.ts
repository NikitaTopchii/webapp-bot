import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NewsLetterComponent} from "./news-letter.component";

const routes: Routes = [
  {
    path: 'main',
    component: NewsLetterComponent
  },
  {
    path: 'public',
    loadChildren: () => import("./public-news-letter/public-news-letter.module").then((m) => m.PublicNewsLetterModule)
  },
  {
    path: 'private',
    loadChildren: () => import("./private-news-letter/private-news-letter.module").then((m) => m.PrivateNewsLetterModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsLetterRoutingModule {}
