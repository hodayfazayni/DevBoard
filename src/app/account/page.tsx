import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth";

export default async function Account(){
    const session = await auth();
    if(!session){
        return(
            <div>
                <form className="flex justify-center items-center h-screen"
                    action={async () => {
                        "use server";
                        await signIn("google");
                        redirect("/")
                    }}
                >
                    <button type="submit" className="text-xl bg-sky-500 text-amber-50 p-4 rounded-xl hover:cursor-pointer">
                        Login with Google
                    </button>
                </form>
            </div>
        )
    }

    return(
        <div>
            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <button type="submit" className="text-xl bg-sky-500 text-amber-50 p-4 rounded-xl hover:cursor-pointer">sign out</button>
            </form>
        </div>
    )
}