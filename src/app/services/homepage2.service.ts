import { Injectable } from '@angular/core';
import {ApiServiceService} from "../api/api-service.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {UserConfig} from "../models/UserConfig";
import {ListItem} from "../models/ListItem";
import {FormFieldBooleans} from "../models/FormFieldBooleans";
import {DataTypeOptions} from "../models/DataTypeOptions";
import {Constants} from "../models/Constants";
import * as FileSaver from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class Homepage2Service {

  private constants: Constants = new Constants();
  private subscriptions: Subscription[] = [];
  private userconfig = new BehaviorSubject<UserConfig>(null);
  public userconfig$ = this.userconfig.asObservable();
  // ???
  private selectedRecordType = new BehaviorSubject<string>('');
  public selectedRecordType$ = this.selectedRecordType.asObservable();
  private fileExtension:string = null;
  // end ???
  private ffb = new BehaviorSubject<FormFieldBooleans>(new FormFieldBooleans());
  public ffb$ = this.ffb.asObservable();
  // the 3 page modes
  private addMode = new BehaviorSubject<boolean>(false);
  public addMode$ = this.addMode.asObservable();
  private editMode = new BehaviorSubject<boolean>(false);
  public editMode$ = this.editMode.asObservable();
  private recordtypewasselected = new BehaviorSubject<boolean>(false);
  public recordtypewasselected$ = this.recordtypewasselected.asObservable();
  private datatypewasselected = new BehaviorSubject<boolean>(false);
  public datatypewasselected$ = this.datatypewasselected.asObservable();
  // save button enabled and finish button enabled
  private saveBtnEnabled = new BehaviorSubject<boolean>(false);
  public saveBtnEnabled$ = this.saveBtnEnabled.asObservable();
  private saveChangesMsg = new BehaviorSubject<string>("Save Changes");
  public saveChangesMsg$ = this.saveChangesMsg.asObservable();
  private finishBtnEnabled = new BehaviorSubject<boolean>(false);
  public finishBtnEnabled$ = this.finishBtnEnabled.asObservable();
  private finishedMessage = new BehaviorSubject<string>("Finished");
  public finishedMessage$ = this.finishedMessage.asObservable();
  // the ListItem[] and listItem
  private fieldsList =  new BehaviorSubject<ListItem[]>([]);  // these are our fields, go inside UserConfig
  public fieldsList$ = this.fieldsList.asObservable();
  private copyList: ListItem[] = [];
  private listItemBB =  new BehaviorSubject<ListItem>(null);// the backing bean for the list item form
  public listItemBB$ = this.listItemBB.asObservable();

  private datatypeoptions = new BehaviorSubject<DataTypeOptions[]>([
    {value: 'string', viewValue: 'String'},
    {value: 'whole', viewValue: 'Whole Number'},
    {value: 'number', viewValue: 'Decimal Number'},
    {value: 'boolean', viewValue: 'Boolean'},
    {value: 'datetime', viewValue: 'Date/Time'}
  ]);
  public datatypeoptions$ = this.datatypeoptions.asObservable();
  private datetimeoptions = new BehaviorSubject<DataTypeOptions[]>([
    {value: 'uuuu/MM/dd', viewValue: 'YYYY/MM/DD'},
    {value: 'uuuu-MM-dd', viewValue: 'YYYY-MM-DD'},
    {value: 'uuuuMMdd', viewValue: 'YYYYMMDD'},
    {value: 'MMM dd, uuuu', viewValue: 'MMM DD, YYYY'}
  ]);
  public datetimeoptions$ = this.datetimeoptions.asObservable();

  editIndex: number = 0;

  constructor(private api: ApiServiceService) { }

  public initialize() {
    // initialize the final JSON object that will be sent to the back end
    let config:UserConfig = new UserConfig();
    config.header = false;
    config.footer = false;
    this.userconfig.next(config);
    // initialize the display booleans
    this.ffb.next(new FormFieldBooleans());
    // initialize the list of fields
    this.fieldsList.next([]);
    this.clearOutFormBackingBean();
    this.resetModes();
    this.enableFinishBtn();
  }

  public clearOutFormBackingBean() {
    //console.log("clearing out the form bean")
    let listItemClass= new ListItem();
    listItemClass.minlength = this.constants.minLength;
    listItemClass.maxlength = this.constants.maxLength;
    this.listItemBB.next(listItemClass);
    this.datetimeoptions.next([
      {value: 'uuuu/MM/dd', viewValue: 'YYYY/MM/DD'},
      {value: 'uuuu-MM-dd', viewValue: 'YYYY-MM-DD'},
      {value: 'uuuuMMdd', viewValue: 'YYYYMMDD'},
      {value: 'MMM dd, uuuu', viewValue: 'MMM DD, YYYY'}
    ]);
  }

  public resetModes() {
    //console.log("resetting modes ...");
    this.addMode.next(false);
    this.editMode.next(false);
    let formFieldBooleans = this.ffb.getValue();
    formFieldBooleans.hideAll();
    this.ffb.next(formFieldBooleans);
  }

  onSelectedDataType(dataType: string) {
    console.log("selected the data type ...." + dataType);
    this.clearOutFormBackingBean();
    let listBB = this.listItemBB.getValue();
    let formFieldBooleans = this.ffb.getValue();
    listBB.datatype = dataType;
    if(dataType === "string") {
      formFieldBooleans.turnOnString();
    }
    else if(dataType === "whole") {
      //console.log("showing whole form")
      formFieldBooleans.turnOnWhole();
    }
    else if(dataType === "number") {
      formFieldBooleans.turnOnNumber();
    }
    else if(dataType === "boolean") {
      formFieldBooleans.turnOnBoolean();
    }
    else if(dataType === "datetime") {
      formFieldBooleans.turnOnDateTime();
    }
    else if(dataType === "special") {
      formFieldBooleans.turnOnSpecial();
    }
    this.ffb.next(formFieldBooleans);
    this.listItemBB.next(listBB);
    this.datatypewasselected.next(true);
    this.enableSaveBtn();
  }

  public enableFinishBtn() {
    /**
     * this method should only really get invoked indirectly whenever:
     * 1. the page is initiated(initialized to false)
     * 2. a new field is added,edited, or deleted
     * 3. the filename is changed
     * in each of these events, the userconfig should already be updated
     */
    this.finishedMessage.next("Finished!");
    this.finishBtnEnabled.next(true);
    if(this.addMode.getValue() == true || this.editMode.getValue() == true) {
      this.finishedMessage.next(this.constants.error_mode);
      this.finishBtnEnabled.next(false);
    }
    if(this.fieldsList.getValue().length<1) {
      this.finishedMessage.next(this.constants.error_data);
      this.finishBtnEnabled.next(false);
    }
    if((typeof(this.userconfig.getValue().filename) === "undefined" || this.userconfig.getValue().filename.length < 1)) {
      this.finishedMessage.next(this.constants.error_filename);
      this.finishBtnEnabled.next(false);
    }
  }

  public useRangedNum(value: boolean) {
    let listBB = this.listItemBB.getValue();
    let formFieldBooleans = this.ffb.getValue();
    if(listBB.datatype == "datetime") {
      if(value) {
        listBB.isranged = true;
        formFieldBooleans.hideBaseDte = false;
        if(listBB.hasdate == true) {
          formFieldBooleans.hideDateIncrements = false;
          listBB.startdatetime = '';
          listBB.enddatetime = '';
        }
        if(listBB.hastime == true) {
          formFieldBooleans.hideTimeIncrements = false;
        }
        formFieldBooleans.hideStrtAndEndDte = true;
      } else {
        listBB.isranged = false;
        formFieldBooleans.hideBaseDte = true;
        formFieldBooleans.hideDateIncrements = true;
        formFieldBooleans.hideTimeIncrements = true;
        formFieldBooleans.hideStrtAndEndDte = false;
        listBB.basedatetime = '';
        listBB.inc_yr_str = 0;
        listBB.inc_mth_str = 0;
        listBB.inc_day_str = 0;
        listBB.inc_hrs_str = 0;
        listBB.inc_min_str = 0;
        listBB.inc_sec_str = 0;
      }
    } else if(listBB.datatype == "whole" ) {
      if(value) {
        listBB.isranged = true;
        formFieldBooleans.hideBaseAndIncrVal = false;
        formFieldBooleans.hideMinAndMaxWholeVal = true;
        listBB.minvaluestr = '';
        listBB.maxvaluestr = '';
        listBB.minvalwhole = 0;
        listBB.maxvalwhole = 0;
      } else {
        listBB.isranged = false;
        listBB.basevaluestr = '';
        listBB.incrementstr = '';
        listBB.basevalue = 0;
        listBB.increment = 0;
        formFieldBooleans.hideMinAndMaxWholeVal = false;
        formFieldBooleans.hideBaseAndIncrVal = true;
      }
    } else if(listBB.datatype == "number" ) {
      if(value) {
        listBB.isranged = true;
        formFieldBooleans.hideMinAndMaxDecVal = true;
        formFieldBooleans.hideBaseAndIncDecimalVal = false;
        listBB.minvaluestr = '';
        listBB.maxvaluestr = '';
        listBB.minvaldecimal = 0.0;
        listBB.maxvaldecimal = 0.0;
      } else {
        listBB.isranged = false;
        listBB.basevaluestr = '';
        listBB.incrementstr = '';
        listBB.basevaldecimal = 0.0;
        listBB.incrementdecimal = 0.0;
        formFieldBooleans.hideMinAndMaxDecVal = false;
        formFieldBooleans.hideBaseAndIncDecimalVal = true;
      }
    }
    this.ffb.next(formFieldBooleans);
    this.listItemBB.next(listBB);
    this.enableSaveBtn();
  }

  public initiateAdd() {
    this.editMode.next(false);
    this.addMode.next(true);
    this.enableFinishBtn();
  }

  public enableSaveBtn() {
    /**
     * this method needs to be called indirectly any time a field on the form changes
     * the assumption here is that before the method is called, the listItemBB has been updated
     * these requirements are common to all data types:
     * 1. field name has to be filled out
     * 2. Null % has to be valid
     * 3. Blank % has to be valid
     * 4. Invalid % has to be valid
     */
    var issue = false;
    const listBB = this.listItemBB.getValue();
    if((listBB.dataname === "undefined" || listBB.dataname.length < 1)) {
      this.saveChangesMsg.next(this.constants.error_gen_name);
      issue = true;
    }
    else if((listBB.nullpercent == null)) {
      this.saveChangesMsg.next(this.constants.error_null_blank);
      issue = true;
    }
    else {
      switch (listBB.datatype) {
        case "string": {
          /* string criteria
            EITHER (isfixedlength == false AND BOTH minlength and maxlength > 0) OR
              (isfixedlength == true AND fixedlength > 0 AND EITHER:
                usepattern == false OR (usepattern == true AND pattern.length == fixedlength))
          */
          if(listBB.isfixedlength == false) {
            if(listBB.minlength<1) {
              this.saveChangesMsg.next(this.constants.error_str_minval);
              //console.log("returning str false for min length");
              issue = true;
              break;
            } else if(listBB.maxlength<1) {
              this.saveChangesMsg.next(this.constants.error_str_maxval);
              //console.log("returning str false for max length");
              issue = true;
              break;
            }
          } else { // fixedlength == true here
            if(listBB.fixedlength<1) {
              this.saveChangesMsg.next(this.constants.error_str_fixedval);
              //console.log("returning str false for fixed length");
              issue = true;
              break;
            } else if(listBB.usepattern == true) { // if a pattern was specified
              if(listBB.pattern.length != listBB.fixedlength) {
                this.saveChangesMsg.next(this.constants.error_str_pattern);
                //console.log("returning str false for pattern");
                issue = true;
                break;
              }
            }
          }
          if(listBB.allowuppers == false &&
            listBB.allowlowers == false &&
            listBB.allowuppers == false &&
            listBB.allownumbers == false &&
            listBB.allowspecials == false &&
            listBB.inclusions == '') {
            this.saveChangesMsg.next(this.constants.error_str_box_or_inclusions);
            //console.log("returning str false for pattern");
            issue = true;
            break;
          }
          break;
        }
        case "whole": {
          /**
           * whole criteria:
           * IF Ranged, then the base and increment values have to be filled out or ELSE -
           *    - the min value has to be filled out
           *    - the max value has to be filled out
           *    - the min value <= max value
           */
          if(listBB.isranged == true) {
            if(listBB.basevaluestr == "undefined" || listBB.basevaluestr.length<1) {
              this.saveChangesMsg.next(this.constants.error_whole_baseval);
              issue = true;
              break;
            } else if(listBB.incrementstr == "undefined" || listBB.incrementstr.length<1) {
              this.saveChangesMsg.next(this.constants.error_whole_incr);
              issue = true;
              break;
            }
          } else {
            if(listBB.minvaluestr == "undefined" || listBB.minvaluestr.length<1) {
              this.saveChangesMsg.next(this.constants.error_whole_minval);
              issue = true;
              break;
            } else if(listBB.maxvaluestr == "undefined" || listBB.maxvaluestr.length<1) {
              this.saveChangesMsg.next(this.constants.error_whole_maxval);
              issue = true;
              break;
            } else if(listBB.minvalwhole>listBB.maxvalwhole) {
              this.saveChangesMsg.next(this.constants.error_whole_minmax);
              issue = true;
              break;
            }
          }
          break;
        }
        case "number": {
          /**
           * decimal number criteria:
           * IF Ranged, then the base and increment values have to be filled out or ELSE -
           *    - the min value has to be filled out
           *    - the max value has to be filled out
           *    - the min value <= max value
           */
          if((listBB.signdigits == null)) {
            this.saveChangesMsg.next(this.constants.error_signdigits);
            //console.log("nullpercent is messed up, value is: " + listBB.nullpercent);
            issue = true;
            break;
          }
          if(listBB.isranged == true) {
            if(listBB.basevaluestr == "undefined" || listBB.basevaluestr.length<1) {
              this.saveChangesMsg.next(this.constants.error_whole_baseval);
              issue = true;
              break;
            } else if(listBB.incrementstr == "undefined" || listBB.incrementstr.length<1) {
              this.saveChangesMsg.next(this.constants.error_whole_incr);
              issue = true;
              break;
            } else if(listBB.basevaluestr.endsWith(".")) {
              this.saveChangesMsg.next(this.constants.error_whole_baseval_dec);
              issue = true;
              break;
            } else if(listBB.incrementstr.endsWith(".")) {
              this.saveChangesMsg.next(this.constants.error_whole_incr_dec);
              issue = true;
              break;
            }
          } else {
            if(listBB.minvaluestr == "undefined" || listBB.minvaluestr.length<1) {
              this.saveChangesMsg.next(this.constants.error_whole_minval);
              issue = true;
              break;
            } else if(listBB.maxvaluestr == "undefined" || listBB.maxvaluestr.length<1) {
              this.saveChangesMsg.next(this.constants.error_whole_maxval);
              issue = true;
              break;
            } else if(listBB.minvaluestr.endsWith(".")) {
              this.saveChangesMsg.next(this.constants.error_whole_minval_dec);
              issue = true;
              break;
            } else if(listBB.maxvaluestr.endsWith(".")) {
              this.saveChangesMsg.next(this.constants.error_whole_maxval_dec);
              issue = true;
              break;
            } else if(listBB.minvalwhole>listBB.maxvalwhole) {
              this.saveChangesMsg.next(this.constants.error_whole_minmax);
              issue = true;
              break;
            }
          }
          break;
        }
        case "datetime": {
          if(listBB.format == '') {
            this.saveChangesMsg.next(this.constants.error_datetime_format);
            issue = true;
            break;
          }
          if(listBB.isranged == true) {
            if(listBB.basedatetime.length<10) {
              this.saveChangesMsg.next(this.constants.error_datetime_basecal);
              issue = true;
              break;
            }
            if(listBB.hasdate == true) {
              if((listBB.inc_yr_str == null)) {
                this.saveChangesMsg.next(this.constants.error_yrinc_blank);
                issue = true;
                break;
              }
              if((listBB.inc_mth_str == null)) {
                this.saveChangesMsg.next(this.constants.error_mthinc_blank);
                issue = true;
                break;
              }
              if((listBB.inc_day_str == null)) {
                this.saveChangesMsg.next(this.constants.error_dayinc_blank);
                issue = true;
                break;
              }
            }
            if(listBB.hastime == true) {
              if((listBB.inc_hrs_str == null)) {
                this.saveChangesMsg.next(this.constants.error_hrinc_blank);
                issue = true;
                break;
              }
              if((listBB.inc_min_str == null)) {
                this.saveChangesMsg.next(this.constants.error_mininc_blank);
                issue = true;
                break;
              }
              if((listBB.inc_sec_str == null)) {
                this.saveChangesMsg.next(this.constants.error_secinc_blank);
                issue = true;
                break;
              }
            }
          } else {
            if(listBB.startdatetime.length<10) {
              this.saveChangesMsg.next(this.constants.error_datetime_startcal);
              issue = true;
              break;
            }
            if(listBB.enddatetime.length<10) {
              this.saveChangesMsg.next(this.constants.error_datetime_endcal);
              issue = true;
              break;
            }
            let startdate = new Date(listBB.startdatetime);
            let enddate = new Date(listBB.enddatetime);
            let diff = enddate>startdate;
            console.log("enddate>startdate = " + diff);
            if(enddate<=startdate) {
              this.saveChangesMsg.next(this.constants.error_endbeforestart);
              issue = true;
              break;
            }
            break;
          }
        }
        case "boolean": {
          this.saveChangesMsg.next("Save Changes");
          break;
        }
        case "special": {
          this.saveChangesMsg.next("Save Changes");
          break;
        }
        case "default": {
          this.saveChangesMsg.next("Save Changes");
          break;
        }
      }
    }

    if(issue == true) {
      this.saveBtnEnabled.next(false);
    } else {
      this.saveChangesMsg.next("Save Changes");
      this.saveBtnEnabled.next(true);
    }
  }

  private setBadDataBooleans(input : ListItem) {
    if(input.nullpercent>0) input.canbenull = true;
    return input;
  }

  public copyToEditBB(i: number) {
    this.listItemBB.next(this.fieldsList.getValue()[i]);
  }

  getData() {
    let fileType = "text/plain"
    if(this.userconfig.getValue().format == "JSON") {
      fileType = "application/json";
      this.fileExtension = "json";
    } else if(this.userconfig.getValue().format == "CSV") {
      this.fileExtension = "csv";
    } else if(this.userconfig.getValue().format == "TAB" || this.userconfig.getValue().format == "PIPE") {
      this.fileExtension = "txt";
    } else if(this.userconfig.getValue().format == "MYSQL") {
      this.fileExtension = "sql";
    }
    let userConfig = this.userconfig.getValue();
    userConfig.fields = this.fieldsList.getValue();
    userConfig.numfiles = 1;
    this.userconfig.next(userConfig);
    this.api.makeData(this.userconfig.getValue(), fileType).subscribe(response => {
      console.log(response.body);
      var blob = new Blob([response.body], {type: fileType});
      FileSaver.saveAs(blob, this.userconfig.getValue().filename+"."+this.fileExtension);
    });
  }

  public destroy() {
    this.subscriptions.forEach(rec => rec.unsubscribe());
  }

  /**
   * ****************************************** Event handlers for child components ******************************************
   * @param value
   */
  public
  /**
   * child component record-info event
   * @param $event
   */
  public changeRecordFormat(format: string) {
    let newConfig = this.userconfig.getValue();
    newConfig.format = format;
    this.userconfig.next(newConfig);
    this.recordtypewasselected.next(true);
  }
  /**
   * child component record-info event
   * @param $event
   */
  public lettersOnly(currentFileName: string) {
    var last;
    var onlyletters;
    if (currentFileName.length > 0) {
      last = currentFileName.substring(currentFileName.length - 1);
      onlyletters = /[a-zA-Z]/.test(last);
      if (onlyletters == false) {
        currentFileName = currentFileName.substring(0, currentFileName.length - 1);
      }
    }
    let newConfig = this.userconfig.getValue();
    newConfig.filename = currentFileName;
    this.userconfig.next(newConfig);
    this.enableFinishBtn();
  }

  /**
   * child component record-info event
   * @param $event
   */
  public changeRecordNum(i: number) {
    let newConfig = this.userconfig.getValue();
    newConfig.numrecords = i;
    this.userconfig.next(newConfig);
  }

  /**
   * child component field-list-item event
   * @param $event
   */
  public editItem(i: number) {
    let formFieldBooleans = this.ffb.getValue();
    this.saveChangesMsg.next("Done");
    this.editMode.next(true);
    this.addMode.next(false);
    this.copyToEditBB(i);
    this.editIndex = i;
    if(this.listItemBB.getValue().datatype == "string") {
      formFieldBooleans.turnOnString();
      formFieldBooleans.hideStrFixedLgth = !this.listItemBB.getValue().isfixedlength;
      formFieldBooleans.hideMinAndMaxStrLgth = this.listItemBB.getValue().isfixedlength;
    }
    else if(this.listItemBB.getValue().datatype == "whole") {
      formFieldBooleans.turnOnWhole();
      formFieldBooleans.hideBaseAndIncrVal = !this.listItemBB.getValue().isranged;
      formFieldBooleans.hideMinAndMaxWholeVal = this.listItemBB.getValue().isranged;
    }
    else if(this.listItemBB.getValue().datatype == "number") {
      formFieldBooleans.turnOnNumber();
      if(this.listItemBB.getValue().isranged) {
        formFieldBooleans.turnOnIncrementing();
      }
    }
    else if(this.listItemBB.getValue().datatype == "datetime") {
      formFieldBooleans.turnOnDateTime();
      /** reset like a new data type, but....
       on edit, certain button/fields depend on the current settings
       start/ed dates require isranged == false, base date and increments require isranged = true
      */
      formFieldBooleans.hideStrtAndEndDte = this.listItemBB.getValue().isranged;
      formFieldBooleans.hideBaseDte = !this.listItemBB.getValue().isranged;
      if(this.listItemBB.getValue().isranged == true) {
        if(this.listItemBB.getValue().hasdate == true) {
          formFieldBooleans.hideDateIncrements = false;
        }
        if(this.listItemBB.getValue().hastime == true) {
          formFieldBooleans.hideTimeIncrements = false;
        }
      } else {
        formFieldBooleans.hideDateIncrements = true;
        formFieldBooleans.hideTimeIncrements = true;
      }
      if(this.listItemBB.getValue().hasdate == true && this.listItemBB.getValue().hastime == true) {
        this.datetimeoptions.next([
          {value: 'uuuu/MM/dd HH:mm:ss', viewValue: 'YYYY/MM/DD HH:mm:ss'},
          {value: 'uuuu-MM-dd HH:mm:ss', viewValue: 'YYYY-MM-DD HH:mm:ss'},
          {value: 'uuuuMMddHHmmss', viewValue: 'YYYYMMDDHHmmss'}
        ]);
      } else if(this.listItemBB.getValue().hastime == true) {
        this.datetimeoptions.next([
          {value: 'HH:mm:ss', viewValue: 'HH:mm:ss'},
          {value: 'HHmmss', viewValue: 'HHmmss'}
        ]);
      } else {
        this.datetimeoptions.next([
          {value: 'uuuu/MM/dd', viewValue: 'YYYY/MM/DD'},
          {value: 'uuuu-MM-dd', viewValue: 'YYYY-MM-DD'},
          {value: 'uuuuMMdd', viewValue: 'YYYYMMDD'},
          {value: 'MMM dd, uuuu', viewValue: 'MMM DD, YYYY'}
        ]);
      }
    }
    else if(this.listItemBB.getValue().datatype == "boolean") {
      formFieldBooleans.turnOnBoolean();
    }
    else if(this.listItemBB.getValue().datatype == "special") {
      formFieldBooleans.turnOnSpecial();
    }
    this.ffb.next(formFieldBooleans);
    this.enableFinishBtn();
  }

  /**
   * child component field-list-item event
   * @param $event
   */
  public deleteItem(i: number) {
    //console.log("deleting item ...." + i);
    this.copyList = this.fieldsList.getValue().filter(function (eachElem, index) {
      return index != i
    });
    this.fieldsList.next(this.copyList);
    this.enableFinishBtn();
    /*var j;
    for(j = 0; j< this.fieldsList.length ; j++) {
      if(j < i) {
        //console.log("copying index : " + j + " to copylist");
        this.copyList[j] = this.fieldsList[j];
      }
      else if(j > i) {
        //console.log("copying index : " + j + " to copylist");
        this.copyList[j-1] = this.fieldsList[j];
      }
    }
    this.fieldsList = this.copyList;
    this.arraySize = this.copyList.length;*/
    this.copyList = [];
    this.resetModes();
    //this.reload();
  }

  /**
   * multiple components event
   * @param $event
   */
  public cancelAction() {
    this.clearOutFormBackingBean();
    this.resetModes();
    this.saveChangesMsg.next("Save changes");
    this.enableFinishBtn();
    this.datatypewasselected.next(false);
  }

  /**
   * multiple components event
   * @param $event
   */
  public saveResults($event: ListItem) {
    //console.log("saving the results item ....")
    let fieldsList = this.fieldsList.getValue();
    let listBB = $event;
    if(this.editMode.getValue()) {
      //console.log("saving the edits ....")
      //console.log("selected value is : " + this.selectedValue)
      listBB = this.setBadDataBooleans(listBB);
      fieldsList[this.editIndex] = listBB;
      this.fieldsList.next(fieldsList);
      //this.resetModes();
      //this.saveChangesMsg.next("Save changes");
    }
    else if(this.addMode.getValue()) {
      //console.log("saving record");
      listBB = this.setBadDataBooleans(listBB);
      fieldsList[fieldsList.length] = listBB;
      this.fieldsList.next(fieldsList);
    }
    this.cancelAction();
    this.enableFinishBtn();
  }

  /**
   * child component string-form event
   * @param value
   */
  public changeMade(item: ListItem) {
    let listBB = this.listItemBB.getValue();
    listBB = item;
    this.listItemBB.next(listBB);
    this.enableSaveBtn();
  }

  /**
   * child component string-form event
   * @param value
   */
  public useFixedLength(value: boolean) {
    let listBB = this.listItemBB.getValue();
    let formFieldBooleans = this.ffb.getValue();
    if(value) {
      formFieldBooleans.hideStrFixedLgth = false;
      formFieldBooleans.hideMinAndMaxStrLgth = true;
      listBB.minlength = this.constants.minLength;
      listBB.maxlength = this.constants.maxLength;
      listBB.isfixedlength = true;
    }
    else {
      formFieldBooleans.hideStrFixedLgth = true;
      listBB.fixedlength = 1;
      formFieldBooleans.hideMinAndMaxStrLgth = false;
      listBB.isfixedlength = false;
    }
    this.ffb.next(formFieldBooleans);
    this.listItemBB.next(listBB);
    this.enableSaveBtn();
  }

  /**
   * child component wholenum-form event
   * @param item
   */
  public makeWholeNumOnlyNum(item: string, type: string) {
    let listBB = this.listItemBB.getValue();
    let str = item;
    var the_rest_is_num;
    var first = str.substring(0, 1);
    var last = str.substring(str.length-1);
    var first_is_num;
    var first_is_dash;
    var answer;
    if(str.length==1) {
      answer = /[0-9-]/.test(first);
    } else {
      first_is_dash = /[-]/.test(first);
      first_is_num = /[0-9]/.test(first);
      the_rest_is_num = /^\d+$/.test(str.substring(1));
      answer = (first_is_dash || first_is_num) && the_rest_is_num;
    }
    if(answer == false) {
      str = str.substring(0,str.length-1);
      last = str.substring(str.length-1);
      if(last == ".") {
        do {
          str = str.substring(0,str.length-1);
          last = str.substring(str.length-1);
        } while(last == ".")
      }
    }
    //if(str != item) {
      if(type=="MIN") {
        listBB.minvalwhole = parseInt(str,10);
        listBB.minvaluestr = str;
        console.log("minvalwhole = " + listBB.minvalwhole);
      } else if(type=="MAX") {
        listBB.maxvalwhole = parseInt(str,10);
        listBB.maxvaluestr = str;
        console.log("maxvalwhole = " + listBB.maxvalwhole);
      } else if(type=="BASE") {
        listBB.basevalue = parseInt(str,10);
        listBB.basevaluestr = str;
        console.log("basevalue = " + listBB.basevalue);
      } else if(type=="INCR") {
        listBB.increment = parseInt(str,10);
        listBB.incrementstr = str;
        console.log("increment = " + listBB.increment);
      }
    //}
    this.listItemBB.next(listBB);
    this.enableSaveBtn();
  }

  /**
   * child component decimal-form event
   * @param item
   */
  public makeDecimalOnlyDecimal(item: string, type: string) {
    let listBB = this.listItemBB.getValue();
    var str = item;
    var the_rest_is_num;
    var the_rest_is_num_2;
    var first = str.substring(0, 1);
    var second_is_num;
    var second_is_decimal;
    var secondletter;
    var last = str.substring(str.length-1);
    var first_is_num;
    var first_is_dash;
    var answer;
    //console.log("testing for a decimal");
    if(str.length==1) {
      first_is_dash = /[-]/.test(first);
      first_is_num = /[0-9]/.test(first);
      answer = first_is_dash || first_is_num;
    } else {
      if(str.length==2) {
        //console.log("testing 2-digit number");
        first_is_dash = /[-]/.test(first);
        first_is_num = /[0-9]/.test(first);
        secondletter = str.substring(1,2);
        second_is_num = /[0-9]/.test(secondletter);
        second_is_decimal = /[.]/.test(secondletter);
        answer = (first_is_dash && second_is_num) || (first_is_num && (second_is_decimal || second_is_num));
      } else if(last == ".") {
        //console.log("testing number ending in .");
        answer == true;
      } else {
        first_is_dash = /[-]/.test(first);
        first_is_num = /[0-9]/.test(first);
        //console.log("first number is " + firstgood);
        the_rest_is_num = /^[0-9.]\d*(\.\d+)?$/.test(str.substring(1));
        the_rest_is_num_2 = /^\d*(\.\d+)?$/.test(str.substring(1));
        //console.log("isnum = : " + isnum);
        answer = first_is_dash && the_rest_is_num || first_is_num && the_rest_is_num_2;
      }
    }
    if(answer == false) {
      str = str.substring(0,str.length-1);
      last = str.substring(str.length-1);
      if(last == ".") {
        do {
          str = str.substring(0,str.length-1);
          last = str.substring(str.length-1);
        } while(last == ".")
      }
    }
    if(last != ".") {
      if(type=="MIN") {
        listBB.minvaldecimal = parseInt(str,10);
        listBB.minvaluestr = str;
        console.log("minvaldecimal = " + listBB.minvaldecimal);
      } else if(type=="MAX") {
        listBB.maxvaldecimal = parseInt(str,10);
        listBB.maxvaluestr = str;
        console.log("maxvaldecimal = " + listBB.maxvaldecimal);
      } else if(type=="BASE") {
        listBB.basevaldecimal = parseInt(str,10);
        listBB.basevaluestr = str;
        console.log("basevaldecimal = " + listBB.basevaldecimal);
      } else if(type=="INCR") {
        listBB.incrementdecimal = parseInt(str,10);
        listBB.incrementstr = str;
        console.log("incrementdecimal = " + listBB.incrementdecimal);
      }
    }
    this.listItemBB.next(listBB);
    this.enableSaveBtn();
  }

  /**
   * child component datetime-form event
   * @param value
   */
  public dateTimeBtnChanged(value: string) {
    let listBB = this.listItemBB.getValue();
    let formFieldBooleans = this.ffb.getValue();
    if(value == "date") {
      listBB.hasdate = true;
      listBB.hastime = false;
      this.datetimeoptions.next([
        {value: 'uuuu/MM/dd', viewValue: 'YYYY/MM/DD'},
        {value: 'uuuu-MM-dd', viewValue: 'YYYY-MM-DD'},
        {value: 'uuuuMMdd', viewValue: 'YYYYMMDD'},
        {value: 'MMM dd, uuuu', viewValue: 'MMM DD, YYYY'}
      ]);
      if(listBB.isranged == true) {
        formFieldBooleans.hideDateIncrements = false;
        formFieldBooleans.hideTimeIncrements = true;
        listBB.inc_hrs_str = 0;
        listBB.inc_min_str = 0;
        listBB.inc_sec_str = 0;
      }
      listBB.format = '';
    } else if(value == "time") {
      listBB.hasdate = false;
      listBB.hastime = true;
      this.datetimeoptions.next([
        {value: 'HH:mm:ss', viewValue: 'HH:mm:ss'},
        {value: 'HHmmss', viewValue: 'HHmmss'}
      ]);
      if(listBB.isranged == true) {
        formFieldBooleans.hideDateIncrements = true;
        formFieldBooleans.hideTimeIncrements = false;
        listBB.inc_yr_str = 0;
        listBB.inc_mth_str = 0;
        listBB.inc_day_str = 0;
      }
      listBB.format = '';
    } else /*if(value == "both")*/ {
      listBB.hasdate = true;
      listBB.hastime = true;
      this.datetimeoptions.next([
        {value: 'uuuu/MM/dd HH:mm:ss', viewValue: 'YYYY/MM/DD HH:mm:ss'},
        {value: 'uuuu-MM-dd HH:mm:ss', viewValue: 'YYYY-MM-DD HH:mm:ss'},
        {value: 'uuuuMMddHHmmss', viewValue: 'YYYYMMDDHHmmss'}
      ]);
      if(listBB.isranged == true) {
        formFieldBooleans.hideDateIncrements = false;
        formFieldBooleans.hideTimeIncrements = false;
      }
      listBB.format = '';
    }
    this.ffb.next(formFieldBooleans);
    this.listItemBB.next(listBB);
    this.enableSaveBtn();
  }

  /**
   * child component datetime-form event
   * @param value
   */
  public formatSelected(format: string) {
    let listBB = this.listItemBB.getValue();
    listBB.format = format;
    this.listItemBB.next(listBB);
    this.enableSaveBtn();
  }


}
