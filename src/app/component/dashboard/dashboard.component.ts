import { Component, OnInit } from '@angular/core';
import {JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import {ExcelService} from 'src/app/Services/excel.service';
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public error :null;
  public allData : Array<any>;
  public itemsPerPage = 10;
  public exportData = [];
  public page = 1;
  public searchText : string;
  public popoverDisableMessage = "Are you sure want to disable this user ?";
  public popoverTitle = "Confirmation";
  public popoverEnableMessage = "Are you sure want to enable this user ? ";
  public stausData = {};
  private ActionStatus = "Enabled";
   
  constructor(
    private jarwise:JarwisService,
    private token:TokenService,
    private router:Router,
    private toastaService:ToastaService, 
    private toastaConfig: ToastaConfig,
    private excelService:ExcelService
    ) { this.toastaConfig.theme = 'material'; }

  ngOnInit() {
    
    this.jarwise.viewUserList().subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error)
    );

  }

  handleResponse(data){
    if(data.status !== 200)
    {
      this.error = data.message;

    }else{

     this.allData = data.data;
     

    }
    
  }

  exportAsXLSX():void {
   // var obj = {a:1,b:2};
   this.allData.forEach((item, index) => {
    
      this.exportData.push({
        name:item['name'],
        email:item['email']
    });
    
});

    this.excelService.exportAsExcelFile(this.exportData, 'Users');
  }

  handleError(error){
    console.log(error);
    this.error = error.error.error;
    this.token.remove();
    this.router.navigateByUrl('/login');
  }

  public changeUserStatus(status,userId,i){
    
    this.stausData = {"userId":userId,"status":status};

    this.jarwise.changeUserStatus(this.stausData).subscribe(
      data=>this.handleStatusResponse(data, status,userId),
      error=>console.log(error)
    );

  }


  handleStatusResponse(data, status,userId){

      console.log(data.message);
      //this.router.navigateByUrl('/dashboard');
      //let correntIndex = (this.page-1)*this.itemsPerPage + i;
      //this.allData[correntIndex]['status'] =  status;
      this.allData.filter(datas=>{
         if(datas.id === userId)
         {
           datas.status = status;
         }
      })
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

}
