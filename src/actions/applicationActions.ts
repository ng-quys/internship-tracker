'use server';

import { and, eq, ilike, or } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/libs/DB';
import { applicationsSchema } from '@/models/Schema';

export async function createApplication(formData: FormData) {
  await db.insert(applicationsSchema).values({
    company: String(formData.get('company')),
    position: String(formData.get('position')),
    location: String(formData.get('location') ?? ''),
    jobUrl: String(formData.get('jobUrl') ?? ''),
    appliedDate: String(formData.get('appliedDate') ?? ''),
    notes: String(formData.get('notes') ?? ''),
    status: String(formData.get('status') ?? 'Saved'),
  });

  revalidatePath('/applications');
}

export async function deleteApplication(id: number) {
  await db.delete(applicationsSchema).where(eq(applicationsSchema.id, id));

  revalidatePath('/applications');
}

export async function updateApplication(formData: FormData) {
  const id = Number(formData.get('id'));

  await db
    .update(applicationsSchema)
    .set({
      company: String(formData.get('company')),
      position: String(formData.get('position')),
      location: String(formData.get('location') ?? ''),
      jobUrl: String(formData.get('jobUrl') ?? ''),
      appliedDate: String(formData.get('appliedDate') ?? ''),
      notes: String(formData.get('notes') ?? ''),
      status: String(formData.get('status') ?? 'Saved'),
    })
    .where(eq(applicationsSchema.id, id));

  revalidatePath('/applications');
  redirect('/applications');
}

export async function getApplications(status?: string, search?: string) {
  const conditions = [];

  if (status && status !== 'All') {
    conditions.push(eq(applicationsSchema.status, status));
  }

  if (search) {
    conditions.push(
      or(
        ilike(applicationsSchema.company, `%${search}%`),
        ilike(applicationsSchema.position, `%${search}%`),
      ),
    );
  }

  if (conditions.length > 0) {
    return await db
      .select()
      .from(applicationsSchema)
      .where(and(...conditions));
  }

  return await db.select().from(applicationsSchema);
}

export async function getApplicationById(id: number) {
  const result = await db.select().from(applicationsSchema).where(eq(applicationsSchema.id, id));

  return result[0];
}
