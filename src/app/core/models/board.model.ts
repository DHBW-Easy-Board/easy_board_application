export interface Board {
    board_id: number;
    board_name: string;
    board_description: string;
    owner_id: string;
    board_created_at: Date;
    board_modify_ts: Date;
}

export interface BoardWithImage extends Board {
    imageData?: string | null;
}