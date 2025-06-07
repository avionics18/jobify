import supabaseClient, { supabaseUrl } from "@/utils/supabase";

async function addNewCompany(token, _, companyData) {
    const supabase = supabaseClient(token);

    try {
        // logo upload logic
        const random = Math.floor(Math.random() * 9000);
        const fileName = `logo-${random}-${companyData.name}`;

        const { error: storageError } = await supabase.storage
            .from("company-logo")
            .upload(fileName, companyData.logo);

        if (storageError) {
            console.error("Error uploading company logo:", storageError);
            throw new Error("Error uploading company logo.");
        } else {
            // if company logo upload was successfull
            const logoURL = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;
            let query = supabase
                .from("company")
                .insert([
                    {
                        name: companyData.name,
                        logo_url: logoURL,
                        website: companyData.website,
                    },
                ])
                .select();

            const { data, error: compCreationEroor } = await query;
            if (compCreationEroor) {
                console.error("Error creating company:", compCreationEroor);
                throw new Error("Error creating company");
            } else {
                return data;
            }
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default addNewCompany;
