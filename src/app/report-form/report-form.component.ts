import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Teacher} from '../models/teacher';
import {Report} from '../models/report';
import {SessionFormComponent} from '../session-form/session-form.component';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {
  @Input() teacherAbsent: Teacher[] = [];
  report: Report = new Report();
  formCount = [1];
  @ViewChildren(SessionFormComponent) sessions: QueryList<SessionFormComponent>;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  addSession() {
    this.formCount.push(1);
  }

  getReports(): Report[] {
    return this.sessions.map(x => {
      return {
        date: this.report.date,
        session: x.session.session,
        className: x.session.className,
        teacherAbsent: this.report.teacherAbsent,
        reason: x.session.reason,
        teacherAlternative: x.session.teacherAlternative,
        note: this.report.note
      };
    });
  }

  deleteSession() {
    if (this.formCount.length === 1) {
      return;
    }
    this.formCount.pop();
  }

  resetForm() {
    this.report = new Report();
    this.formCount = [1];
    this.sessions.first.ngOnInit();
  }
}
