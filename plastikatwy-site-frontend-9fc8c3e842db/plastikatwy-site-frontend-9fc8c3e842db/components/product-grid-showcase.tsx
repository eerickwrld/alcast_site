import { ProductItem } from "./product-grid"


// {
//   especificacoes: [
//     {
//       grupo: "Espessura",
//       especificacoes: [
//         {
//           title: "",
//           unit: "mm",
//           values: ["1,2"],
//         }
//     }
//   ]
// }
export const products = [
  {
    name: "Bobinas",
    image: "/images/bobinas.png",
    link: "/produtos/bobinas",
    slug: "bobinas",
    properties: {
      espessura: {
        min: 0.3,
        unit: "mm"
      },
      largura: {
        min: 100,
        unit: "mm"
      },
      ligas: "",
      temperas: ""
    }
  },
  {
    name: "Chapas lisas",
    image: "/images/chapas-lisas.png",
    link: "/produtos/chapas-lisas",
    slug: "chapas-lisas",
    properties: {
      espessura: {
        min: 0.3,
        max: 1.5,
        unit: "mm"
      },
      largura: {
        min: 600,
        max: 1350,
        unit: "mm"
      },
      comprimento: {
        min: 1000,
        max: 6000,
        unit: "mm"
      },
      // naoPlanificada: {
      //   espessura: {
      //     min: 1.5,
      //     max: 3.0,
      //     unit: "mm"
      //   },
      //   largura: {
      //     min: 600,
      //     max: 1370,
      //     unit: "mm"
      //   },
      //   comprimento: {
      //     min: 1000,
      //     max: 6000,
      //     unit: "mm"
      //   }
      // },
      ligas: ["1050", "1050A", "1100", "1350", "3105"],
      temperas: ["O", "H14", "H26", "H34", "H114"]
    }
  },
  {
    name: "Chapas lavradas",
    image: "/images/chapas-lavradas.png",
    link: "/produtos/chapas-lavradas",
    slug: "chapas-lavradas",
    properties: {
      espessura: {
        min: 1.2,
        max: 2.7,
        unit: "mm"
      },
      largura: {
        min: 1000,
        max: 1250,
        unit: "mm"
      },
      comprimento: {
        min: 1000,
        max: 6000,
        unit: "mm"
      },
      ligas: ["3105"],
      temperas: ["H114"]
    }
  },
  {
    name: "Discos naturais",
    image: "/images/discos.png",
    link: "/produtos/discos-naturais",
    slug: "discos-naturais",
    properties: {
      espessura: {
        min: 0.7,
        max: 3.0,
        unit: "mm"
      },
      diametro: {
        min: 140,
        max: 510,
        unit: "mm"
      },
      ligas: ["1100"],
      temperas: ["O"]
    }
  },
  {
    name: "Telha trapezoidal",
    image: "/images/telhas-trapezoidais.png",
    link: "/produtos/telhas",
    slug: "telha-trapezoidal",
    properties: {
      espessura: {
        min: 0.3,
        max: 1.5,
        unit: "mm"
      },
      largura: {
        min: 600,
        max: 1350,
        unit: "mm"
      },
      comprimento: {
        min: 1000,
        max: 6000,
        unit: "mm"
      },
      tipoMedida: ["peso", "quantidade"],
    },
  },
  {
    name: "Telha ondulada",
    image: "/images/telhas-onduladas.png",
    link: "/produtos/telhas",
    slug: "telha-ondulada",
    properties: {
      espessura: {
        min: 0.3,
        max: 1.5,
        unit: "mm"
      },
      largura: {
        min: 600,
        max: 1350,
        unit: "mm"
      },
      comprimento: {
        min: 1000,
        max: 6000,
        unit: "mm"
      },
      tipoMedida: ["peso", "quantidade"],
    },
  },
]

export default function ProductGridShowcase() {
  return (
    <section className="bg-[#1A408A] py-16">
      <div className="container px-4 mx-auto w-full lg:w-1/2 md:px-6">
        <div className="grid grid-cols-3 gap-4 justify-center items-center">
          {products.map((product) => (
            <ProductItem key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
