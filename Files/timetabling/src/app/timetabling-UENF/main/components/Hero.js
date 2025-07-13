import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material";
const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundImage: `url(${
    process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
  }/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    backgroundImage: `url(${
      process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
    }/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
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
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 5 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          {/* Logo OurClass */}
          <Box
            component="img"
            src={process.env.PUBLIC_URL + "/OurClass.png"}
            alt="OurClass Logo"
            sx={{
              height: { xs: 120, sm: 180, md: 240, lg: 280 },
              width: "auto",
              mb: 3,
              objectFit: "contain",
              padding: 2,
              borderRadius: 2,
              background: `radial-gradient(ellipse at center, ${gradientColorStart} 0%, ${gradientColorEnd} 80%)`,
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          />

          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Our
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              Class
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            A ferramenta para agendamento de aulas e organização de turmas
            universitárias.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
          >
            Neste sistema, você poderá criar, ler, editar e excluir turmas,
            salas, disciplinas, professores e alunos. Além disso, você poderá
            gerar as grades horárias e visualizar os conflitos de horários entre
            as turmas, facilitando o planejamento acadêmico.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
