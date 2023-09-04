import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products: IProduct[] = [];
  public categories: string[] = ["Men's clothing", "Jewelery", "Electronics", "Women's clothing"];
  public loading: boolean = true;

  private subscription: Subscription = new Subscription();
  private dataSource = new MatTableDataSource<IProduct>([]);
  
  public obsComparations: Observable<IProduct[]>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _productsService: ProductsService, private _authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setView();
  }

  private setView(){
    this.subscription.add(
      this._productsService.getProducts().subscribe( data => {
        if(data){
          this.loading = false;
          this.products = data;
          if (!(this.changeDetectorRef as ViewRef).destroyed) {
            this.changeDetectorRef.detectChanges();
          }
          this.dataSource = new MatTableDataSource<IProduct>(this.products);
          this.obsComparations = this.dataSource.connect();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
    )
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue !== ''){
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSource.filter = ''
    }
  }

  public onCategorySelected(value: string) {
    if (!value) {
      this.dataSource.data = this.products;
      return; 
    }
    
    const filteredData = this.products.filter(x => x.category.toLowerCase() === value.toLowerCase());
    this.dataSource.data = filteredData;
  
    if (!this.obsComparations) {
      this.obsComparations = this.dataSource.connect();
    }
  }

  onLogout(){
    this._authService.logout();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.subscription.unsubscribe();
  }

}
