import { Routes, Route, BrowserRouter } from "react-router-dom";
import options from "./temp/options";
// import PageSelection from "./components/PageSelect";

// Page imports
/* Isso poderia ser trocado pro valor do options */

import CRUDdisciplinas from "./pages/disciplinas";
import CRUDprofessors from "./pages/professores";
import CRUDstudents from "./pages/alunos";
import CRUDrooms from "./pages/salas";
import CRUDclass from "./pages/turmas";
import MainPage from "./pages/mainpage";
import NoMatch from "./pages/notFound";

function MyRouting() {

  let basePath = options.constantValues.routing.urlPath;
  let mainPath = basePath+options.constantValues.pageSelection.mainPage.value;
  let turmasPath = basePath+options.constantValues.pageSelection.turmas.value;
  let salasPath = basePath+options.constantValues.pageSelection.salas.value;
  let alunosPath = basePath+options.constantValues.pageSelection.alunos.value;
  let professoresPath = basePath+options.constantValues.pageSelection.professores.value;
  let disciplinasPath = basePath+options.constantValues.pageSelection.disciplinas.value;
  let notFoundPath = basePath+options.constantValues.pageSelection.notFound.value;

  return (
    <BrowserRouter basename="/">
      {/* <PageSelection /> */}
      {/* <Navigation /> */}
      <Routes>
        <Route index element={<MainPage/>} />
        <Route element={<MainPage/>} path={mainPath} />
        <Route element={<CRUDrooms/>} path={turmasPath}/>
        <Route element={<CRUDclass/>} path={salasPath}/>
        <Route element={<CRUDstudents/>} path={alunosPath}/>
        <Route element={<CRUDprofessors/>} path={professoresPath}/>
        <Route element={<CRUDdisciplinas/>} path={disciplinasPath}/>
        <Route path={notFoundPath} element={<NoMatch/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouting;
