import supabaseClient from "@/utils/supabase";

async function toggleSavedJob(token, { isJobSavedAlready }, saveData) {
    const supabase = supabaseClient(token);

    if (isJobSavedAlready) {
        // if job is already saved, then remove the job
        // from saved_job table
        let query = supabase
            .from("saved_job")
            .delete()
            .eq("job_id", saveData.job_id);
        const { data, error: delError } = await query;

        if (delError) {
            console.log("Error deleting job from saved_job:", delError);
            return null;
        } else {
            return data;
        }
    } else {
        // if job is not saved, then save it to saved_job table
        // and also return the job in response
        let query = supabase.from("saved_job").insert([saveData]).select();
        const { data, error: insertError } = await query;
        if (insertError) {
            console.log("Error saving job into saved_job:", insertError);
            return null;
        } else {
            return data;
        }
    }
}

export default toggleSavedJob;
