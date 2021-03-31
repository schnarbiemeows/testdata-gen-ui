export class FormFieldBooleans {
  // initial form message
  hideStringMsg: boolean = true;
  hideWholeMsg: boolean = true;
  hideNumberMsg: boolean = true;
  hideDateTimeMsg: boolean = true;
  hideBooleanMsg: boolean = true;
  hideSpecialMsg: boolean = true;
  // field name
  hideFieldName: boolean = false; // this should always display( = false)
  // % fields , should always display( = false)
  hideNullPct: boolean = false;
  hideBlankPct: boolean = false;
  hideInvalidPct: boolean = false;
  // discrete values - all have except boolean
  hideDstnctYorN: boolean = true; // asks if we want discrete values
  hideDstnctFld: boolean = true; // number of discrete fields
  // string fields
  hideStrFixedLengthYorN: boolean = true;
  hideStrFixedLgth: boolean = true;
  hideMinStrLgth: boolean = true; 
  hideMaxStrLgth: boolean = true; 
  hideStrChckbxs: boolean = true;
  hidePatternYorN: boolean = true;
  hideStrPtrnTxt: boolean = true;
  hideInclusions: boolean = true;
  hideExclusions: boolean = true;
  // whole number fields
  hideRangedValYorN: boolean = true;
  hideBaseVal: boolean = true;
  hideIncrementVal: boolean = true;
  hideMinWholeVal: boolean = true;
  hideMaxWholeVal: boolean = true;

  // decimal number fields
  hideMinDecVal: boolean = true;
  hideMaxDecVal: boolean = true;
  hideBaseDecimalVal: boolean = true;
  hideIncDecimalVal: boolean = true;
  hideSignDigits: boolean = true;
  // date/time fields
  hidedateOrTimeBtn: boolean = true;
  hideRangedDteYorN: boolean = true;
  hideFormat: boolean = true;
  hideStrtDte: boolean = true;
  hideEndDte: boolean = true;
  hideBaseDte: boolean = true;
  hideAllIncrements: boolean = true;
  hideYrsInc: boolean = true;
  hideMthsInc: boolean = true;
  hideDaysInc: boolean = true;
  hideHrsInc: boolean = true;
  hideMinInc: boolean = true;
  hideSecInc: boolean = true;

  // boolean fields

  // special fields

  hideAll() {
    this.hideStringMsg = true;
    this.hideWholeMsg = true;
    this.hideNumberMsg = true;
    this.hideDateTimeMsg = true;
    this.hideBooleanMsg = true;
    this.hideSpecialMsg = true;
    this.hideFieldName = true;
    this.hideNullPct = true;
    this.hideBlankPct = true;
    this.hideInvalidPct = true;
    this.hideDstnctYorN = true; 
    this.hideDstnctFld = true;
    // string
    this.hideStrFixedLengthYorN = true;
    this.hideStrFixedLgth = true;
    this.hideMinStrLgth = true;
    this.hideMaxStrLgth = true;
    this.hideStrChckbxs = true;
    this.hidePatternYorN = true;
    this.hideStrPtrnTxt = true;
    this.hideInclusions = true;
    this.hideExclusions = true;
    // whole
    this.hideRangedValYorN = true;
    this.hideBaseVal = true;
    this.hideIncrementVal = true;
    this.hideMinWholeVal = true;
    this.hideMaxWholeVal = true;
    // decimal
    this.hideMinDecVal = true;
    this.hideMaxDecVal = true;
    this.hideBaseDecimalVal = true;
    this.hideIncDecimalVal = true;
    this.hideSignDigits = true;
    // date/time
    this.hidedateOrTimeBtn = true;
    this.hideRangedDteYorN = true;
    this.hideFormat = true;
    this.hideStrtDte = true;
    this.hideEndDte = true;
    this.hideBaseDte = true;
    this.hideAllIncrements = true;
    this.hideYrsInc = true;
    this.hideMthsInc = true;
    this.hideDaysInc = true;
    this.hideHrsInc = true;
    this.hideMinInc = true;
    this.hideSecInc = true;
  }
  turnOnMains() {
    this.hideFieldName = false;
    this.hideNullPct = false;
    this.hideBlankPct = false;
    this.hideInvalidPct = false;
  }
  turnOnString() {
    this.hideAll();
    this.turnOnMains();
    this.hideStringMsg = false;
    this.hideDstnctYorN = false; 
    this.hideDstnctFld = true;
    this.hideMinStrLgth = false;  
    this.hideMaxStrLgth = false;
    this.hideStrFixedLengthYorN = false;
    this.hideStrFixedLgth = true;
    this.hideStrChckbxs = false;
    this.hideStrPtrnTxt = true;
    this.hideInclusions = false;
    this.hideExclusions = false;
  }

  turnOnWhole() {
    this.hideAll();
    this.turnOnMains();
    this.hideWholeMsg = false;
    this.hideRangedValYorN = false;
    this.hideBaseVal = true;
    this.hideIncrementVal = true;
    this.hideDstnctYorN = false; 
    this.hideDstnctFld = true;
    this.hideMinWholeVal = false;
    this.hideMaxWholeVal = false;
  }

  turnOnNumber() {
    this.hideAll();
    this.turnOnMains();
    this.hideDstnctYorN = false; 
    this.hideDstnctFld = true;
    this.hideNumberMsg = false;
    this.hideMinDecVal = false;
    this.hideMaxDecVal = false;
    this.hideRangedValYorN = false;
    this.hideBaseDecimalVal = true;
    this.hideIncDecimalVal = true;
    this.hideSignDigits = false;
  }

  turnOnDateTime() {
    this.hideAll();
    this.turnOnMains();
    this.hideDstnctYorN = false; // always show this button
    this.hideDstnctFld = true; // because inital setting is usedistinctvals = false
    this.hideDateTimeMsg = false;
    this.hidedateOrTimeBtn = false; // always show this button
    this.hideRangedDteYorN = false; // always show this button
    this.hideFormat = false; // because inital setting is hasdate = true, hastime = false
    this.hideStrtDte = false; // because inital setting is isranged = false
    this.hideEndDte = false;  // because inital setting is isranged = false
    this.hideBaseDte = true;  // because inital setting is isranged = false
    this.hideAllIncrements = true;  // because inital setting is isranged = false
    this.hideYrsInc = true; // because inital setting is isranged = false
    this.hideMthsInc = true; // because inital setting is isranged = false
    this.hideDaysInc = true; // because inital setting is isranged = false
    this.hideHrsInc = true; // because inital setting is isranged = false
    this.hideMinInc = true; // because inital setting is isranged = false
    this.hideSecInc = true; // because inital setting is isranged = false
  }

  turnOnBoolean() {
    this.hideAll();
    this.turnOnMains();
    this.hideBooleanMsg = false;
  }

  turnOnSpecial() {
    this.hideAll();
    this.turnOnMains();
    this.hideSpecialMsg = false;
    this.hideDstnctYorN = false; 
    this.hideDstnctFld = true;
  }

}