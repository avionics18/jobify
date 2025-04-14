import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECTURL;
const supabaseKey = import.meta.env.VITE_SUPABASE_APIKEY;

const supabaseClient = async (supabaseAccessToken) => {
    const supabase = createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: {
                Authorization: `Bearer ${supabaseAccessToken}`,
            },
        },
    });

    return supabase;
};

export default supabaseClient;
