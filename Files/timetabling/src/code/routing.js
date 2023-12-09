import { Routes, Route, BrowserRouter } from "react-router-dom";
import options from "./temp/options";
// import PageSelection from "./components/PageSelect";

// Page imports
/* Isso poderia ser trocado pro valor do options */

import Main from "./pages/main";
import Turmas from "./pages/turmas";
import Alunos from "./pages/alunos";
import Professores from "./pages/professores";
import Disciplinas from "./pages/disciplinas";
import Salas from "./pages/salas";
import NoMatch from "./pages/notFound";

function MyRouting() {

  let basePath = options.constantValues.routing.urlPath; //"/timetabling-uenf/";
  let mainPath = basePath+options.constantValues.pageSelection.main.value;
  let turmasPath = basePath+options.constantValues.pageSelection.turmas.value;
  let alunosPath = basePath+options.constantValues.pageSelection.alunos.value;
  let professoresPath = basePath+options.constantValues.pageSelection.professores.value;
  let disciplinasPath = basePath+options.constantValues.pageSelection.disciplinas.value;
  let salasPath = basePath+options.constantValues.pageSelection.salas.value;
  let notFoundPath = basePath+options.constantValues.pageSelection.notFound.value;

  return (
    <BrowserRouter basename="/">
      {/* <PageSelection /> */}
      {/* <Navigation /> */}
      <Routes>
        <Route element={<Main/>} index />
        <Route element={<Main/>} path={basePath} />
        <Route element={<Main/>} path={mainPath} />
        <Route element={<Turmas/>} path={turmasPath}/>
        <Route element={<Alunos/>} path={alunosPath}/>
        <Route element={<Professores/>} path={professoresPath}/>
        <Route element={<Disciplinas/>} path={disciplinasPath}/>
        <Route element={<Salas/>} path={salasPath}/>
        <Route element={<NoMatch/>} path={notFoundPath}/>
        <Route element={<NoMatch/>} path="*"/>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouting;
