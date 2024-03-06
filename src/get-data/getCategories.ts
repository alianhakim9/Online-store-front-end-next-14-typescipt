export async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
