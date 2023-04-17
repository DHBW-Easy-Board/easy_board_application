export interface cardModel {
  card_id: number,
  card_name: string,
  card_description: string,
  card_assigned_to: string,
  columns_id: number,
  card_due_date: Date | null,
  position: number
}
