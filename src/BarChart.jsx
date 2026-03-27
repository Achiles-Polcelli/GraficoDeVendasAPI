import React from "react";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/*const arrVendasMensais = [
  {
    "_id": "69c5ce49f7910275b95481ef",
    "data": "12/01/2026",
    "valorVendido": 200,
    "tipoVenda": "Presencial",
    "quantidadeVendida": 2,
    "produtos": "2 camisas",
    "__v": 0
  },
  {
    "_id": "69c5ce5df7910275b95481f1",
    "data": "14/01/2026",
    "valorVendido": 300,
    "tipoVenda": "Online",
    "quantidadeVendida": 2,
    "produtos": "2 calças",
    "__v": 0
  },
  {
    "_id": "69c5ce6bf7910275b95481f3",
    "data": "15/01/2026",
    "valorVendido": 300,
    "tipoVenda": "Presencial",
    "quantidadeVendida": 2,
    "produtos": "3 camisas",
    "__v": 0
  },
  {
    "_id": "69c5ce7bf7910275b95481f5",
    "data": "16/01/2026",
    "valorVendido": 500,
    "tipoVenda": "Online",
    "quantidadeVendida": 2,
    "produtos": "2 camisas e 2 calças",
    "__v": 0
  },
  {
    "_id": "69c5ceb2f7910275b95481f7",
    "data": "17/01/2026",
    "valorVendido": 600,
    "tipoVenda": "Online",
    "quantidadeVendida": 2,
    "produtos": "2 camisas, 2 calças, um boné e uma meia",
    "__v": 0
  },
  {
    "_id": "69c5ced0f7910275b95481f9",
    "data": "18/01/2026",
    "valorVendido": 1000,
    "tipoVenda": "Presencial",
    "quantidadeVendida": 2,
    "produtos": "3 camisas, 2 calças, 1 moletom e um boné",
    "__v": 0
  },
  {
    "_id": "69c5d028f7910275b95481fd",
    "data": "18/01/2026",
    "valorVendido": 2000,
    "tipoVenda": "Online",
    "quantidadeVendida": 2,
    "produtos": "6 camisas, 4 calças, 2 moletons e 2 bonés",
    "__v": 0
  },
  {
    "_id": "69c5d03df7910275b95481ff",
    "data": "18/01/2026",
    "valorVendido": 4400,
    "tipoVenda": "Online",
    "quantidadeVendida": 2,
    "produtos": " 14 camisas, 8 calças, 4 moletons 6 bonés e 2 meias",
    "__v": 0
  }
]*/

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      min: 1,
    },
    title: {
      display: true,
      text: 'Gráfico de Vendas Mensais',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const BarChart = () => {
  const [arrVendasMensais, setArrVendasMensais] = useState([]);

  useEffect(() => {
    const pegarInfosAPI = async () => {
      try {
        const respostaFetch = await fetch('http://localhost:3000/vendas')
        const jsonRespostaFetch = await respostaFetch.json();
  
        setArrVendasMensais(jsonRespostaFetch);
      } catch (error) {
        console.log('Deu erro', error)
      }
    }

    pegarInfosAPI();
  }, [])

  const data = {
  labels: arrVendasMensais.map(item => `Data ${item.data}`), // Labels para o eixo X
  datasets: [
    {
      label: "Vendas Mensais",
      data: arrVendasMensais.map(item => item.valorVendido), // Valores para o eixo Y
      backgroundColor: "rgba(149, 73, 235, 0.6)",
    },
  ],
};
  
  return <Bar data={data} options={chartOptions} />;
};

export default BarChart;
