import { Component, OnInit } from '@angular/core';
import {JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import {ExcelService} from 'src/app/Services/excel.service';
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';

@Component({
  selector: 'app-postmanagement',
  templateUrl: './postmanagement.component.html',
  styleUrls: ['./postmanagement.component.css']
})
export class PostmanagementComponent implements OnInit {

  public error :null;
  public allData : Array<any>;
  public itemsPerPage = 10;
  public page = 1;
  
  public searchText : string;
  public exportData = [];
  public popoverDeleteMessage = "Are you sure want to delete this crush ?";
  public popoverTitle = "Confirmation";
  private ActionStatus = "Deleted";
  crushData = {};
  
  constructor(
    private jarwise:JarwisService,
    private token:TokenService,
    private router:Router,
    private toastaService:ToastaService, 
    private toastaConfig: ToastaConfig,
    private excelService:ExcelService
  ) { this.toastaConfig.theme = 'material'; }

  ngOnInit() {

    this.jarwise.getCrushes().subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error)
    );

  }

  handleResponse(data){
    if(data.status !== 200)
    {
       this.handleError(data.message);

    }else{

     this.allData = data.data;

    }
    
  }

  exportAsXLSX():void {
    // var obj = {a:1,b:2};
    this.allData.forEach((item, index) => {
     
      
       this.exportData.push({
         CrushType:item['type'],
         crushTitle:item['crushTitle'],
         crushDescription:item['crushDescription'],
         Address:item['startingAddress'],
         crushDate:item['crushDate']
     });
     
 });
 
     this.excelService.exportAsExcelFile(this.exportData, 'Crushes');
   }

   deleteCrush(crushId,i)
   {
    this.crushData = {"crushId":crushId};
    this.jarwise.deletCrush(this.crushData).subscribe(
      data=>this.handleDeleteResponse(data, crushId,i),
      error=>console.log(error)
    );

   }

   handleDeleteResponse(data, crushId,i)
   {
      
      let index = (this.page - 1) * this.itemsPerPage + i;

      //this.router.navigateByUrl('/dashboard');
      //let correntIndex = (this.page-1)*this.itemsPerPage + i;
      //this.allData[correntIndex]['status'] =  status;
      // this.allData.filter(datas=>{
      //   if(datas.id === crushId)
      //   {
      //     datas.status = status;
      //   }
      // })
      
      this.allData.splice(index,1);
      this.addToast(data.message);
   }

   addToast(message) {
    // Just add default Toast with title only
    //this.toastaService.default('Hi there');
    // Or create the instance of ToastOptions
    var toastOptions:ToastOptions = {
        title: "Success !",
        msg: message,
        showClose: true,
        timeout: 5000,
        theme: 'default',
        onAdd: (toast:ToastData) => {
            //console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function(toast:ToastData) {
            //console.log('Toast ' + toast.id + ' has been removed!');
        }
    };
    // Add see all possible types in one shot
   // this.toastaService.info(toastOptions);
    this.toastaService.success(toastOptions);
   // this.toastaService.wait(toastOptions);
    //this.toastaService.error(toastOptions);
    //this.toastaService.warning(toastOptions);
}

  handleError(error){
    console.log(error);
    this.error = error.error.error;
    this.token.remove();
    this.router.navigateByUrl('/login');
  }


}
