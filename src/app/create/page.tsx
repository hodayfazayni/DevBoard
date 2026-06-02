"use client";

function handleSubmit(formData: FormData) {
    fetch("/api/projects", {
        method: "POST",
        body: formData,
    });
}

export default function Create(){
    return(
        <div className="create">
        <h1 className="text-3xl font-bold text-center text-cyan-900">Create a new project</h1>
        <form className="flex flex-col gap-4 mt-10" action={handleSubmit}>
            <input type="text" name="title" placeholder="Title" className="border border-cyan-300 bg-cyan-300  focus:outline-4 focus:outline-cyan-500 rounded-md p-4" />
            <textarea name="description" placeholder="Description" className="border border-cyan-300 bg-cyan-300 focus:outline-4 focus:outline-cyan-500 rounded-md p-4" rows={4}></textarea>
            <button type="submit" className="bg-sky-400 text-white rounded-md p-2 hover:bg-sky-500 hover:cursor-pointer">Create</button>
        </form>
        </div>
    )
}
