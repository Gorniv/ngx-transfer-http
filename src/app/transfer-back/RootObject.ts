import { Datum } from './Datum';
export interface RootObject {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Datum[];
}
