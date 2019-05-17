import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseUrl = 'http://crushlook.com/crushlookAdminPanel/public/api/';
  constructor(private http:HttpClient) { }

  login(data){
    return this.http.post(`${this.baseUrl}adminLogin`,data);
  }

  viewUserList()
  {
      return this.http.get(`${this.baseUrl}getUserData`);
  }

  changeUserStatus(data)
  {
      return this.http.post(`${this.baseUrl}changeUserStatus`,data);
  }

  deletCrush(data)
  {
    return this.http.post(`${this.baseUrl}deleteCrushData`,data);
  }

  getCrushes()
  {
        return this.http.get(`${this.baseUrl}crushList`);
  }

  getDashboardGraphData()
  {
    return this.http.get(`${this.baseUrl}countOfDetails`);
  }

}
