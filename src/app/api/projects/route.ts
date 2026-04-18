import { NextResponse } from "next/server";

let projects = [{
    id: "1",
    title: " TO-DO app ",
    description: "A to-do app that lets yout create, delete, update or read a task with full controle",
    status: "completed",
    date: "2026-03-20"
  }
];

export async function GET() {
    return NextResponse.json(projects);
}

export async function POST(request:Request) {
    const body = await request.json();

    const newProject = {
        id: Date.now().toString(),
        title: body.title,
        description: body.description || "",
        status: "active",
        date: new Date().toISOString().split("T")[0]
    };

    projects.push(newProject);

    return NextResponse.json(newProject, { status: 201 });
};


