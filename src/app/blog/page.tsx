async function getContent() {
  return [];
}

export default async function BlogListingPage() {
  const posts = await getContent();

  return <div></div>;
}
