import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const result = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
    },
  });

  return new Response(JSON.stringify(result), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries()) as {
    name: string;
    price: string;
    description: string;
    collectionID: string;
    image: string;
  };

  const result = await prisma.product.create({
    data: {
      name: data.name.toString(),
      description: " ",
      price: +data.price,
      collectionID: data.collectionID,
      image: data.image.toString(),
    },
  });

  if (!result) {
    return new Response(
      JSON.stringify({ message: "Error while creating product" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return new Response(JSON.stringify(result), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
