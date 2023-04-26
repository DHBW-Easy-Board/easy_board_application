export interface Card {
    card_id: number;
    card_name: string;
    card_description: string;
    card_assigned_to: string;
    card_assignee_user_name: string;
    card_due_date: Date;
    position: number;
    board_id: number;
    columns_id: number;
    card_created_at: Date;
}
