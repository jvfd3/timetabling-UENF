import * as React from "react";
import Box from "@mui/material/Box"; // Importe o componente Box do MUI
import { useTheme } from "@mui/material";

export default function SitemarkIcon() {
  const theme = useTheme(); // Obtenha o tema atual (claro/escuro)

  // Defina a cor inicial do gradiente com base no modo do tema
  // Para temas escuros, uma opacidade um pouco menor pode ser desejável
  // para que o logo não fique "gritante" demais, mas ainda visível.
  const gradientColorStart =
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.2)" // Branco 20% opaco para modo escuro
      : "rgba(255, 255, 255, 0.7)"; // Branco 70% opaco para modo claro (mais visível)

  // A cor final do gradiente, totalmente transparente
  const gradientColorEnd = "rgba(255, 255, 255, 0)"; // Branco 0% opaco (transparente)

  return (
    <Box
      sx={{
        height: "64px",
        width: "auto",
        padding: "4px 8px",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Aplica o gradiente radial como background-image
        // 'ellipse at center': o gradiente é uma elipse centrada
        // `gradientColorStart 0%`: a cor inicial no centro
        // `gradientColorEnd 70%`: a cor final (transparente) a 70% do raio,
        //                         o restante (até 100%) continua transparente.
        //                         Ajuste '70%' para controlar o quão "rápido" o fade ocorre.
        background: `radial-gradient(ellipse at center, ${gradientColorStart} 0%, ${gradientColorEnd} 80%)`,
      }}
    >
      <img
        src={process.env.PUBLIC_URL + "/OurClass-Side.png"} // Usando a imagem JPG que você forneceu
        alt="Logo OurClass"
        style={{ height: "100%", width: "auto", display: "block" }}
      />
    </Box>
  );
}
