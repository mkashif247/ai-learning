import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const parsed = registerSchema.parse(body);

    const exists = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (exists) {
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(parsed.password, 10);
    const user = await prisma.user.create({
      data: {
        email: parsed.email,
        password: hashedPassword,
        name: parsed.name,
      },
    });

    return NextResponse.json(
      { success: true, user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Unknown error occurred' }, { status: 500 });
  }
}
