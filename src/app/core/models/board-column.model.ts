export interface BoardColumn{
  board_id: number,
  column_id: number,
  column_name: string,
  max_cards_per_column: number | null,
  act_cards_per_column: number,
  //has Limit = 0 if no Limit maxCardsPerColumn = null, = 1 if maxCardsPerColumn != null
  has_limit: number,
}
