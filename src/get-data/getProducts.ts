export async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?populate=*`,
      {
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}?populate=deep`,
      {
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
