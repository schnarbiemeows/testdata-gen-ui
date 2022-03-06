import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Constants} from "../../models/Constants";
import {UserConfig} from "../../models/UserConfig";

@Component({
  selector: 'app-record-info',
  templateUrl: './record-info.component.html',
  styleUrls: ['./record-info.component.css']
})
export class RecordInfoComponent implements OnInit {

  constants: Constants = new Constants();
  @Input() fileName: string;
  @Input() numRecords: number;
  @Input() format: string;
  @Output() recordtypewasselected = new EventEmitter<string>();
  @Output() numRecSelected = new EventEmitter<number>();
  @Output() filenameletters = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  public recordTypeSelected() {
    //console.log("result = " + value.target);
    this.recordtypewasselected.emit(this.format);
  }

  lettersOnly() {
    this.filenameletters.emit(this.fileName);
  }

  numRecordsSelected() {
    this.numRecSelected.emit(this.numRecords);
  }
}
