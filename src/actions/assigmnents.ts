'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {z} from 'zod'

const FormSchema = z.object({
  name: z.string(),
});

const CreateAssignment = FormSchema.omit({});

export default async function addAssignment(formData: FormData) {
  const {name} = CreateAssignment.parse({
    name: formData.get('name')
  })
  const rawData = {
    name: name
  }

  const res = await fetch(`${process.env.API_URL}/assignments`, {
    method: "POST", 
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(rawData)
  })

  const result = await res.json()

  console.log(result);

  revalidatePath('/pyiurs/rh/assignments')
  redirect('/pyiurs/rh/assignments')
}