import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListItem} from "../../../models/ListItem";
import {FormFieldBooleans} from "../../../models/FormFieldBooleans";
import {Constants} from "../../../models/Constants";

@Component({
  selector: 'app-wholenum-form',
  templateUrl: './wholenum-form.component.html',
  styleUrls: ['./wholenum-form.component.css']
})
export class WholenumFormComponent implements OnInit {

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
  @Output() makeMinOnlyWhole = new EventEmitter<string>();
  @Output() makeMaxOnlyWhole = new EventEmitter<string>();
  @Output() makeBaseOnlyWhole = new EventEmitter<string>();
  @Output() makeIncrOnlyWhole = new EventEmitter<string>();
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

  public makeMinOnlyAWhole() {
    this.makeMinOnlyWhole.emit(this.item.minvaluestr);
  }

  public makeMaxOnlyAWhole() {
    this.makeMaxOnlyWhole.emit(this.item.maxvaluestr);
  }

  public makeBaseOnlyAWhole() {
    this.makeBaseOnlyWhole.emit(this.item.basevaluestr);
  }

  public makeIncrOnlyAWhole() {
    this.makeIncrOnlyWhole.emit(this.item.incrementstr);
  }

  public changeMade(fieldName: string) {
    this.madeChange.emit(this.item);
  }
}
