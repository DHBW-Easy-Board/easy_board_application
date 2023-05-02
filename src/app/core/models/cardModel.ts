export interface CardModel {
  id: number,
  name: string,
  description: string,
  assigned_to: string,
  columns_id: number,
  //we let these dates be any so no frontend fuckery needed idc
  created_at: any,
  due_date: any,
  position: number,
}
