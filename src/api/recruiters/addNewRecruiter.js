import supabaseClient from "@/utils/supabase";

async function addNewRecruiter(token, _, recruiterData) {
    const supabase = supabaseClient(token);

    let query = supabase.from("recruiter").insert([recruiterData]).select();

    const { data, error } = await query;
    if (error) {
        console.log("Error creating recruiter:", error);
        return Promise.reject(error);
    } else {
        return data;
    }
}

export default addNewRecruiter;
