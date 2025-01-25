export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 p-4  border-gray-300   dark:bg-stone-900">
      <div className="container mx-auto dark:text-neutral-100 flex flex-col md:flex-row justify-between items-center ">
        <span className="text-sm">
          © {new Date().getFullYear()} Stock Manager. Todos os direitos reservados.
        </span>
        <div className="flex  space-x-4 mt-2 md:mt-0">
          <a
            href="#"
            className="text-gray-700 dark:text-neutral-100 hover:text-primary transition duration-200 text-sm"
          >
            Termos de Serviço
          </a>
          <a
            href="#"
            className="text-gray-700 dark:text-neutral-100 hover:text-primary transition duration-200 text-sm"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
