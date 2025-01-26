import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function FormCreateProduct() {
  return (
            <div className="w-full lg:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                    Adicionar Produto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    {/* Nome */}
                    <div>
                      <Label htmlFor="nome" className="text-sm font-medium">
                        Nome
                      </Label>
                      <Input id="nome" type="text" placeholder="Digite o nome" className="mt-1" />
                    </div>
    
                    {/* Descrição */}
                    <div>
                      <Label htmlFor="descricao" className="text-sm font-medium">
                        Descrição
                      </Label>
                      <Textarea
                        id="descricao"
                        placeholder="Digite a descrição"
                        className="mt-1"
                      />
                    </div>
    
                    {/* Valor */}
                    <div>
                      <Label htmlFor="valor" className="text-sm font-medium">
                        Valor
                      </Label>
                      <Input
                        id="valor"
                        type="number"
                        placeholder="Digite o valor"
                        className="mt-1"
                      />
                    </div>
    
                    {/* Imagem */}
                    <div>
                      <Label htmlFor="imagem" className="text-sm font-medium">
                        Imagem
                      </Label>
                      <Input
                        id="imagem"
                        type="file"
                        className="mt-1"
                        accept="image/*"
                      />
                    </div>
    
                    {/* Botão Salvar */}
                    <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-gray-800">
                      Salvar Produto
                    </Button>
                  </form>
                  
                </CardContent>
                
              </Card>
              
            </div>
  )
}
