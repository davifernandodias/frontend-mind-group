import ProductsPage from "@/templates/products";
import UserDataTable from "./datatable/_components/users-datatable";

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
}

export default async function page() {
  const users = await fetchUsers()

  return (
    <ProductsPage>
      <div>
    <h1>
        produtos

    </h1>
    <UserDataTable users={users} /> 
      </div>

    </ProductsPage>
  )
}
