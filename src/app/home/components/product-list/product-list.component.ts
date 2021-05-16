import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  screeenProducts: Product[];
  count;
  cols = 4;
  @Input() type: string;
  paramsObject;
  @Input() search: boolean;
  constructor(private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.products = data.productList;
    });

    if (this.type === 'bestselling') {
      this.getBestSellingProducts();
    }

    this.checkForFilters();

    if (this.search){
      this.checkForSearchQuery();
    }
  }

  getBestSellingProducts(): void {
    this.screeenProducts = this.products.filter(eachProd => eachProd.bestSeller === true);
    this.count = this.screeenProducts.length;
  }

  checkForFilters(): void{
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      if (this.paramsObject.params.categoryName !== undefined && this.paramsObject.params.subCategory === undefined) {
        this.getProductsByCategory(this.paramsObject.params.categoryName);
      } else if (this.paramsObject.params.categoryName !== undefined && this.paramsObject.params.subCategory !== undefined) {
        this.getProductsBySubCategory(this.paramsObject.params.categoryName, this.paramsObject.params.subCategory);
      }else if (this.paramsObject.params.search_query === undefined &&
                this.paramsObject.params.categoryName === undefined && this.paramsObject.params.subCategory === undefined){
        this.router.navigateByUrl('/');
      }
    }
    );
  }

  checkForSearchQuery(): void{
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      if (this.paramsObject.params.search_query !== undefined && this.paramsObject.params.search_query !== 'undefined' &&
            this.paramsObject.params.search_query !== ''){
        this.search = true;
        this.screeenProducts = this.products.filter(elem => elem.tags.includes( this.paramsObject.params.search_query));
        this.count = this.screeenProducts.length;
      }
    });
  }

  getProductsByCategory(categoryName): void {
    this.screeenProducts = this.products.filter(eachProd => eachProd.category.categoryName === categoryName);
    this.count = this.screeenProducts.length;
  }

  getProductsBySubCategory(categoryName, subCategory): void{
    this.screeenProducts = this.products.filter(eachProd => (eachProd.category.categoryName === categoryName &&
                                                                  eachProd.category.subCategory === subCategory));
    this.count = this.screeenProducts.length;
  }
  viewProduct(id: string): void {
    this.router.navigateByUrl('products/' + id);
  }
  homePageRoute(): void{
    this.router.navigateByUrl('');
  }
  categoryRoute(): void{
    this.router.navigateByUrl('/shop?categoryName=' + this.paramsObject.params.categoryName);
  }
}
