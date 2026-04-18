import { NextResponse } from 'next/server';

import { projects } from '@/lib/projects';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }   
) {
  const { id } = await params;    

  const project = projects.find(p => p.id === id);

  if (!project) {
    return NextResponse.json({ error: " not found " }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const index = projects.findIndex(p => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  projects[index] = { ...projects[index], ...body };
  return NextResponse.json(projects[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const index = projects.findIndex(p => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: " not found " }, { status: 404 });
  }

  projects.splice(index, 1);
  return NextResponse.json({ message: " project deleted " });
}
