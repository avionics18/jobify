import supabaseClient from "@/utils/supabase";

async function getAllCompanies(token) {
    const supabase = supabaseClient(token);

    let query = supabase.from("company").select("*");

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching companies:", error);
        return null;
    } else {
        return data;
    }
}

export default getAllCompanies;
