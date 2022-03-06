import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListItem} from "../../../models/ListItem";
import {FormFieldBooleans} from "../../../models/FormFieldBooleans";
import {Constants} from "../../../models/Constants";
import {DataTypeOptions} from "../../../models/DataTypeOptions";

@Component({
  selector: 'app-datetime-form',
  templateUrl: './datetime-form.component.html',
  styleUrls: ['./datetime-form.component.css']
})
export class DatetimeFormComponent implements OnInit {

  constants: Constants = new Constants();
  @Input() item: ListItem;
  @Input() ffb: FormFieldBooleans;
  @Input() datetimeoptions: DataTypeOptions[];
  @Input() editMode: boolean;
  @Input() addMode: boolean;
  @Input() saveChangesMsg: string;
  @Input() saveButtonEnabled: boolean;
  @Output() cancelAction = new EventEmitter<void>();
  @Output() saveAdd = new EventEmitter<ListItem>();
  @Output() saveEdit = new EventEmitter<ListItem>();
  @Output() rangedBtnChange = new EventEmitter<boolean>();
  @Output() dateBtnChange = new EventEmitter<string>();
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

  public useRangedBtnChanged(yes: boolean) {
    this.rangedBtnChange.emit(yes);
  }

  public dateTimeBtnChanged(date: string) {
    this.dateBtnChange.emit(date);
  }

  public changeMade(fieldName: string) {
    this.madeChange.emit(this.item);
  }
}
