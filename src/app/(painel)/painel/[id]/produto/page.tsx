
import ProductsPage from "@/templates/products";
import UserDataTable from "./datatable/_components/users-datatable";
import FormCreateProduct from "@/components/FormCreateProduct";

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
}

export default async function Page() {
  const users = await fetchUsers();

  return (
    <ProductsPage>
      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 p-6 ">
        {/* Formulário */}
      <FormCreateProduct />

        {/* Tabela */}

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Produtos</h1>
          <UserDataTable users={users} />
        </div>
      </div>
      
    </ProductsPage>
  );
}
