import { auth } from "@clerk/nextjs/server";


export default async function page() {
  const { userId } = await auth();
  return (
    <div>produto id : {userId}</div>
  )
}
