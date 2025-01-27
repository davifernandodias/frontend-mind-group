import { PieCharData } from "./ui/pie-char";


export default function Graphics() {
  return (
        <div className="container mx-auto  p-4">
          {/* Linha de Gráficos */}
          <div className="flex flex-col lg:flex-row  gap-4 mb-6">
            {/* Gráfico de Pizza */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-2 shadow">

              <PieCharData />
            </div>
          </div>
        </div>
)
}
