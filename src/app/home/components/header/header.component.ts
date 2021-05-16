import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchedKeyword: string;
  categories;
  constructor(public translate: TranslateService, private titleService: Title, private readonly router: Router,
              private readonly cateoryService: CategoriesService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.cateoryService.allCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSearchTermChange(): void {
    this.router.navigateByUrl('search?search_query=' + this.searchedKeyword);
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  shopByCategory(categoryName): void {
    this.setTitle('e-Karting the ' + categoryName);
    this.router.navigateByUrl('shop?categoryName=' + categoryName);
  }

  shopBySubCategory(categoryName, subCategory): void {
    this.setTitle('e-Karting the ' + subCategory);
    this.router.navigateByUrl('shop?categoryName=' + categoryName + '&subCategory=' + subCategory);
  }

  logOut(): void {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('itemsInCart');
    this.router.navigateByUrl('/');
  }

  isLoggedIn(): boolean{
    return (sessionStorage.getItem('isLoggedIn') === 'true') ? true : false;
  }

}
