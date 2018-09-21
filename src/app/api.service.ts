import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Teacher} from './models/teacher';
import {Report} from './models/report';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static VICE_PRESIDENT = 'vice-president';
  constructor(private http: HttpClient) {
  }

  getClasses(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.endpoint}/classes`);
  }

  getReasons() {
    return this.http.get<string[]>(`${environment.endpoint}/reasons`);
  }

  getReporters() {
    return this.http.get<Teacher[]>(`${environment.endpoint}/reporters`);
  }

  getTeachersByReporter(reporter: string) {
    return this.http.get<Teacher[]>(`${environment.endpoint}/teachers/${reporter}`);
  }

  getTeachers() {
    return this.http.get<Teacher[]>(`${environment.endpoint}/teachers`);
  }

  createReport(report: Report) {
    return this.http.post(`${environment.endpoint}/report`, report);
  }

  getVPClasses(): Observable<String[]> {
    return this.http.get<String[]>(`${environment.endpoint}/${ApiService.VICE_PRESIDENT}/classes`);
  }

  getVicePresidentList(): Observable<String[]> {
    return this.http.get<String[]>(`${environment.endpoint}/${ApiService.VICE_PRESIDENT}/list`);
  }

  getVPGroups(): Observable<String[]> {
    return this.http.get<String[]>(`${environment.endpoint}/${ApiService.VICE_PRESIDENT}/groups`);
  }

  getVPReasons(): Observable<String[]> {
    return this.http.get<String[]>(`${environment.endpoint}/${ApiService.VICE_PRESIDENT}/reasons`);
  }

  getVPTeachers(): Observable<String[]> {
    return this.http.get<String[]>(`${environment.endpoint}/${ApiService.VICE_PRESIDENT}/teachers`);
  }
}
