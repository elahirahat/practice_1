import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Stack, Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

function Result({ data }) {
  console.log(data);

  const { homeValue, downPayment, loanAmount, loanTerm, interestRate } = data;

  const totalLoanMonths = loanTerm * 12;
  const interestPerMonth = interestRate / 100 / 12;

  const monthlyPayment =
    (loanAmount * interestPerMonth) /
    (1 - (1 + interestPerMonth) ** -totalLoanMonths);

  const totalInterest = monthlyPayment * totalLoanMonths - loanAmount;

  const pieChartData = {
    labels: ["Principle", "Interest"],
    datasets: [
      {
        label: "Ratio of Principle and Interest",
        data: [homeValue, totalInterest],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Stack gap={3}>
      <Typography variant="h5" textAlign="center">
        Monthly payment: $ {monthlyPayment.toFixed(2)}
      </Typography>
      <Stack direction="row" justifyContent="center">
        <div>
          <Pie data={pieChartData} />
        </div>
      </Stack>
    </Stack>
  );
}

export default Result;
