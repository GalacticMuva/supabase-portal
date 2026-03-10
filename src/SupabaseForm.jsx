import {useForm} from 'react-hook-form'
import {supabase} from './supabaseClient'
import './App.css'


function SupabaseForm() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { error } = await supabase
            .from('portal_entries')
            .insert([data]);

        if (error) {
            console.error("Error inserting data:", error);
            alert("Failed to submit form. Please try again.");
        } else {
            console.log("Form submitted successfully!");
            reset();
        }
    };


    return (

        <div className="form-container">
            <h2>Supabase Character Portal</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="portal-form">

    {/* 1. Project Name */}
                <div className="form-group">
                    <label>Project Name</label>
                    <input {...register("projectName", { required: "Required", minLength: 5 })} />
                    {errors.projectName && <span className="error">Min 5 chars required</span>}
                </div>

    {/* 2. Developer Email */}
                <div className="form-group">
                    <label>Developer Email</label>
                    <input type="email" {...register("developerEmail", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                    })} />
                    {errors.developerEmail && <span className="error">{errors.developerEmail.message}</span>}
                </div>

    {/* 3. Priority Level */}
                <div className="form-group">
                    <label>Priority Level</label>
                    <select {...register("priorityLevel")}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

    {/* 4. Deployment Date */}
                <div className="form-group">
                    <label>Deployment Date</label>
                    <input type="date" {...register("deploymentDate", { required: true })} />
                    {errors.deploymentDate && <span className="error">{errors.deploymentDate.message}</span>}
                </div>

    {/* 5. Version Number */}
                <div className="form-group">
                    <label>Version Number</label>
                    <input type="number" step="0.1" {...register("versionNumber", { 
                        required: "Required",
                        min: { value: 0.1, message: "Must be > 0" } })} />
                    {errors.versionNumber && <span className="error">{errors.versionNumber.message}</span>}
                </div>

    {/* 6. Is Public (Checkbox) */}
                <div className="form-group">
                    <label>Public Project?</label>
                    <input type="checkbox" {...register("isPublic")} />
                </div>

    {/* 7. Repository URL */}
                <div className="form-group">
                    <label>Repository URL</label>
                    <input type="url" {...register("repositoryUrl", { 
                        required: "Required",
                        pattern: { value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, message: "Invalid URL format" }
                    })} />
                    {errors.repositoryUrl && <span className="error">{errors.repositoryUrl.message}</span>}
                </div>


    {/* 8. Team Lead */}
                <div className="form-group">
                    <label>Team Lead</label>
                    <input {...register("teamLead", { required: true })} />
                    {errors.teamLead && <span className="error">{errors.teamLead.message}</span>}
                </div>

    {/* 9. Budget Code (Max 8 chars) */}
                <div className="form-group">
                    <label>Budget Code</label>
                    <input {...register("budgetCode", { maxLength: 8 })} />
                    {errors.budgetCode && <span className="error">{errors.budgetCode.message}</span>}
                </div>

    {/* 10. Description (Textarea) */}
                <div className="form-group full-width">
                    <label>Description</label>
                    <textarea {...register("description", { maxLength: 200 })} rows="3"></textarea>
                    {errors.description && <span className="error">{errors.description.message}</span>}
                </div>

                <button type="submit">Submit to Supabase</button>
            </form>
        </div>
    );

}

export default SupabaseForm
