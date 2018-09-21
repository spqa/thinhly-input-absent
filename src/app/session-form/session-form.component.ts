import {Component, OnInit} from '@angular/core';
import {Teacher} from '../models/teacher';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.scss']
})
export class SessionFormComponent implements OnInit {

  classes: string[];
  reasons: string[];
  teacherAlternative: Teacher[];
  session: {
    session: number,
    className: string,
    reason: string,
    teacherAlternative: string
  } = {
    session: null,
    className: null,
    reason: null,
    teacherAlternative: null
  };

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.session = {
      session: null,
      className: null,
      reason: null,
      teacherAlternative: null
    };
    this.api.getClasses().subscribe(x => this.classes = x);
    this.api.getReasons().subscribe(x => this.reasons = x);
    this.api.getTeachers().subscribe(x => this.teacherAlternative = x);
  }

}
