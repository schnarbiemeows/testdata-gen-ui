import { ListItem } from './ListItem';

export class UserConfig {
   numrecords: number;
   numfiles: number;
   filename: string;
   format: string;
   header: boolean;
   footer: boolean;
   fields: ListItem[]
}