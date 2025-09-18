import supabaseClient from "@/utils/supabase";

async function getAllJobs(token, { location, compnay_id, searchQuery }) {
    const supabase = supabaseClient(token);

    // saved: saved_job(id) - will return the id of the record in the saved_job table,
    // which is not of much use. It's only use is that it lets you know whether there
    // exists a record in the saved_job table where the job_id of a job and user_id of
    // the currently logged in user exists or not, if yes return the id of the record
    // so every job will have { saved: [] } or {saved: [ {id: xx} ]}. (Ignore []).
    // -> We're going to use it to display the heart icon btn as active or disabled.

    // In SQL, you would have to join the two tables, but here supabase automatically
    // does it, you don't need to sepcify in the query.
    let query = supabase
        .from("job")
        .select("*, company: company(name, logo_url), saved: saved_job(id)");

    if (location) {
        query = query.eq("location", location);
    }

    if (compnay_id) {
        query = query.eq("company_id", compnay_id);
    }

    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching jobs:", error);
        return null;
    } else {
        return data;
    }
}

export default getAllJobs;
