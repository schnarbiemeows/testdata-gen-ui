export class FormFieldBooleans {
  // initial form message
  // string fields
  showStringFieldForm:boolean = false;
  hideStrFixedLgth: boolean = true;
  hideMinAndMaxStrLgth: boolean = true;
  hideStrChckbxs: boolean = true;
  hideInclusions: boolean = true;
  hideExclusions: boolean = true;
  // whole number fields
  showWholeNumberFieldForm:boolean = false;
  hideBaseAndIncrVal: boolean = true;
  hideMinAndMaxWholeVal: boolean = true;
  // decimal number fields
  showDecimalNumberFieldForm:boolean = false;
  hideMinAndMaxDecVal: boolean = true;
  hideBaseAndIncDecimalVal: boolean = true;
  hideSignDigits: boolean = true;
  // date/time fields
  showDateTimeFieldForm:boolean = false;
  hideStrtAndEndDte: boolean = true;
  hideBaseDte: boolean = true;
  hideDateIncrements: boolean = true;
  hideTimeIncrements: boolean = true;
  // boolean fields
  showBooleanFieldForm:boolean = false;
  // special fields
  showSpecialFieldsForm:boolean = false;

  hideAll() {
    this.showStringFieldForm = false;
    this.showWholeNumberFieldForm = false;
    this.showDecimalNumberFieldForm = false;
    this.showDateTimeFieldForm = false;
    this.showBooleanFieldForm = false;
    this.showSpecialFieldsForm = false;
  }

  turnOnString() {
    this.hideAll();
    this.showStringFieldForm = true;
    this.hideMinAndMaxStrLgth = false;
    this.hideStrFixedLgth = true;
    this.hideStrChckbxs = false;
    this.hideInclusions = false;
    this.hideExclusions = false;
  }

  turnOnWhole() {
    this.hideAll();
    this.showWholeNumberFieldForm = true;
    this.hideBaseAndIncrVal = true;
    this.hideMinAndMaxWholeVal = false;
  }

  turnOnNumber() {
    this.hideAll();
    this.showDecimalNumberFieldForm = true;
    this.hideMinAndMaxDecVal = false;
    this.hideBaseAndIncDecimalVal = true;
    this.hideSignDigits = false;
  }

  turnOnIncrementing() {
    this.hideMinAndMaxDecVal = true;
    this.hideBaseAndIncDecimalVal = false;
  }
  turnOnDateTime() {
    this.hideAll();
    this.showDateTimeFieldForm = true;
    this.hideStrtAndEndDte = false; // because inital setting is isranged = false
    this.hideBaseDte = true;  // because inital setting is isranged = false
    this.hideDateIncrements = true;
    this.hideTimeIncrements = true;
  }

  turnOnBoolean() {
    this.hideAll();
    this.showBooleanFieldForm = true;
  }

  turnOnSpecial() {
    this.hideAll();
    this.showSpecialFieldsForm = true;
  }

}
