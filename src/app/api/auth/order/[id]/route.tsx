import prisma from "../../../../lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return new Response(
      JSON.stringify({ message: "Error while deleting product" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  await prisma.orderItem.deleteMany({
    where: {
      orderId: id,
    },
  });

  const result = await prisma.order.delete({
    where: {
      id: id.toString(),
    },
  });

  if (!result) {
    return new Response(
      JSON.stringify({ message: "Error while deleting product" }),
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  if (!id) {
    return new Response(
      JSON.stringify({ message: "Error while deleting product" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const result = await prisma.order.update({
    where: {
      id: id.toString(),
    },
    data: {
      status: +data.status,
    },
  });

  if (!result) {
    return new Response(
      JSON.stringify({ message: "Error while deleting product" }),
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
