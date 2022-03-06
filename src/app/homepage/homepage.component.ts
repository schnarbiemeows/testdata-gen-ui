import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormFieldBooleans } from '../models/FormFieldBooleans';
import { ListItem } from 'src/app/models/ListItem';
import { DataTypeOptions } from 'src/app/models/DataTypeOptions';
import { Constants } from 'src/app/models/Constants';
import {Homepage2Service} from "../services/homepage2.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage2.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  constants: Constants = new Constants();
  private subscriptions: Subscription[] = [];
  // the configuration metadata
  numRecords: number;
  fileName:string;
  format:string;
  // the fields
  fieldsList: ListItem[];  // these are our fields, go inside UserConfig
  copyList: ListItem[] = [];
  listItemBB: ListItem; // the backing bean for the list item form
  // the form display booleans
  ffb: FormFieldBooleans;
  // the three page modes
  editMode: boolean = false;
  addMode: boolean = false;
  recordTypeWasSelected: boolean = false;
  dataTypeWasSelected: boolean = false;
  // the state of the save and finished buttons
  saveBtnEnabled:boolean;
  saveChangesMsg: string = "Save Changes";
  finishBtnEnabled:boolean;
  finishedMessage: string = "Finished!";

  datatypeoptions: DataTypeOptions[] = [
    {value: 'string', viewValue: 'String'},
    {value: 'whole', viewValue: 'Whole Number'},
    {value: 'number', viewValue: 'Decimal Number'},
    {value: 'boolean', viewValue: 'Boolean'},
    {value: 'datetime', viewValue: 'Date/Time'}
  ];
  datetimeoptions: DataTypeOptions[];
  // this is the input value from the data type dropdown
  selectedDataTypeValue: string = '';
  // ???
  arraySize: number = 0;
  editIndex: number = 0;
  // end ???

  constructor( private homepageservice: Homepage2Service ) { }

  public ngOnInit() {
    this.homepageservice.initialize();
    // need to subscribe to the three modes
    this.subscriptions.push(
      this.homepageservice.addMode$.subscribe(rec => {
        this.addMode = rec;
      })
    );
    this.subscriptions.push(
      this.homepageservice.editMode$.subscribe(rec => {
        this.editMode = rec;
      })
    );
    this.subscriptions.push(
      this.homepageservice.recordtypewasselected$.subscribe(rec => {
        this.recordTypeWasSelected = rec;
      })
    );
    this.subscriptions.push(
      this.homepageservice.datatypewasselected$.subscribe(rec => {
        this.dataTypeWasSelected = rec;
      })
    );
    // subscribe to the UserConfig
    this.subscriptions.push(
      this.homepageservice.userconfig$.subscribe(rec => {
        this.format = rec.format;
        this.fileName = rec.filename;
        this.numRecords = rec.numrecords;
      })
    );
    // need to subscribe to the FormFieldBooleans
    this.subscriptions.push(
      this.homepageservice.ffb$.subscribe(rec => {
        this.ffb = rec;
      })
    );
    // need to subscribe to the fieldsList: ListItem[] and listItemBB
    this.subscriptions.push(
      this.homepageservice.fieldsList$.subscribe(rec => {
        this.fieldsList = rec;
      })
    );
    this.subscriptions.push(
      this.homepageservice.listItemBB$.subscribe(rec => {
        this.listItemBB = rec;
      })
    );
    // need to subscribe to the saveBtnEnabled and finishBtnEnabled fields and the messages
    this.subscriptions.push(
      this.homepageservice.saveBtnEnabled$.subscribe(rec => {
        this.saveBtnEnabled = rec;
      })
    );
    this.subscriptions.push(
      this.homepageservice.saveChangesMsg$.subscribe(rec => {
        this.saveChangesMsg = rec;
      })
    );
    this.subscriptions.push(
      this.homepageservice.finishBtnEnabled$.subscribe(rec => {
        this.finishBtnEnabled = rec;
      })
    );
    this.subscriptions.push(
      this.homepageservice.finishedMessage$.subscribe(rec => {
        this.finishedMessage = rec;
      })
    );
    // subscribe to the Date/Time dropdown options
    this.subscriptions.push(
      this.homepageservice.datetimeoptions$.subscribe(rec => {
        this.datetimeoptions = rec;
      })
    );
    console.log("finished");
  }

  public getData() {
    this.homepageservice.getData();
  }

  public initiateAdd() {
    this.homepageservice.initiateAdd();
  }

  public onSubmit(e) {
    //console.log(123);
    e.preventDefault();
  }

  public onSelectedDataType() {
    this.homepageservice.onSelectedDataType(this.listItemBB.datatype);
  }

  public ngOnDestroy(): void {
    this.homepageservice.destroy();
    this.subscriptions.forEach(rec => rec.unsubscribe());
  }

  /**
   * ****************************************** Event handlers for child components ******************************************
   * @param value
   */

  /**
   * child component record-info event
   * @param $event
   */
  public receiveAndRelayRecordFormatChange($event: string) {
    this.homepageservice.changeRecordFormat($event);
  }

  /**
   * child component record-info event
   * @param $event
   */
  public receiveAndRelayFileNameChange($event: string) {
    this.homepageservice.lettersOnly($event);
  }

  /**
   * child component record-info event
   * @param $event
   */
  public receiveAndRelayNumRecordsChange($event: number) {
    this.homepageservice.changeRecordNum($event);
  }

  /**
   * child component field-list-item event
   * @param $event
   */
  public receiveAndRelayInitiateEdit($event: number) {
    this.homepageservice.editItem($event);
  }

  /**
   * child component field-list-item event
   * @param $event
   */
  public receiveAndRelayDelete($event: number) {
    this.homepageservice.deleteItem($event);
  }

  /**
   * all of the form components use this
   */
  public cancelAction() {
    this.homepageservice.cancelAction();
  }

  /**
   * all of the form components use this
   */
  public saveResults($event) {
    this.homepageservice.saveResults($event);
  }

  /**
   * child component string-form event
   * @param value
   */
  public useFixedLength(value: boolean) {
    this.homepageservice.useFixedLength(value);
  }

  /**
   * child component wholenum-form event
   * @param value
   */
  public makeMinOnlyWhole(item: string) {
    this.homepageservice.makeWholeNumOnlyNum(item,"MIN");
  }

  /**
   * child component wholenum-form event
   * @param value
   */
  public makeMaxOnlyWhole(item: string) {
    this.homepageservice.makeWholeNumOnlyNum(item,"MAX");
  }

  /**
   * child component wholenum-form event
   * @param value
   */
  public makeBaseOnlyWhole(item: string) {
    this.homepageservice.makeWholeNumOnlyNum(item,"BASE");
  }

  /**
   * child component wholenum-form event
   * @param value
   */
  public makeIncrOnlyWhole(item: string) {
    this.homepageservice.makeWholeNumOnlyNum(item,"INCR");
  }

  /**
   * child component wholenum-form event
   * @param value
   */
  public useRangedNum(trueOrFalse: boolean) {
    this.homepageservice.useRangedNum(trueOrFalse);
  }

  /**
   * child component decimal-form event
   * @param value
   */
  public makeMinOnlyDecimal(item: string) {
    this.homepageservice.makeDecimalOnlyDecimal(item,"MIN");
  }

  /**
   * child component decimal-form event
   * @param value
   */
  public makeMaxOnlyDecimal(item: string) {
    this.homepageservice.makeDecimalOnlyDecimal(item,"MAX");
  }

  /**
   * child component decimal-form event
   * @param value
   */
  public makeBaseOnlyDecimal(item: string) {
    this.homepageservice.makeDecimalOnlyDecimal(item,"BASE");
  }

  /**
   * child component decimal-form event
   * @param value
   */
  public makeIncrOnlyDecimal(item: string) {
    this.homepageservice.makeDecimalOnlyDecimal(item,"INCR");
  }

  /**
   * child component datetime-form event
   * @param value
   */
  public dateTimeBtnChanged(value: string) {
    this.homepageservice.dateTimeBtnChanged(value);
  }

  /**
   * child component datetime-form event
   * @param value
   */
  public formatSelected($event: string) {
    this.homepageservice.formatSelected($event);
  }

  /**
   * child component all the forms call this event
   * @param value
   */
  changeMade(item: ListItem) {
    this.homepageservice.changeMade(item);
  }
}
