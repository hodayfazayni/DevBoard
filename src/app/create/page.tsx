"use client";

export default function create(){
    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const response = await fetch('http://localhost:3000/api/projects', 
            {
                method : "POST",
                body : JSON.stringify({
                title: formData.get('title'),
                description: formData.get('description'),
                }),
                headers: { 'Content-Type': 'application/json' },
            }
        )
        if(response.ok){
            alert('project created')
            e.currentTarget.reset();
        }else{
            alert('something went wrong')
        }
    }

    return(
        <div className="formContainer">
            <form onSubmit={handleCreate}>
                    <input type="text" id="title" placeholder="title" name="title"/>
                    <textarea name="description" id="description" placeholder="description"></textarea>
                    <button type="submit">submit</button>
            </form> 
        </div>
    )
}