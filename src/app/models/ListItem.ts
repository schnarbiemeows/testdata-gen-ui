export class ListItem {
  customerid: number;
  dataconfigname: string;
  order: number;
  dependency: number;
  dataname: string;
  datatype: string;
  canbenull: boolean;
  canbeblank: boolean;
  canbeinvalid: boolean;
  nullpercent: number;
  blankpercent: number;
  invalidpercent: number;
  isfixedlength: boolean;
  usedistinctvals: boolean;
  distinctvalues: number;
  // String variables
  fixedlength: number;
  minlength: number;
  maxlength: number;
  allowuppers: boolean;
  allowlowers: boolean;
  allownumbers: boolean;
  allowspecials: boolean;
  inclusions: string;
  exclusions: string;
  usepattern: boolean;
  pattern: string;
  // wholenumber variables
  minvaluestr: string;
  maxvaluestr: string;
  minvalwhole: number;
  maxvalwhole: number;
  isranged: boolean;
  basevaluestr: string;
  incrementstr: string;
  basevalue: number;
  increment: number;
  // decimal # variables
  minvaldecimal: number;
  maxvaldecimal: number;
  basevaldecimal: number;
  incrementdecimal: number;
  signdigits: number;
  // date/time variables
  hasdate: boolean;
  hastime: boolean;
  format: string;
  startdatetime: string;
  enddatetime: string;
  basedatetime: string;
  basetimetime: string;
  inc_yr_str: number;
  inc_mth_str: number;
  inc_day_str: number;
  inc_hrs_str: number;
  inc_min_str: number;
  inc_sec_str: number;

}