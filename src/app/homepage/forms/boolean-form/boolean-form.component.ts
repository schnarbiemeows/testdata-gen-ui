import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormFieldBooleans} from "../../../models/FormFieldBooleans";
import {ListItem} from "../../../models/ListItem";
import {Constants} from "../../../models/Constants";

@Component({
  selector: 'app-boolean-form',
  templateUrl: './boolean-form.component.html',
  styleUrls: ['./boolean-form.component.css']
})
export class BooleanFormComponent implements OnInit {

  constants: Constants = new Constants();
  @Input() item: ListItem;
  @Input() ffb: FormFieldBooleans;
  @Input() editMode: boolean;
  @Input() addMode: boolean;
  @Input() saveChangesMsg: string;
  @Input() saveButtonEnabled: boolean;
  @Output() cancelAction = new EventEmitter<void>();
  @Output() saveAdd = new EventEmitter<ListItem>();
  @Output() saveEdit = new EventEmitter<ListItem>();
  @Output() madeChange = new EventEmitter<ListItem>();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(e) {
    e.preventDefault();
  }

  saveAddOrEdit() {
    if(this.addMode==true) {
      console.log("saving action");
      this.saveAdd.emit(this.item);
    } else {
      console.log("editing action");
      this.saveEdit.emit(this.item);
    }
  }

  public cancel() {
    console.log("action cancelled");
    this.cancelAction.emit();
  }

  public changeMade(fieldName: string) {
    this.madeChange.emit(this.item);
  }
}
