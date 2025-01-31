"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchProducts } from "@/services/productService";

const chartConfig = {
  low: {
    label: "Até R$ 200 ->",
    color: "blue",
  },
  medium: {
    label: "De R$ 200 a R$ 700\u200B ->",
    color: "hsl(var(--chart-1))",
  },
  high: {
    label: "Acima de R$ 700 ->",
    color: "red",
  },
} satisfies ChartConfig;

export function PieCharData() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [chartData, setChartData] = React.useState<any[]>([]);

  // Função para processar os dados dos produtos e organizar por faixa de preço
  const processData = (products: any[]) => {
    const priceCategories: { [key: string]: number } = { low: 0, medium: 0, high: 0 };

    // Processa os produtos por faixa de preço
    products.forEach((product) => {
      if (product.price <= 200) {
        priceCategories.low += 1;
      } else if (product.price > 200 && product.price <= 700) {
        priceCategories.medium += 1;
      } else if (product.price > 700) {
        priceCategories.high += 1;
      }
    });

    // Mapeia os dados para a estrutura do gráfico
    const data = Object.keys(priceCategories).map((key) => ({
      name: chartConfig[key]?.label || key,  // Altera 'browser' para 'name'
      value: priceCategories[key],  // Altera 'visitors' para 'value'
      fill: chartConfig[key]?.color || "gray",
    }));

    setChartData(data);
  };

  // Faz a requisição dos produtos e processa os dados
  React.useEffect(() => {
    const fetchAndProcessData = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      processData(fetchedProducts);
    };

    fetchAndProcessData();
  }, []);

  // Calcula o total de produtos cadastrados
  const totalProducts = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Quantidade de produtos</CardTitle>
        <CardDescription>Janeiro - Março 2025</CardDescription>
        {totalProducts === 0 && (
          <CardTitle className="relative top-24 text-2xl">Não a produtos cadastrados</CardTitle>

        )}
      </CardHeader>
      <CardContent className="flex-1 pb-0 content-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"  // Atualiza para 'value'
              nameKey="name"  // Atualiza para 'name'
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalProducts.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Produtos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Atualizado<TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
