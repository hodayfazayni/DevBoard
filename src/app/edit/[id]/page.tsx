export const dynamic = "force-dynamic";


async function handleSubmit(id: string, formData: FormData) {

    "use server";
    await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "PUT",
        body: formData,
    });
}

export default async function EditProject({ params }: { params: { id: string } }) {
    const { id } = await params;
    
    const boundHandleSubmit = handleSubmit.bind(null, id);

    return (
        <div className="editproject">
            <h1 className="text-3xl font-bold text-center text-cyan-900">Edit project</h1>
            
            <form className="flex flex-col gap-4 mt-10" action={boundHandleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    className="border border-cyan-300 bg-cyan-300 focus:outline-4 focus:outline-cyan-500 rounded-md p-4" 
                />
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    className="border border-cyan-300 bg-cyan-300 focus:outline-4 focus:outline-cyan-500 rounded-md p-4" 
                    rows={4}
                ></textarea>
                <select 
                    name="status" 
                    className="border border-cyan-300 bg-cyan-300 focus:outline-4 focus:outline-cyan-500 rounded-md p-4"
                >
                    <option value="in progress">in progress</option>
                    <option value="done">done</option>
                </select>
                <button 
                    type="submit" 
                    className="bg-sky-400 text-white rounded-md p-2 hover:bg-sky-500 hover:cursor-pointer"
                >
                    Update
                </button>
            </form>
        </div>
    );
}