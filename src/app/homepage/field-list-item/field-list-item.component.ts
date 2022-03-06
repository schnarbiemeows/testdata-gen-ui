import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {ListItem} from "../../models/ListItem";

@Component({
  selector: 'app-field-list-item',
  templateUrl: './field-list-item.component.html',
  styleUrls: ['./field-list-item.component.css']
})
export class FieldListItemComponent implements OnInit {

  @Input() i: number;
  @Input() item: ListItem;
  @Input() editMode: boolean;
  @Input() addMode: boolean;
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  editItem(param: any) {
    console.log("edit item " + this.i + " clicked!");
    this.onEdit.emit(param);
  }

  deleteItem(param: any) {
    console.log("delete item " + this.i + " clicked!");
    this.onDelete.emit(param);
  }
}
