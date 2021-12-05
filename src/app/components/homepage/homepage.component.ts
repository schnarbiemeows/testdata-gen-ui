import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormFieldBooleans } from '../../models/FormFieldBooleans';
import { HomePageService } from '../../services/homepage.service';
import { InitialConfig } from '../../models/InitialConfig';
import { ListItem } from 'src/app/models/ListItem';
import { UserConfig } from 'src/app/models/UserConfig';
import { DataTypeOptions } from 'src/app/models/datatypeoptions';
import { Constants } from 'src/app/models/Constants';
import { StylesCompileDependency } from '@angular/compiler';
import { saveAs } from 'file-saver';
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage2.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomePageComponent implements OnInit {
  config: InitialConfig;
  constants: Constants;
  userconfig: UserConfig;
  numRecords: number = 5;
  selectedRecordType: string = '';
  fileExtension: string = "json";
  filename: string;
  header: boolean = false;
  footer: boolean = false;
  loginid: number = 100;
  dataconfigname: string = "TEST";
  fieldsList: ListItem[];  // these are our fields, go inside UserConfig
  copyList: ListItem[] = [];
  listItemBB: ListItem; // the backing bean for the list item form
  loaded: boolean = false;
  recordtypewasselected: boolean = false;
  // the two form display booleans
  showForm: boolean = false;
  showListItemForm: boolean = false;
  fbb: FormFieldBooleans;
  // the two form modes
  editMode: boolean = false;
  addMode: boolean = false;
  addItemMessage: string = 'Add Field';
  formMessage: string = 'Add New Field';
  saveChangesMsg: string = "Save Changes";
  cancelMsg: string = "Cancel";
  finishedMessage: string = "Finished!";
  datatypeoptions: DataTypeOptions[] = [
    {value: 'string', viewValue: 'String'},
    {value: 'whole', viewValue: 'Whole Number'},
    {value: 'number', viewValue: 'Decimal Number'},
    {value: 'boolean', viewValue: 'Boolean'},
    {value: 'datetime', viewValue: 'Date/Time'}
  ];
  datetimeoptions: DataTypeOptions[] = [
    {value: 'uuuu/MM/dd', viewValue: 'YYYY/MM/DD'},
    {value: 'uuuu-MM-dd', viewValue: 'YYYY-MM-DD'},
    {value: 'uuuuMMdd', viewValue: 'YYYYMMDD'},
    {value: 'MMM dd, uuuu', viewValue: 'MMM DD, YYYY'}
  ];
  datatypeselected: boolean = false;
  selectedValue: string = '';
  arraySize: number = 0;
  editIndex: number = 0;
  addbtnhidden: boolean = false;



  constructor( private homepageservice: HomePageService ) { }

  ngOnInit() {
    //console.log("initializing ....")
    this.reload();
  }

  reload() {
    this.loaded = false;
    this.header = false;
    this.footer = false;
    this.constants = new Constants();
    //console.log("loading data ....")
    this.homepageservice.getPageConfig().subscribe(config => {
      this.config = config;
      this.clearOutFormBackingBean();
      this.arraySize = 0;
      //this.makeAnInitialItem();
      this.fieldsList = [];
      this.constants = new Constants();
      this.fbb = new FormFieldBooleans();
      this.loaded = true;
    });
    this.resetModes();
    this.addItemMessage = 'Add a field';
    this.formMessage = 'Add New Field';
  }

  getData() {
    let fileType = "text/plain"
    if(this.selectedRecordType == "JSON") {
      fileType = "application/json";
      this.fileExtension = "json";
      this.footer = false;
    } else if(this.selectedRecordType == "CSV") {
      this.fileExtension = "csv";
    } else if(this.selectedRecordType == "TAB" || this.selectedRecordType == "PIPE") {
      this.fileExtension = "txt";
    } else if(this.selectedRecordType == "MYSQL") {
      this.fileExtension = "sql";
      this.footer = false;
    }
    this.userconfig = new UserConfig();
    this.userconfig.fields = this.fieldsList;
    this.userconfig.filename = this.filename;
    this.userconfig.footer = this.footer;
    this.userconfig.header = this.header;
    this.userconfig.format = this.selectedRecordType;
    this.userconfig.numfiles = 1;
    this.userconfig.numrecords = this.numRecords;
    this.homepageservice.makeData(this.userconfig, fileType).subscribe(response => {
      console.log(response.body);
      var blob = new Blob([response.body], {type: fileType});
      FileSaver.saveAs(blob, this.userconfig.filename+"."+this.fileExtension);
    });
  }

  lettersOnly() {
    var last;
    var onlyletters;
    if(this.filename.length>0) {
     last = this.filename.substring(this.filename.length-1);
     onlyletters =  /[a-zA-Z]/.test(last);
     if(onlyletters == false) {
       this.filename = this.filename.substring(0,this.filename.length-1);
     }
    }

  }

  useDistincts(value: string) {
    //console.log("changed the button to " + value)
    if(value == "yes") {
      this.listItemBB.usedistinctvals = true;
      this.fbb.hideDstnctFld = false;
    } else {
      this.listItemBB.usedistinctvals = false;
      this.fbb.hideDstnctFld = true;
      this.listItemBB.distinctvalues = 1;
    }
  }

  usePattern(value: string) {
    if(value == "yes") {
      this.fbb.hideStrPtrnTxt = false;
      this.listItemBB.usepattern = true;
    }
    else {
      this.fbb.hideStrPtrnTxt = true;
      this.listItemBB.usepattern = false;
      this.listItemBB.pattern = '';
    }
  }

  dateTimeBtnChanged(value: string) {
    //console.log("clicked the fixed string length to " + value)
    if(value == "date") {
      this.listItemBB.hasdate = true;
      this.listItemBB.hastime = false;
      this.datetimeoptions = [
        {value: 'uuuu/MM/dd', viewValue: 'YYYY/MM/DD'},
        {value: 'uuuu-MM-dd', viewValue: 'YYYY-MM-DD'},
        {value: 'uuuuMMdd', viewValue: 'YYYYMMDD'},
        {value: 'MMM dd, uuuu', viewValue: 'MMM DD, YYYY'}
      ];
      if(this.listItemBB.isranged == true) {
        this.fbb.hideYrsInc = false;
        this.fbb.hideMthsInc = false;
        this.fbb.hideDaysInc = false;
        this.fbb.hideHrsInc = true;
        this.fbb.hideMinInc = true;
        this.fbb.hideSecInc = true;
        this.listItemBB.inc_hrs_str = 0;
        this.listItemBB.inc_min_str = 0;
        this.listItemBB.inc_sec_str = 0;
      }
      this.listItemBB.format = '';
    } else if(value == "time") {
      this.listItemBB.hasdate = false;
      this.listItemBB.hastime = true;
      this.datetimeoptions = [
        {value: 'HH:mm:ss', viewValue: 'HH:mm:ss'},
        {value: 'HHmmss', viewValue: 'HHmmss'}
      ];
      if(this.listItemBB.isranged == true) {
        this.fbb.hideYrsInc = true;
        this.fbb.hideMthsInc = true;
        this.fbb.hideDaysInc = true;
        this.fbb.hideHrsInc = false;
        this.fbb.hideMinInc = false;
        this.fbb.hideSecInc = false;
        this.listItemBB.inc_yr_str = 0;
        this.listItemBB.inc_mth_str = 0;
        this.listItemBB.inc_day_str = 0;
      }
      this.listItemBB.format = '';
    } else /*if(value == "both")*/ {
      this.listItemBB.hasdate = true;
      this.listItemBB.hastime = true;
      this.datetimeoptions = [
        {value: 'uuuu/MM/dd HH:mm:ss', viewValue: 'YYYY/MM/DD HH:mm:ss'},
        {value: 'uuuu-MM-dd HH:mm:ss', viewValue: 'YYYY-MM-DD HH:mm:ss'},
        {value: 'uuuuMMddHHmmss', viewValue: 'YYYYMMDDHHmmss'}
      ];
      if(this.listItemBB.isranged == true) {
        this.fbb.hideYrsInc = false;
        this.fbb.hideMthsInc = false;
        this.fbb.hideDaysInc = false;
        this.fbb.hideHrsInc = false;
        this.fbb.hideMinInc = false;
        this.fbb.hideSecInc = false;
      }
      this.listItemBB.format = '';
    }
  }

  enableFinishBtn() {
    if(this.addMode == true || this.editMode == true) {
      this.finishedMessage = this.constants.error_mode;
      //console.log("returning str false for name, value is: " + this.listItemBB.dataname);
      return false;
    }
    if(this.fieldsList.length<1) {
      this.finishedMessage = this.constants.error_data;
      //console.log("returning str false for name, value is: " + this.listItemBB.dataname);
      return false;
    }
    if((typeof(this.filename) === "undefined" || this.filename.length < 1)) {
      this.finishedMessage = this.constants.error_filename;
      //console.log("returning str false for name, value is: " + this.listItemBB.dataname);
      return false;
    }
    this.finishedMessage = "Finished!";
    return true;
  }

  useFixedLength(value: string) {
    //console.log("clicked the fixed string length to " + value)
    if(value == "yes") {
      this.fbb.hideStrFixedLgth = false;
      this.fbb.hideMinStrLgth = true;
      this.listItemBB.minlength = this.config.stringOps.minlength;
      this.fbb.hideMaxStrLgth = true;
      this.listItemBB.maxlength = this.config.stringOps.maxlength;
      if(this.listItemBB.usepattern == false) {
        this.fbb.hideStrPtrnTxt = true;
      } else {
        this.fbb.hideStrPtrnTxt = false;
      }
      this.fbb.hidePatternYorN = false;
      this.listItemBB.isfixedlength = true;
    }
    else {
      this.fbb.hideStrFixedLgth = true;
      this.listItemBB.fixedlength = 1;
      this.fbb.hideMinStrLgth = false;
      this.fbb.hideMaxStrLgth = false;
      this.fbb.hideStrPtrnTxt = true;
      this.listItemBB.pattern = '';
      this.fbb.hidePatternYorN = true;
      this.listItemBB.isfixedlength = false;
    }

  }

  useRangedNum(value: string) {
    if(this.listItemBB.datatype == "datetime") {
      if(value == "yes") {
        this.listItemBB.isranged = true;
        this.fbb.hideBaseDte = false;
        if(this.listItemBB.hasdate == true) {
          this.fbb.hideAllIncrements = false;
          this.fbb.hideYrsInc = false;
          this.fbb.hideMthsInc = false;
          this.fbb.hideDaysInc = false;
          this.listItemBB.startdatetime = '';
          this.listItemBB.enddatetime = '';
        }
        if(this.listItemBB.hastime == true) {
          this.fbb.hideAllIncrements = false;
          this.fbb.hideHrsInc = false;
          this.fbb.hideMinInc = false;
          this.fbb.hideSecInc = false;
        }
        this.fbb.hideStrtDte = true;
        this.fbb.hideEndDte = true;
        this.fbb.hideDstnctFld = true;
        this.listItemBB.distinctvalues = 1;
        this.listItemBB.usedistinctvals = false;
        this.fbb.hideDstnctYorN = true;
      } else {
        this.listItemBB.isranged = false;
        this.fbb.hideBaseDte = true;
        this.fbb.hideAllIncrements = true;
        this.fbb.hideYrsInc = true;
        this.fbb.hideMthsInc = true;
        this.fbb.hideDaysInc = true;
        this.fbb.hideHrsInc = true;
        this.fbb.hideMinInc = true;
        this.fbb.hideSecInc = true;
        this.fbb.hideStrtDte = false;
        this.fbb.hideEndDte = false;
        this.fbb.hideDstnctFld = true;
        this.fbb.hideDstnctYorN = false;
        this.listItemBB.usedistinctvals = false;
        this.listItemBB.basedatetime = '';
        this.listItemBB.inc_yr_str = 0;
        this.listItemBB.inc_mth_str = 0;
        this.listItemBB.inc_day_str = 0;
        this.listItemBB.inc_hrs_str = 0;
        this.listItemBB.inc_min_str = 0;
        this.listItemBB.inc_sec_str = 0;
      }
    } else if(this.listItemBB.datatype == "whole" ) {
      if(value == "yes") {
        this.listItemBB.isranged = true;
        this.fbb.hideBaseVal = false;
        this.fbb.hideIncrementVal = false;
        this.fbb.hideMinWholeVal = true;
        this.fbb.hideMaxWholeVal = true;
        this.fbb.hideDstnctFld = true;
        this.listItemBB.distinctvalues = 1;
        this.listItemBB.minvaluestr = '';
        this.listItemBB.maxvaluestr = '';
        this.listItemBB.minvalwhole = 0;
        this.listItemBB.maxvalwhole = 0;
        this.fbb.hideDstnctYorN = true;
        this.listItemBB.usedistinctvals = false;
      } else {
        this.listItemBB.isranged = false;
        this.listItemBB.basevaluestr = '';
        this.listItemBB.incrementstr = '';
        this.listItemBB.basevalue = 0;
        this.listItemBB.increment = 0;
        this.fbb.hideMinWholeVal = false;
        this.fbb.hideMaxWholeVal = false;
        this.fbb.hideBaseVal = true;
        this.fbb.hideIncrementVal = true;
        this.fbb.hideDstnctFld = true;
        this.fbb.hideDstnctYorN = false;
        this.listItemBB.usedistinctvals = false;
      }
    } else if(this.listItemBB.datatype == "number" ) {
      if(value == "yes") {
        this.listItemBB.isranged = true;
        this.fbb.hideMinDecVal = true;
        this.fbb.hideMaxDecVal = true;
        this.fbb.hideMinWholeVal = true;
        this.fbb.hideMaxWholeVal = true;
        this.fbb.hideBaseDecimalVal = false;
        this.fbb.hideIncDecimalVal = false;
        this.fbb.hideDstnctFld = true;
        this.listItemBB.distinctvalues = 1;
        this.listItemBB.minvaluestr = '';
        this.listItemBB.maxvaluestr = '';
        this.listItemBB.minvaldecimal = 0.0;
        this.listItemBB.maxvaldecimal = 0.0;
        this.fbb.hideDstnctYorN = true;
        this.listItemBB.usedistinctvals = false;
      } else {
        this.listItemBB.isranged = false;
        this.listItemBB.basevaluestr = '';
        this.listItemBB.incrementstr = '';
        this.listItemBB.basevaldecimal = 0.0;
        this.listItemBB.incrementdecimal = 0.0;
        this.fbb.hideMinDecVal = false;
        this.fbb.hideMaxDecVal = false;
        this.fbb.hideMinWholeVal = true;
        this.fbb.hideMaxWholeVal = true;
        this.fbb.hideBaseDecimalVal = true;
        this.fbb.hideIncDecimalVal = true;
        this.fbb.hideDstnctFld = true;
        this.fbb.hideDstnctYorN = false;
        this.listItemBB.usedistinctvals = false;
      }
    }
  }

  enableSaveBtn() {
    //console.log("checking save button for data type: " + this.listItemBB.datatype);
    /**
     * these requirements are common to all data types:
     * 1. field name has to be filled out
     * 2. Null % has to be valid
     * 3. Blank % has to be valid
     * 4. Invalid % has to be valid
     */
    if((this.listItemBB.dataname === "undefined" || this.listItemBB.dataname.length < 1)) {
      this.saveChangesMsg = this.constants.error_gen_name;
      //console.log("returning str false for name, value is: " + this.listItemBB.dataname);
      return false;
    }
    if((this.listItemBB.nullpercent == null)) {
      this.saveChangesMsg = this.constants.error_null_blank;
      //console.log("nullpercent is messed up, value is: " + this.listItemBB.nullpercent);
      return false;
    }
    if((this.listItemBB.blankpercent == null)) {
      this.saveChangesMsg = this.constants.error_blank_blank;
      //console.log("returning str false for name, value is: " + this.listItemBB.dataname);
      return false;
    }
    if((this.listItemBB.invalidpercent == null)) {
      this.saveChangesMsg = this.constants.error_invalid_blank;
      //console.log("returning str false for name, value is: " + this.listItemBB.dataname);
      return false;
    }
    /**
     * this one requirement is common to all data types except boolean
     * if usedistinctvals == true, then distinctvalues must be filled out
     */
    if(this.listItemBB.datatype != "boolean" && this.listItemBB.usedistinctvals == true) {
      if (this.listItemBB.distinctvalues < 1) {
        this.saveChangesMsg = this.constants.error_gen_distinct;
        //console.log("returning str false for distinct");
        return false;
      }
    }
    var issue = false;
    switch (this.listItemBB.datatype) {
      case "string": {
        /* string criteria
          EITHER (isfixedlength == false AND BOTH minlength and maxlength > 0) OR
            (isfixedlength == true AND fixedlength > 0 AND EITHER:
              usepattern == false OR (usepattern == true AND pattern.length == fixedlength))
        */
        if(this.listItemBB.isfixedlength == false) {
          if(this.listItemBB.minlength<1) {
            this.saveChangesMsg = this.constants.error_str_minval;
            //console.log("returning str false for min length");
            issue = true;
            break;
          } else if(this.listItemBB.maxlength<1) {
            this.saveChangesMsg = this.constants.error_str_maxval;
            //console.log("returning str false for max length");
            issue = true;
            break;
          }
        } else { // fixedlength == true here
            if(this.listItemBB.fixedlength<1) {
              this.saveChangesMsg = this.constants.error_str_fixedval;
              //console.log("returning str false for fixed length");
              issue = true;
              break;
            } else if(this.listItemBB.usepattern == true) { // if a pattern was specified
              if(this.listItemBB.pattern.length != this.listItemBB.fixedlength) {
                this.saveChangesMsg = this.constants.error_str_pattern;
                //console.log("returning str false for pattern");
                issue = true;
                break;
              }
            }
        }
        if(this.listItemBB.allowuppers == false &&
          this.listItemBB.allowlowers == false &&
            this.listItemBB.allowuppers == false &&
              this.listItemBB.allownumbers == false &&
                this.listItemBB.allowspecials == false &&
                  this.listItemBB.inclusions == '') {
                    this.saveChangesMsg = this.constants.error_str_box_or_inclusions;
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
        if(this.listItemBB.isranged == true) {
          if(this.listItemBB.basevaluestr == "undefined" || this.listItemBB.basevaluestr.length<1) {
            this.saveChangesMsg = this.constants.error_whole_baseval;
            issue = true;
            break;
          } else if(this.listItemBB.incrementstr == "undefined" || this.listItemBB.incrementstr.length<1) {
            this.saveChangesMsg = this.constants.error_whole_incr;
            issue = true;
            break;
          }
        } else {
          if(this.listItemBB.minvaluestr == "undefined" || this.listItemBB.minvaluestr.length<1) {
            this.saveChangesMsg = this.constants.error_whole_minval;
            issue = true;
            break;
          } else if(this.listItemBB.maxvaluestr == "undefined" || this.listItemBB.maxvaluestr.length<1) {
            this.saveChangesMsg = this.constants.error_whole_maxval;
            issue = true;
            break;
          } else if(this.listItemBB.minvalwhole>this.listItemBB.maxvalwhole) {
            this.saveChangesMsg = this.constants.error_whole_minmax;
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
        if((this.listItemBB.signdigits == null)) {
          this.saveChangesMsg = this.constants.error_signdigits;
          //console.log("nullpercent is messed up, value is: " + this.listItemBB.nullpercent);
          issue = true;
          break;
        }
        if(this.listItemBB.isranged == true) {
          if(this.listItemBB.basevaluestr == "undefined" || this.listItemBB.basevaluestr.length<1) {
            this.saveChangesMsg = this.constants.error_whole_baseval;
            issue = true;
            break;
          } else if(this.listItemBB.incrementstr == "undefined" || this.listItemBB.incrementstr.length<1) {
            this.saveChangesMsg = this.constants.error_whole_incr;
            issue = true;
            break;
          } else if(this.listItemBB.basevaluestr.endsWith(".")) {
            this.saveChangesMsg = this.constants.error_whole_baseval_dec;
            issue = true;
            break;
          } else if(this.listItemBB.incrementstr.endsWith(".")) {
            this.saveChangesMsg = this.constants.error_whole_incr_dec;
            issue = true;
            break;
          }
        } else {
            //console.log("minvaluestr is = " + this.listItemBB.minvaluestr);
            //console.log("maxvaluestr is = " + this.listItemBB.maxvaluestr);
            if(this.listItemBB.minvaluestr == "undefined" || this.listItemBB.minvaluestr.length<1) {
              //console.log("inside minval1");
              this.saveChangesMsg = this.constants.error_whole_minval;
              issue = true;
              break;
            } else if(this.listItemBB.maxvaluestr == "undefined" || this.listItemBB.maxvaluestr.length<1) {
              //console.log("inside maxval1");
              this.saveChangesMsg = this.constants.error_whole_maxval;
              issue = true;
              break;
            } else if(this.listItemBB.minvaluestr.endsWith(".")) {
              //console.log("inside minvaldecimal");
              this.saveChangesMsg = this.constants.error_whole_minval_dec;
              issue = true;
              break;
            } else if(this.listItemBB.maxvaluestr.endsWith(".")) {
              //console.log("inside maxvaldecimal");
              this.saveChangesMsg = this.constants.error_whole_maxval_dec;
              issue = true;
              break;
            } else if(this.listItemBB.minvalwhole>this.listItemBB.maxvalwhole) {
              //console.log("inside min < max");
              this.saveChangesMsg = this.constants.error_whole_minmax;
              issue = true;
              break;
            }
        }
        break;
      }
      case "datetime": {
        if(this.listItemBB.format == '') {
          this.saveChangesMsg = this.constants.error_datetime_format;
          issue = true;
          break;
        }
        if(this.listItemBB.isranged == true) {
          //console.log("base date/time = " + this.listItemBB.basedatetime);
          //console.log("base date/time length = " + this.listItemBB.basedatetime.length);
          if(this.listItemBB.basedatetime.length<10) {
            this.saveChangesMsg = this.constants.error_datetime_basecal;
            issue = true;
            break;
          }
          if(this.listItemBB.hasdate == true) {
            if((this.listItemBB.inc_yr_str == null)) {
              this.saveChangesMsg = this.constants.error_yrinc_blank;
              issue = true;
              break;
            }
            if((this.listItemBB.inc_mth_str == null)) {
              this.saveChangesMsg = this.constants.error_mthinc_blank;
              issue = true;
              break;
            }
            if((this.listItemBB.inc_day_str == null)) {
              this.saveChangesMsg = this.constants.error_dayinc_blank;
              issue = true;
              break;
            }
          }
          if(this.listItemBB.hastime == true) {
            if((this.listItemBB.inc_hrs_str == null)) {
              this.saveChangesMsg = this.constants.error_hrinc_blank;
              issue = true;
              break;
            }
            if((this.listItemBB.inc_min_str == null)) {
              this.saveChangesMsg = this.constants.error_mininc_blank;
              issue = true;
              break;
            }
            if((this.listItemBB.inc_sec_str == null)) {
              this.saveChangesMsg = this.constants.error_secinc_blank;
              issue = true;
              break;
            }
          }
        } else {
          if(this.listItemBB.startdatetime.length<10) {
            this.saveChangesMsg = this.constants.error_datetime_startcal;
            issue = true;
            break;
          }
          if(this.listItemBB.enddatetime.length<10) {
            this.saveChangesMsg = this.constants.error_datetime_endcal;
            issue = true;
            break;
          }
          let startdate = new Date(this.listItemBB.startdatetime);
          //console.log("start date string is = " + this.listItemBB.startdatetime);
          /*startdate.setDate(+this.listItemBB.startdatetime.substring(8,10));
          startdate.setMonth(+this.listItemBB.startdatetime.substring(5,7));
          startdate.setFullYear(+this.listItemBB.startdatetime.substring(0,4));*/
          let enddate = new Date(this.listItemBB.enddatetime);
          //console.log("end date string is = " + this.listItemBB.enddatetime);
          /*enddate.setDate(+this.listItemBB.enddatetime.substring(8,10));
          enddate.setMonth(+this.listItemBB.enddatetime.substring(5,7));
          enddate.setFullYear(+this.listItemBB.enddatetime.substring(0,4));*/
          console.log("startdate is = " + startdate + " , enddate is = " + enddate);
          //let diff = enddate. - startdate.getMilliseconds();
          let diff = enddate>startdate;
          console.log("enddate>startdate = " + diff);
          if(enddate<=startdate) {
            this.saveChangesMsg = this.constants.error_endbeforestart;
            issue = true;
            break;
          }
          break;
        }
      }
      case "boolean": {
        this.saveChangesMsg = "Save Changes";
        return true;
        break;
      }
      case "special": {
        this.saveChangesMsg = "Save Changes";
        return true;
        break;
      }
      case "default": {
        this.saveChangesMsg = "Save Changes";
        return true;
        break;
      }
    }
    if(issue == true) {
      return false;
    } else {
      this.saveChangesMsg = "Save Changes";
      return true;
    }
  }

  makeNumbersOnly(item: number) {
    var str;
    if(item==1) {
      str = this.listItemBB.minvaluestr;
    } else
    if(item==2) {
      str = this.listItemBB.maxvaluestr;
    } else
    if(item==3) {
      str = this.listItemBB.basevaluestr;
    } else
    if(item==4) {
      str = this.listItemBB.incrementstr;
    }
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
    if(this.listItemBB.datatype == "whole") {
      if(str.length==1) {
        answer = /[0-9-]/.test(first);
      } else {
        first_is_dash = /[-]/.test(first);
        first_is_num = /[0-9]/.test(first);
        the_rest_is_num = /^\d+$/.test(str.substring(1));
        answer = (first_is_dash || first_is_num) && the_rest_is_num;
      }
    } else {
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
    }
    if(answer == false) {
      if(item==1) {
        this.listItemBB.minvaluestr = this.listItemBB.minvaluestr.substring(0,this.listItemBB.minvaluestr.length-1);
        last = this.listItemBB.minvaluestr.substring(this.listItemBB.minvaluestr.length-1);
        if(last == ".") {
          do {
            this.listItemBB.minvaluestr = this.listItemBB.minvaluestr.substring(0,this.listItemBB.minvaluestr.length-1);
            last = this.listItemBB.minvaluestr.substring(this.listItemBB.minvaluestr.length-1);
          } while(last == ".")

        }
      } else if(item==2) {
        this.listItemBB.maxvaluestr = this.listItemBB.maxvaluestr.substring(0,this.listItemBB.maxvaluestr.length-1);
        last = this.listItemBB.maxvaluestr.substring(this.listItemBB.maxvaluestr.length-1);
        if(last == ".") {
          do {
            this.listItemBB.maxvaluestr = this.listItemBB.maxvaluestr.substring(0,this.listItemBB.maxvaluestr.length-1);
            last = this.listItemBB.maxvaluestr.substring(this.listItemBB.maxvaluestr.length-1);
          } while(last == ".")
        }
      } else if(item==3) {
        this.listItemBB.basevaluestr = this.listItemBB.basevaluestr.substring(0,this.listItemBB.basevaluestr.length-1);
        last = this.listItemBB.basevaluestr.substring(this.listItemBB.basevaluestr.length-1);
        if(last == ".") {
          do {
            this.listItemBB.basevaluestr = this.listItemBB.basevaluestr.substring(0,this.listItemBB.basevaluestr.length-1);
            last = this.listItemBB.basevaluestr.substring(this.listItemBB.basevaluestr.length-1);
          } while(last == ".")
        }
      } else if(item==4) {
        this.listItemBB.incrementstr = this.listItemBB.incrementstr.substring(0,this.listItemBB.incrementstr.length-1);
        last = this.listItemBB.incrementstr.substring(this.listItemBB.incrementstr.length-1);
        if(last == ".") {
          do {
            this.listItemBB.incrementstr = this.listItemBB.incrementstr.substring(0,this.listItemBB.incrementstr.length-1);
            last = this.listItemBB.incrementstr.substring(this.listItemBB.incrementstr.length-1);
          } while(last == ".")
        }
      }
    }
    if(this.listItemBB.datatype == "whole") {
      if(item==1) {
        if(this.listItemBB.minvaluestr != "-" && this.listItemBB.minvaluestr != '') {
          this.listItemBB.minvalwhole = parseInt(this.listItemBB.minvaluestr,10);
          //console.log("minvalwhole = " + this.listItemBB.minvalwhole);
        }
      } else if(item==2) {
        if(this.listItemBB.maxvaluestr != "-") {
          this.listItemBB.maxvalwhole = parseInt(this.listItemBB.maxvaluestr,10);
        }
      } else if(item==3) {
        if(this.listItemBB.basevaluestr != "-") {
          this.listItemBB.basevalue = parseInt(this.listItemBB.basevaluestr,10);
        }
      } else if(item==4) {
        if(this.listItemBB.incrementstr != "-") {
          this.listItemBB.increment = parseInt(this.listItemBB.incrementstr,10);
        }
      }
    } else if(this.listItemBB.datatype == "number" && last != ".") {
      if(item==1) {
        if(this.listItemBB.minvaluestr != "-" && this.listItemBB.minvaluestr != '') {
          this.listItemBB.minvaldecimal = parseFloat(this.listItemBB.minvaluestr);
          //console.log("minvalwhole = " + this.listItemBB.minvalwhole);
        }
      } else if(item==2) {
        if(this.listItemBB.maxvaluestr != "-") {
          this.listItemBB.maxvaldecimal = parseFloat(this.listItemBB.maxvaluestr);
        }
      } else if(item==3) {
        if(this.listItemBB.basevaluestr != "-") {
          this.listItemBB.basevaldecimal = parseFloat(this.listItemBB.basevaluestr);
        }
      } else if(item==4) {
        if(this.listItemBB.incrementstr != "-") {
          this.listItemBB.incrementdecimal = parseFloat(this.listItemBB.incrementstr);
        }
      }
    }
  }

  dateChangeAction(value: string) {
    if(value == "start") {
      //console.log("date was changed, date is = "  + this.listItemBB.startdatetime);
    }
    if(value == "end") {
      //console.log("date was changed, date is = "  + this.listItemBB.enddatetime);
    }
    if(value == "base") {
      //console.log("date was changed, date is = "  + this.listItemBB.basedatetime);
    }
  }

  editItem(i: number) {
    //console.log("editing item ....")
    this.saveChangesMsg = "Done";
    this.editMode = true;
    this.addMode = false;
    this.formMessage = 'Edit Field';
    this.copyToEditBB(i);
    this.editIndex = i;
    this.showForm = true;
    this.showListItemForm = true;
    this.datatypeselected = true;
	  if(this.listItemBB.datatype == "string") {
      this.fbb.turnOnString();
      this.fbb.hideStrFixedLgth = !this.listItemBB.isfixedlength;
      this.fbb.hideMinStrLgth = this.listItemBB.isfixedlength;
      this.fbb.hideMaxStrLgth = this.listItemBB.isfixedlength;
      this.fbb.hideDstnctFld = !this.listItemBB.usedistinctvals; // we always want the distinct Y/N button, but only display the field if it is currently Y
      if(this.listItemBB.usedistinctvals == true) {
        this.fbb.hideDstnctFld = false;
      }
      this.fbb.hidePatternYorN = !this.listItemBB.isfixedlength; // if the have currently specified a fixed length, then show the pattern Y/N button
      this.fbb.hideStrPtrnTxt = !this.listItemBB.usepattern; // and show the current pattern if they had opted for a pattern
    }
    else if(this.listItemBB.datatype == "whole") {
      this.fbb.turnOnWhole();
      this.fbb.hideDstnctFld = !this.listItemBB.usedistinctvals;
      if(this.listItemBB.usedistinctvals == true) {
        this.fbb.hideDstnctFld = false;
      }
      this.fbb.hideBaseVal = !this.listItemBB.isranged;
      this.fbb.hideIncrementVal = !this.listItemBB.isranged;
      this.fbb.hideMinWholeVal = this.listItemBB.isranged;
      this.fbb.hideMaxWholeVal = this.listItemBB.isranged;
    }
    else if(this.listItemBB.datatype == "number") {
      this.fbb.turnOnNumber();
      this.fbb.hideDstnctFld = !this.listItemBB.usedistinctvals;
      if(this.listItemBB.usedistinctvals == true) {
        this.fbb.hideDstnctFld = false;
      }
      this.fbb.hideBaseVal = !this.listItemBB.isranged;
      this.fbb.hideIncrementVal = !this.listItemBB.isranged;
      this.fbb.hideMinWholeVal = this.listItemBB.isranged;
      this.fbb.hideMaxWholeVal = this.listItemBB.isranged;
    }
    else if(this.listItemBB.datatype == "datetime") {
      this.fbb.turnOnDateTime(); // reset like a new data type, but....
      // on edit, certain button/fields depend on the current settings
      // format button depends on if hasdate == true
      this.fbb.hideFormat = this.listItemBB.hasdate == false;
      // start/ed dates require isranged == false, base date and increments require isranged = true
      this.fbb.hideStrtDte = this.listItemBB.isranged;
      this.fbb.hideEndDte = this.listItemBB.isranged;
      this.fbb.hideBaseDte = !this.listItemBB.isranged;
      this.fbb.hideAllIncrements = !this.listItemBB.isranged;
      if(this.listItemBB.isranged == true) {
        if(this.listItemBB.hasdate == true) {
          this.fbb.hideYrsInc = false;
          this.fbb.hideMthsInc = false;
          this.fbb.hideDaysInc = false;
        }
        if(this.listItemBB.hastime == true) {
          this.fbb.hideHrsInc = false;
          this.fbb.hideMinInc = false;
          this.fbb.hideSecInc = false;
        }
      }
      // distinct values field requires usedistinctvals == true
      if(this.listItemBB.usedistinctvals == true) {
        this.fbb.hideDstnctFld = false;
      }

    }
    else if(this.listItemBB.datatype == "boolean") {
      this.fbb.turnOnBoolean();
    }
    else if(this.listItemBB.datatype == "special") {
      this.fbb.turnOnSpecial();
    }
  }

  deleteItem(i: number) {
    //console.log("deleting item ...." + i);
    var j;
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
    this.arraySize = this.copyList.length;
    this.copyList = [];
    this.resetModes();
		//this.reload();
  }

  initiateAdd() {
    //console.log("initiating item add ....")
    this.editMode = false;
    this.addMode = true;
    this.showForm = true;
    this.addbtnhidden = true;
    this.formMessage = 'Add New Field';
  }
  setBadDataBooleans(input : ListItem) {
    if(input.nullpercent>0) input.canbenull = true;
    if(input.blankpercent>0) input.canbeblank = true;
    if(input.invalidpercent>0) input.canbeinvalid = true;
    return input;
  }
  resetModes() {
    //console.log("resetting modes ...");
    this.addMode = false;
    this.editMode = false;
    this.showForm = false;
    this.showListItemForm = false;
    this.datatypeselected = false;
    this.selectedValue = null;
    this.addbtnhidden = false;
  }
  saveResults(value: string) {
    //console.log("saving the results item ....")
    if(this.editMode) {
      //console.log("saving the edits ....")
      //console.log("selected value is : " + this.selectedValue)
      this.listItemBB = this.setBadDataBooleans(this.listItemBB);
      this.fieldsList[this.editIndex] = this.listItemBB;
      //this.resetModes();
      //this.saveChangesMsg = "Save changes";
    }
    else if(this.addMode) {
      if(value == "yes") {
        //console.log("saving record");
        this.listItemBB = this.setBadDataBooleans(this.listItemBB);
        this.fieldsList[this.arraySize] = this.listItemBB;
        this.arraySize = this.arraySize +1;
      }
    }
    this.clearOutFormBackingBean();
    this.resetModes();
    this.saveChangesMsg = "Save changes";
  }

  onSubmit(e) {
    //console.log(123);
    e.preventDefault();
  }

  onSelectedDataType(e) {
    //console.log("selected the data type ....")
    this.clearOutFormBackingBean();
    this.showListItemForm = true;
    this.datatypeselected = true;
    this.listItemBB.datatype = this.selectedValue
    if(this.selectedValue === "string") {
      //console.log("showing string form")
      // have to set the display booleans for the individual fields
      this.fbb.turnOnString();
      this.listItemBB.datatype = "string";
      this.usePattern('no');
    }
    else if(this.selectedValue === "whole") {
      //console.log("showing whole form")
      this.fbb.turnOnWhole();
      this.listItemBB.datatype = "whole";
    }
    else if(this.selectedValue === "number") {
      this.fbb.turnOnNumber();
      this.listItemBB.datatype = "number";
    }
    else if(this.selectedValue === "boolean") {
      this.fbb.turnOnBoolean();
      this.listItemBB.datatype = "boolean";
    }
    else if(this.selectedValue === "datetime") {
      this.fbb.turnOnDateTime();
      this.listItemBB.datatype = "datetime";
    }
    else if(this.selectedValue === "special") {
      this.fbb.turnOnSpecial();
      this.listItemBB.datatype = "special";
    }
    console.log("data type set is = " + this.listItemBB.datatype);
    //console.log("the button setting is = " + this.fbb.hideFormat);
  }

  makeAnInitialItem() {
    //console.log("making a dummy string type to add to array ...")
    this.listItemBB = {
      customerid: this.loginid,
      dataconfigname: this.dataconfigname,
      order: 0,
      dependency: -1,
      dataname: 'papyrus',
      datatype: "string",
      canbenull: true,
      canbeblank: true,
      canbeinvalid: true,
      nullpercent: 2,
      blankpercent: 1,
      invalidpercent: 3,
      isfixedlength: false,
      fixedlength: 1,
      minlength: 1,
      maxlength: 10,
      usedistinctvals: false,
      distinctvalues: 1,
      allowuppers: false,
      allowlowers: false,
      allownumbers: false,
      allowspecials: false,
      inclusions: '',
      exclusions: '',
      usepattern: false,
      pattern: '',
      minvaluestr: '',
      maxvaluestr: '',
      minvalwhole: 0,
      maxvalwhole: 0,
      isranged: false,
      basevaluestr: '',
      incrementstr: '',
      basevalue: 0,
      increment: 0,
      minvaldecimal: 0.0,
      maxvaldecimal: 0.0,
      basevaldecimal: 0.0,
      incrementdecimal: 0.0,
      signdigits: 2,
      hasdate: true,
      hastime: false,
      format: '',
      startdatetime: '',
      enddatetime: '',
      basedatetime: '',
      inc_yr_str: 0,
      inc_mth_str: 0,
      inc_day_str: 0,
      inc_hrs_str: 0,
      inc_min_str: 0,
      inc_sec_str: 0
    };
    //console.log("adding dummy")
    //console.log(this.listItemBB.dataname)
    this.fieldsList = [];
    this.fieldsList[0] = this.listItemBB;
    this.arraySize = this.arraySize + 1;
    this.clearOutFormBackingBean();
    //console.log("finished adding dummy")
  }
  clearOutFormBackingBean() {
    //console.log("clearing out the form bean")
    this.listItemBB = {
      customerid: this.loginid,
      dataconfigname: this.dataconfigname,
      order: 0,
      dependency: -1,
      dataname: '',
      datatype: "string",
      canbenull: false,
      canbeblank: false,
      canbeinvalid: false,
      nullpercent: 0,
      blankpercent: 0,
      invalidpercent: 0,
      isfixedlength: false,
      fixedlength: 1,
      minlength: this.config.stringOps.minlength,
      maxlength: this.config.stringOps.maxlength,
      usedistinctvals: false,
      distinctvalues: 1,
      allowuppers: false,
      allowlowers: false,
      allownumbers: false,
      allowspecials: false,
      inclusions: '',
      exclusions: '',
      usepattern: false,
      pattern: '',
      minvaluestr: '',
      maxvaluestr: '',
      minvalwhole: 0,
      maxvalwhole: 0,
      isranged: false,
      basevaluestr: '',
      incrementstr: '',
      basevalue: 0,
      increment: 0,
      minvaldecimal: 0.0,
      maxvaldecimal: 0.0,
      basevaldecimal: 0.0,
      incrementdecimal: 0.0,
      signdigits: 2,
      hasdate: true,
      hastime: false,
      format: '',
      startdatetime: '',
      enddatetime: '',
      basedatetime: '',
      inc_yr_str: 0,
      inc_mth_str: 0,
      inc_day_str: 0,
      inc_hrs_str: 0,
      inc_min_str: 0,
      inc_sec_str: 0
    };
    this.datetimeoptions = [
      {value: 'uuuu/MM/dd', viewValue: 'YYYY/MM/DD'},
      {value: 'uuuu-MM-dd', viewValue: 'YYYY-MM-DD'},
      {value: 'uuuuMMdd', viewValue: 'YYYYMMDD'},
      {value: 'MMM dd, uuuu', viewValue: 'MMM DD, YYYY'}
    ];
    //console.log("string customer id = " + this.listItemBB.customerid)
  }

  copyToEditBB(i: number) {
    this.listItemBB.customerid = this.fieldsList[i].customerid ;
    this.listItemBB.dataconfigname = this.fieldsList[i].dataconfigname ;
    this.listItemBB.order = this.fieldsList[i].order ;
    this.listItemBB.dataname = this.fieldsList[i].dataname ;
    this.listItemBB.datatype = this.fieldsList[i].datatype ;
    this.listItemBB.canbenull = this.fieldsList[i].canbenull ;
    this.listItemBB.canbeblank = this.fieldsList[i].canbeblank ;
    this.listItemBB.canbeinvalid = this.fieldsList[i].canbeinvalid ;
    this.listItemBB.nullpercent = this.fieldsList[i].nullpercent ;
    this.listItemBB.blankpercent = this.fieldsList[i].blankpercent ;
    this.listItemBB.invalidpercent = this.fieldsList[i].invalidpercent ;
    this.listItemBB.isfixedlength = this.fieldsList[i].isfixedlength ;
    this.listItemBB.usedistinctvals = this.fieldsList[i].usedistinctvals ;
    this.listItemBB.distinctvalues = this.fieldsList[i].distinctvalues ;
    this.listItemBB.fixedlength = this.fieldsList[i].fixedlength ;
    this.listItemBB.minlength = this.fieldsList[i].minlength ;
    this.listItemBB.maxlength = this.fieldsList[i].maxlength ;
    this.listItemBB.allowuppers = this.fieldsList[i].allowuppers ;
    this.listItemBB.allowlowers = this.fieldsList[i].allowlowers ;
    this.listItemBB.allownumbers = this.fieldsList[i].allownumbers ;
    this.listItemBB.allowspecials = this.fieldsList[i].allowspecials ;
    this.listItemBB.inclusions = this.fieldsList[i].inclusions ;
    this.listItemBB.exclusions = this.fieldsList[i].exclusions ;
    this.listItemBB.usepattern = this.fieldsList[i].usepattern ;
    this.listItemBB.pattern = this.fieldsList[i].pattern ;
    this.listItemBB.minvaluestr = this.fieldsList[i].minvaluestr ;
    this.listItemBB.maxvaluestr = this.fieldsList[i].maxvaluestr ;
    this.listItemBB.minvalwhole = this.fieldsList[i].minvalwhole ;
    this.listItemBB.minvaldecimal = this.fieldsList[i].minvaldecimal ;
    this.listItemBB.maxvaldecimal = this.fieldsList[i].maxvaldecimal ;
    this.listItemBB.basevaldecimal = this.fieldsList[i].basevaldecimal ;
    this.listItemBB.incrementdecimal = this.fieldsList[i].incrementdecimal ;
    this.listItemBB.maxvalwhole = this.fieldsList[i].maxvalwhole ;
    this.listItemBB.isranged = this.fieldsList[i].isranged ;
    this.listItemBB.basevaluestr = this.fieldsList[i].basevaluestr ;
    this.listItemBB.incrementstr = this.fieldsList[i].incrementstr ;
    this.listItemBB.basevalue = this.fieldsList[i].basevalue ;
    this.listItemBB.increment = this.fieldsList[i].increment ;
    this.listItemBB.signdigits = this.fieldsList[i].signdigits;
  }

  changeIncrements($event: Event) {
    /**
     * ??? cannot remember what this was for, but the page is referencing it
     */
  }

}
