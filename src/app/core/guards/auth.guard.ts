import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { supabase } from "src/env/supabase";

export const authGuard = () => {
    const router = inject(Router);

    supabase.auth.getUser()
        .then((response) => {
            if (response.data.user?.role === 'authenticated')
                return true;

            return router.navigate(['']);
        });
}