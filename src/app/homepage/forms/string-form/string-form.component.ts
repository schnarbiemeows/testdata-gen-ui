import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListItem} from "../../../models/ListItem";
import {FormFieldBooleans} from "../../../models/FormFieldBooleans";
import {Constants} from "../../../models/Constants";

@Component({
  selector: 'app-string-form',
  templateUrl: './string-form.component.html',
  styleUrls: ['./string-form.component.css']
})
export class StringFormComponent implements OnInit {

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
  @Output() fixedLength = new EventEmitter<boolean>();
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

  useFixedLength(b: boolean) {
    this.fixedLength.emit(b);
  }

  public changeMade(fieldName: string) {
    if(fieldName === "lower" ) this.item.allowlowers=!this.item.allowlowers;
    if(fieldName === "upper" ) this.item.allowuppers=!this.item.allowuppers;
    if(fieldName === "numbers" ) this.item.allownumbers=!this.item.allownumbers;
    if(fieldName === "specials" ) this.item.allowspecials=!this.item.allowspecials;
    this.madeChange.emit(this.item);
  }
}
