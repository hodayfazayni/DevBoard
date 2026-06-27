import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

interface ItemProps{
    title: string,
    completed: boolean,
    description: string,
    id: number
}

async function editStatus(id: number, completed: boolean){
    const session = await auth();
    const project = await prisma.project.findFirst({
        where: {
            id,
            userId: session?.user?.id
        }
    })
    if (!session?.user?.id) {
        return;
    }

    if(!project){
        return;
    }

    await prisma.project.update({
        where: {
            id,
        },
        data: {
            completed
        }
    })

    revalidatePath("/")
}

async function deleteProject(id: number){
    const session = await auth();
    const project = await prisma.project.findFirst({
    where: {
        id,
        userId:  session?.user?.id
    },
    });
    await prisma.project.delete({
        where: {
            id,
        }
    })
    revalidatePath("/")
}

export function ProjectItem({title, completed, description, id}: ItemProps){
    return(
        <div className="bg-sky-500 p-20 rounded-2xl relative">
            <h1 className="text-6xl text-center text-amber-50">{title}</h1>
            <p className="text-xl text-center text-amber-50">{description}</p>
            {completed ? 
            <form action={async () => {
                "use server";
                await editStatus(id, !completed)}
            }>
                <button type="submit" className="absolute bottom-3 left-2 bg-green-900 p-2 rounded-2xl  text-amber-50">complete</button>
            </form>
            : 
            <form action={async () => {
                "use server";
                await editStatus(id, !completed)}
            }>
                <button className="absolute bottom-3 left-2 bg-cyan-950 p-2 rounded-2xl  text-amber-50">uncomplete</button>
            </form>
            
            }
            <form action={async () => {
                    "use server";
                    await deleteProject(id);
                }}>
                <button type="submit" className="absolute bottom-3 left-30 p-2 rounded-2xl bg-red-950 text-amber-50">delete</button>
            </form>
        </div>
    )
}