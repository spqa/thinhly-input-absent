import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Teacher} from './models/teacher';
import {ApiService} from './api.service';
import {Report} from './models/report';
import {ReportFormComponent} from './report-form/report-form.component';
import {concat} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formCount = [1];
  isLoading = false;
  reporters: Teacher[];
  teacherAbsent: Teacher[] = [];
  @ViewChildren(ReportFormComponent) reports: QueryList<ReportFormComponent>;

  constructor(private api: ApiService) {
    this.api.getReporters().subscribe(x => {
      this.reporters = x;
      this.changeReporter(x[0].shortName);
    });
  }

  ngOnInit(): void {
  }

  addTeacher() {
    this.formCount.push(1);
  }

  changeReporter(value: string) {
    this.api.getTeachersByReporter(value).subscribe(x => this.teacherAbsent = x);
  }

  createReport() {
    let reports: Report[] = [];
    this.reports.forEach(x => reports = [...reports, ...x.getReports()]);
    console.log(reports);
    let isValid = true;
    for (const report of reports) {
      if (!!!report.date || !!!report.session || !!!report.teacherAbsent || !!!report.className
        || !!!report.reason || !!!report.teacherAlternative) {
        isValid = false;
        alert('Có giá trị không hợp lệ');
        break;
      }
    }
    if (isValid) {
      this.isLoading = true;
      const source = [];
      reports.forEach(x => {
        source.push(this.api.createReport(x));
      });
      console.log(source);
      concat(...source).subscribe(
        () => {
          if (this.isLoading === true) {
            alert('Lưu thành công');
            this.isLoading = false;
          }
        },
        (err) => {
          console.log(err);
          alert('Đã có lỗi xảy ra!');
        }
      );
    }
  }

  deleteTeacher() {
    if (this.formCount.length === 1) {
      return;
    }
    this.formCount.pop();
  }
}
