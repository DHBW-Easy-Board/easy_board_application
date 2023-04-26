import { Router } from "@angular/router";
import { supabase } from "src/env/supabase";

export async function signOut(router: Router) {
    await supabase.auth.signOut()
        .then((response) => {
            if (response.error === null) {
                router.navigate(['']);
            } else {
                console.log(response);
            }
        });
}
