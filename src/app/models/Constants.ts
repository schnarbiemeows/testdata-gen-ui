export class Constants {

  // constants
  minLength:number = 1;
  maxLength:number = 256;
  // messages
  left_msg1: string = "Welcome to my Test Data Generator Program!";
  left_msg2: string = "You can have up to ";
  left_msg3: string = " records made in a range of data formats!";
  left_msg3b: string = "It's Easy! Simply ..."
  left_msg4: string = "1.) Select how many records you want made to the right, \n";
  left_msg5: string = "2.) then select the Data Format to the right\n";
  left_msg5_2: string = "3.) specify your file name\n";
  left_msg6: string = "4.) finally, define each of your data fields\n";
  left_msg7: string = "* for help, hover over each field for a better description";
  left_msg8: string = "* the green button can help you fill out each field";
  middle_str_msg1: string = "you can use strings to make all kinds of data using a pattern";
  middle_str_msg2: string = "symbols are: A = Any, L = lowercase, U = uppercase, N = number, S = special";
  middle_str_chkbx: string = "check which symbols below you would like to use(at least one):";

  middle_whole_msg1: string = "you can use whole numbers to make numerical data";
  //middle_whole_msg2: string = "L = lowercase, U = uppercase, N = number, S = special";

  middle_dec_msg1: string = "you can use decimal to represent things like money";
  //middle_dec_msg2: string = "L = lowercase, U = uppercase, N = number, S = special";

  middle_date_msg1: string = "you can use date/times to add dates to your data";
  middle_date_msg2: string = "these dates could include time information as well";

  middle_bool_msg1: string = "booleans are simple types that have 2 values only: true or false";
  //middle_bool_msg2: string = "L = lowercase, U = uppercase, N = number, S = special";

  middle_spec_msg1: string = "these are some special pre-configured types that you can use";
  //middle_spec_msg2: string = "L = lowercase, U = uppercase, N = number, S = special";

  middle_datetime_incr_msg1: string = "Increments";
  middle_datetime_incr_msg2: string = "- ";
  right_msg1: string = "Checkout";
  right_msg2: string = "If all of your stuff looks good, click the button below, and we'll get your data right to you!";
  right_msg3: string = "more features coming soon!";
  right_msg4: string = "Like this program? Checkout my GitHub!";

  tooltip_numrecords: string = "You can have up to 1000 records for free!";
  tooltip_recordtype: string = "How do you want this data formatted(JSON, CSV, etc..)?";
  tooltip_filename: string = "name of your data file, letters ONLY, please. NOTE: this filename will always be appended with a timestamp.";
  tooltip_header: string = "Do you want the first line in the file to be a header? \nThe header will contain a delimited list of the field names,\nor in the case of JSON, will look like : { \"fieldnames\" : [ field1 , field2, ... ] }";
  tooltip_footer: string = "Do you want a footer at the bottom of this file?\nThe footer will simply be: record count = X, or , if JSON,\nwill be: { \"count\" : X }";
  tooltip_name: string = "field name should be at least 2 characters. Also, be carefull if this this data \nis supposed to go into a database, as there may be specific requirements \nregarding the naming conventions!";
  tooltip_datatype: string = "the type of data that you want this field to \nrepresent";
  tooltip_null: string = "this is the percentage(from 0% to 100%) \nof records that will have NULL for this field. \nNOTE: The Null,Blank, and Invalid fields \ncan not add up to more than 100%";
  tooltip_blank: string = "this is the percentage(from 0% to 100%) \nof records that will have no value for this field. \nNOTE: The Null,Blank, and Invalid fields \ncan not add up to more than 100%";
  tooltip_invalid: string = "this is the percentage(from 0% to 100%) \nof records that will have characters in this field \nOTHER than the ones that you specify. \nNOTE: The Null,Blank, and Invalid \nfields can not add up to more than 100%";
  tooltip_fixedlength: string = "do you want this field to always have the same length? \nNOTE: this option is required in order to use patterns";
  tooltip_ranged: string = "do you want this field to have an incrementing value?\nfor example: if you chose this option, then base value and increment\nfields will appear below. The base value is the value that\nrecord 1 will have. record 2 will have a value of:\n<base value> + <increment>\nrecord 3 will have a value of:\n<base value> + 2*<increment>\nand so on...";
  tooltip_base_val: string = "see the ranged tooltip above. This will be\nthe value that the first record will have for this field.";
  tooltip_increment: string = "see the ranged tooltip above. This will be\nthe amount by which each record after the first \nrecord will increment.";
  tooltip_signdigits: string = "how many decimal places do you want these numbers rounded off to?";
  tooltip_minlength: string = "what is the minimum length that you want this field to have? \nNOTE: if you want the possibility of this field having NO value, \nchose a percentage for the \"Blank %\" field on the left.";
  tooltip_minval: string = "what is the minimum value that you want this field to have? \nNOTE: if you want the possibility of this field having NO value, \nchose a percentage for the \"Blank %\" field on the left.";
  tooltip_maxlength: string = "what is the minimum length that you want this field to have? \nThere is a hard-coded maximum of 256 currently.";
  tooltip_maxval: string = "what is the minimum value that you want this field to have?";
  tooltip_lowercase_bx: string = "if you want uppercase letters as \npossible characters in this field. \n characters are: \n\"abcdefghijklmnopqrstuvwxyz\" \n NOTE: if you want to exclude certain characters from this list, \nadd them to the \"characters to exclude\" option below." ;
  tooltip_uppercase_bx: string = "if you want lowercase letters as \npossible characters in this field. \ncharacters are: \n\"ABCDEFGHIJKLMNOPQRSTUVWXYZ\" \nNOTE: if you want to exclude certain characters from this list, \nadd them to the \"characters to exclude\" option below.";
  tooltip_numbers_bx: string = "if you want numbers as \npossible characters in this field. \ncharacters are: \n\"0123456789\" \nNOTE: if you want to exclude certain characters from this list, \nadd them to the \"characters to exclude\" option below.";
  tooltip_specials_bx: string = "if you want special characters as \npossible characters in this field. \ncharacters are: \n\"!@#$%^&*()-_+=[]{}|,.<>/?;:~`\" \nNOTE: if you want to exclude certain characters \nfrom this list, \nadd them to the \"characters to exclude\" option below.";
  tooltip_distinct: string = "do you want this field to have a limited number \nof possible values? For example, if you chose \n1000 records and 2 for the total, then, on avergage, \n500 records will have one value and 500 will have another. \nIf you chose 1, then they will all have the same value!";
  tooltip_total_distinct: string = "the total number of possible values for this field";
  tooltip_usepattern: string = "Allows you to specify a specific pattern for the field.\n\nUse the letters: A,L,U,N, and S to specify: \n(A)ANY character, (L)Lowercase letter, (U)Uppercase letter, \n(N)Number, and (S)Special characters for that specific character slot. \n\nAlso, use specific characters if you want that character slot \nto always have that exact value. \n\nIf you need to use A,U,L,N, or S, prepend the letter with a \\ \n\nExamples: \n\n\"LL-000NN\" - will give values like: ab-00012, un-00034, or xy-00077 \n\"A\\NS\" - will give values like: xN%, IN-, or PN(\n\"fffUUU777\" - will give values like: fffNIS777, fffABC777, and fffXYZ777";
  tooltip_pattern: string = "specify a specific pattern for the field. \nUse the letters: A,L,U,N, and S to specify \nall characters, lowercase letters, \nuppercase letters, numbers, and special characters \nfor that specific character slot. \n\nAlso, use specific characters if you want \nthat character slot to always have the value. \nIf you need to use A,U,L,N, or S, prepend \nthe letter with a \\ \nExamples: \nUU-000NN - will give values like: AB-00012,UN-00034, or XY-00077 \nA\\NS - will give values like: xN%,IN-, or PN(";
  tooltip_inclusions: string = "list specific characters that you want to INCLUDE \nin addition to any options checked above. \nFor example: say you checked the numbers box above, \nand in this field you put the letter \"A\". \nThen this field will contain any of the \nfollowing characters: A0123456789";
  tooltip_exclusions: string = "list specific characters that you want \nto EXCLUDE \nin addition to any options checked above. \nFor example: say you checked the numbers box above, \nand in this field you put the number \"7\". \nThen this field will contain any of the \nfollowing characters: 012345689";
  tooltip_date_time_selector: string = "do you want this field to display dates, times, or both dates and times?";
  tooltip_ranged_dte: string = "do you want your date and/or time field to have an incrementing value?\nif you chose this option, then base date and increment\nfields will appear below. The base date is the value that\nrecord 1 will have. the subsequent records will be incremented\nby the sum of all of the increments that you chose.\n\nFor example: if you chose a format of YYYY/MM/DD, a base date of 2013/01/01\nchose the month increment =1 and set all other increments to 0, \nthe first record will have a value of \"2013/01/01\"\nthe second record will have a value of \"2013/02/01\"\nthe third record will have a value of \"2013/03/01\"\nand so on....";
  tooltip_startdte: string = "what is the earliest date that a record could have?\nformat is in \"mm/dd/yyyy\"\nNOTE: this will NOT be the final format of your data:\nwhatever you specified in the format field will be the final format";
  tooltip_enddte: string = "what is the latest date that a record could have?\nformat is in \"mm/dd/yyyy\"\nNOTE: this will NOT be the final format of your data:\nwhatever you specified in the format field will be the final format";
  tooltip_basedte: string = "what is the date that record 1 will have?\nformat is in \"mm/dd/yyyy\"\nNOTE: this will NOT be the final format of your data:\nwhatever you specified in the format field will be the final format.\nAlso NOTE: the timestamp on record 1 will be midnight.";
  tooltip_yr_inc: string = "how many years do you want to increment each record by?";
  tooltip_mnth_inc: string = "how many months do you want to increment each record by?";
  tooltip_day_inc: string = "how many days do you want to increment each record by?";
  tooltip_hr_inc: string = "how many hours do you want to increment each record by?";
  tooltip_min_inc: string = "how many minutes do you want to increment each record by?";
  tooltip_sec_inc: string = "how many seconds do you want to increment each record by?";
  error_gen_name: string = "field name needs to be filled out.";
  error_null_blank: string = "Null % cannot be blank.";
  error_blank_blank: string = "Blank % cannot be blank.";
  error_invalid_blank: string = "Invalid % cannot be blank.";
  error_signdigits: string = "Significant Digits cannot be blank.";
  error_gen_distinct: string = "number of distinct values needs to be > 0.";
  error_str_minval: string = "minimum length needs to be > 0.";
  error_str_maxval: string = "maximum length needs to be > 0.";
  error_str_fixedval: string = "fixed length needs to be > 0.";
  error_str_pattern: string = "the length of the pattern that you specified does not match the fixed length.";
  error_str_box_or_inclusions: string = "please either check at least one sybmol type above or specify some inclusions.";
  error_whole_baseval: string = "base value needs to be specified.";
  error_whole_incr: string = "increment value needs to be specified.";
  error_whole_minval: string = "minimum value needs to be specified.";
  error_whole_maxval: string = "maximum value needs to be specified.";
  error_whole_baseval_dec: string = "base value cannot end in a decimal point.";
  error_whole_incr_dec: string = "increment value cannot end in a decimal point.";
  error_whole_minval_dec: string = "minimum value cannot end in a decimal point.";
  error_whole_maxval_dec: string = "maximum value cannot end in a decimal point.";
  error_whole_minmax: string = "minimum value needs to be <= maximum value.";
  error_datetime_basecal: string = "Base Date needs to have a valid value.";
  error_datetime_startcal: string = "Start Date needs to have a valid value.";
  error_datetime_endcal: string = "End Date needs to have a valid value.";
  error_endbeforestart: string = "End Date cannot come before the Start Date.";
  error_datetime_format: string = "Format needs to be selected.";
  error_yrinc_blank: string = "year increment cannot be blank.";
  error_mthinc_blank: string = "month increment cannot be blank.";
  error_dayinc_blank: string = "day increment cannot be blank.";
  error_hrinc_blank: string = "hour increment cannot be blank.";
  error_mininc_blank: string = "minute increment cannot be blank.";
  error_secinc_blank: string = "second increment cannot be blank.";
  // final button errors
  error_filename: string = "no filename specified";
  error_data: string = "no data to process!";
  error_mode: string = "finish specifying data";
}
