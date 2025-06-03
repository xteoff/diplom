import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  console.log(data);

  const oldUser = await prisma.user.findUnique({
    where: {
      email: data.email.toString(),
    },
  });

  if (oldUser) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  const result = await prisma.user.create({
    data: {
      name: data.name.toString(),
      email: data.email.toString(),
      password: (await bcrypt.hash(data.password.toString(), 12)).toString(),
    },
  });

  return new Response(JSON.stringify(result.email), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
