import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListItem} from "../../models/ListItem";

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.css']
})
export class FieldListComponent implements OnInit {
  @Input() fieldsList: ListItem[];
  @Input() editMode: boolean;
  @Input() addMode: boolean;
  @Output() relayEdit = new EventEmitter<number>();
  @Output() relayDelete = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  public receiveAndRelayEdit(event:any) {
    this.relayEdit.emit(event);
  }

  public receiveAndRelayDelete(event:any) {
    this.relayDelete.emit(event);
  }
}
