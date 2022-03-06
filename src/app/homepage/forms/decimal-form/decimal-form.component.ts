import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListItem} from "../../../models/ListItem";
import {FormFieldBooleans} from "../../../models/FormFieldBooleans";
import {Constants} from "../../../models/Constants";

@Component({
  selector: 'app-decimal-form',
  templateUrl: './decimal-form.component.html',
  styleUrls: ['./decimal-form.component.css']
})
export class DecimalFormComponent implements OnInit {

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
  @Output() rangedBtnChanged = new EventEmitter<boolean>();
  @Output() makeMinOnlyDecimal = new EventEmitter<string>();
  @Output() makeMaxOnlyDecimal = new EventEmitter<string>();
  @Output() makeBaseOnlyDecimal = new EventEmitter<string>();
  @Output() makeIncrOnlyDecimal = new EventEmitter<string>();
  @Output() madeChange = new EventEmitter<ListItem>();
  constructor() { }

  public ngOnInit(): void {
  }

  public onSubmit(e) {
    e.preventDefault();
  }

  public saveAddOrEdit() {
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
    this.rangedBtnChanged.emit(yes);
  }

  public makeMinOnlyADecimal() {
    this.makeMinOnlyDecimal.emit(this.item.minvaluestr);
  }

  public makeMaxOnlyADecimal() {
    this.makeMaxOnlyDecimal.emit(this.item.maxvaluestr);
  }

  public makeBaseOnlyADecimal() {
    this.makeBaseOnlyDecimal.emit(this.item.basevaluestr);
  }

  public makeIncrOnlyADecimal() {
    this.makeIncrOnlyDecimal.emit(this.item.incrementstr);
  }

  changeMade(fieldName: string) {
    this.madeChange.emit(this.item);
  }
}
