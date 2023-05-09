import { supabase } from "src/env/supabase";

export interface Role {
  id: number,
  name: string,
  description: string
}

/**
 * Currently existing user roles.
 */
export enum Roles {
    Owner = 'Owner',
    Collaborator = 'Collaborator',
    Watcher = 'Watcher',
}

/**
 * Get a user's board role.
 * 
 * @param boardId Specified board id
 * @returns Role of the authenticated user
 */
export async function getRole(boardId: number|undefined): Promise<Roles> {
    const user = await supabase.auth.getUser();

    if (user.error)
        throw user.error;

    const role = await supabase.from('user_board_role_ov_vw')
        .select('role_name')
        .eq('board_id', boardId)
        .eq('user_id', user.data.user.id);

    if (role.error) {
        console.log(role.error);
        throw role.error;
    }

    const roleName = role.data[0].role_name;

    switch (roleName) {
        case Roles.Owner:
            return Roles.Owner;
        case Roles.Collaborator:
            return Roles.Collaborator;
        default:
            return Roles.Watcher;
    }
}
