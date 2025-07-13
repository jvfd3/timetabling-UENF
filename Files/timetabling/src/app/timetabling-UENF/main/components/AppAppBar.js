import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import Sitemark from "./SitemarkIcon";

// Importar o hook useNavigate do React Router Dom
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Função para lidar com a navegação dos botões
  const handleNavigation = (path) => () => {
    navigate(path);
    setOpen(false); // Fecha o drawer após a navegação em dispositivos móveis
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
        left: 0,
        right: 0,
        width: "100vw",
        maxWidth: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "0 auto",
          padding: { xs: "0 16px", sm: "0 24px" },
        }}
      >
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Sitemark />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* Botões de navegação para Desktop */}
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={handleNavigation("/timetabling-UENF")}
              >
                Main
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={handleNavigation("/timetabling-UENF/multiturmas")}
              >
                MultiTurmas
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={handleNavigation("/timetabling-UENF/cctable")}
              >
                Grade de Horários
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={handleNavigation("/timetabling-UENF/turmas")}
              >
                Turmas
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={handleNavigation("/timetabling-UENF/professores")}
              >
                Professores
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={handleNavigation("/timetabling-UENF/salas")}
              >
                Salas
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={handleNavigation("/timetabling-UENF/disciplinas")}
              >
                Disciplinas
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={handleNavigation("/timetabling-UENF/alunos")}
              >
                Alunos
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              slotProps={{
                paper: {
                  sx: {
                    top: "var(--template-frame-height, 0px)",
                  },
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {/* Itens de navegação para Mobile (Drawer) */}
                <MenuItem onClick={handleNavigation("/timetabling-UENF")}>
                  Main
                </MenuItem>
                <MenuItem
                  onClick={handleNavigation("/timetabling-UENF/multiturmas")}
                >
                  MultiTurmas
                </MenuItem>
                <MenuItem
                  onClick={handleNavigation("/timetabling-UENF/cctable")}
                >
                  Grade de Horários
                </MenuItem>
                <MenuItem
                  onClick={handleNavigation("/timetabling-UENF/turmas")}
                >
                  Turmas
                </MenuItem>
                <MenuItem
                  onClick={handleNavigation("/timetabling-UENF/professores")}
                >
                  Professores
                </MenuItem>
                <MenuItem onClick={handleNavigation("/timetabling-UENF/salas")}>
                  Salas
                </MenuItem>
                <MenuItem
                  onClick={handleNavigation("/timetabling-UENF/disciplinas")}
                >
                  Disciplinas
                </MenuItem>
                <MenuItem
                  onClick={handleNavigation("/timetabling-UENF/alunos")}
                >
                  Alunos
                </MenuItem>

                <Divider sx={{ my: 3 }} />
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
