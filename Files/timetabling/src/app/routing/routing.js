import { Routes, Route, BrowserRouter } from "react-router-dom";
import options from "../../DB/local/options";
// import PageSelection from "./components/PageSelect";

// Page imports
/* Isso poderia ser trocado pro valor do options */

import Main from "../timetabling-UENF/main/main";
import Turmas from "../timetabling-UENF//turmas/turmas";
import MultiTurmas from "../timetabling-UENF//multiturmas/multiTurmas";
import Alunos from "../timetabling-UENF//alunos/alunos";
import Professores from "../timetabling-UENF//professores/professores";
import Disciplinas from "../timetabling-UENF//disciplinas/disciplinas";
import Salas from "../timetabling-UENF//salas/salas";
import NoMatch from "../timetabling-UENF//notFound/notFound";
import CCTable from "../timetabling-UENF//cctable/ccTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyRouting() {
  let basePath = options.constantValues.routing.urlPath; //"/timetabling-uenf/";
  let mainPath = basePath + options.constantValues.pageSelection.main.value;
  let multiTurmasPath =
    basePath + options.constantValues.pageSelection.multiTurmas.value;
  let turmasPath = basePath + options.constantValues.pageSelection.turmas.value;
  let alunosPath = basePath + options.constantValues.pageSelection.alunos.value;
  let professoresPath =
    basePath + options.constantValues.pageSelection.professores.value;
  let disciplinasPath =
    basePath + options.constantValues.pageSelection.disciplinas.value;
  let salasPath = basePath + options.constantValues.pageSelection.salas.value;
  let notFoundPath =
    basePath + options.constantValues.pageSelection.notFound.value;
  let ccTablePath =
    basePath + options.constantValues.pageSelection.CCTable.value;

  return (
    <BrowserRouter basename="/">
      {/* <PageSelection /> */}
      {/* <Navigation /> */}
      <Routes>
        <Route element={<Main />} index />
        <Route element={<Main />} path={"/"} />
        <Route element={<Main />} path={basePath} />
        <Route element={<Main />} path={mainPath} />
        <Route element={<MultiTurmas />} path={multiTurmasPath} />
        <Route element={<CCTable />} path={ccTablePath} />
        <Route element={<Turmas />} path={turmasPath} />
        <Route element={<Professores />} path={professoresPath} />
        <Route element={<Salas />} path={salasPath} />
        <Route element={<Disciplinas />} path={disciplinasPath} />
        <Route element={<Alunos />} path={alunosPath} />
        <Route element={<NoMatch />} path={notFoundPath} />
        <Route element={<NoMatch />} path="*" />
      </Routes>{" "}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        // closeOnClick
        // draggable
        // pauseOnHover
        // hideProgressBar={false}
        // newestOnTop={false}
        // pauseOnFocusLoss
        // theme="light"
      />
    </BrowserRouter>
  );
}

export default MyRouting;
