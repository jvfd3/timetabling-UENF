import { Routes, Route, BrowserRouter } from "react-router-dom";
import options from "../../DB/local/options";
// import PageSelection from "./components/PageSelect";

// Page imports
/* Isso poderia ser trocado pro valor do options */

import Main from "../timetabling-UENF/main/main";
import Classes from "../timetabling-UENF//turmas/turmas";
import MultiClasses from "../timetabling-UENF//multiturmas/multiTurmas";
import Students from "../timetabling-UENF//alunos/alunos";
import Professors from "../timetabling-UENF//professores/professores";
import Subjects from "../timetabling-UENF//disciplinas/disciplinas";
import Rooms from "../timetabling-UENF//salas/salas";
import NoMatch from "../timetabling-UENF//notFound/notFound";
import CCTable from "../timetabling-UENF//cctable/ccTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyRouting() {
  const basePath = options.constantValues.routing.urlPath; //"/timetabling-uenf/";
  const pageSelection = options.constantValues.pageSelection;
  const mainPath = basePath + pageSelection.main.value;
  const multiClassesPath = basePath + pageSelection.multiClasses.value;
  const turmasPath = basePath + pageSelection.classes.value;
  const alunosPath = basePath + pageSelection.students.value;
  const professoresPath = basePath + pageSelection.professors.value;
  const disciplinasPath = basePath + pageSelection.subjects.value;
  const salasPath = basePath + pageSelection.classrooms.value;
  const notFoundPath = basePath + pageSelection.notFound.value;
  const ccTablePath = basePath + pageSelection.CCTable.value;

  return (
    <BrowserRouter basename="/">
      {/* <PageSelection /> */}
      {/* <Navigation /> */}
      <Routes>
        <Route element={<Main />} index />
        <Route element={<Main />} path={"/"} />
        <Route element={<Main />} path={basePath} />
        <Route element={<Main />} path={mainPath} />
        <Route element={<MultiClasses />} path={multiClassesPath} />
        <Route element={<CCTable />} path={ccTablePath} />
        <Route element={<Classes />} path={turmasPath} />
        <Route element={<Professors />} path={professoresPath} />
        <Route element={<Rooms />} path={salasPath} />
        <Route element={<Subjects />} path={disciplinasPath} />
        <Route element={<Students />} path={alunosPath} />
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
