import "react-toastify/dist/ReactToastify.css";
import options from "../../DB/local/options";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// import PageSelection from "./components/PageSelect";
// Page imports
/* Isso poderia ser trocado pro valor do options */
import Main from "../timetabling-UENF/main/main";
import Classes from "../timetabling-UENF/classes/classes";
import MultiClasses from "../timetabling-UENF/multiClasses/MultiClasses";
import NoMatch from "../timetabling-UENF//notFound/notFound";
import CCTable from "../timetabling-UENF//cctable/ccTable";
import Professors from "../timetabling-UENF//baseCRUD/professors/professors";
import Students from "../timetabling-UENF/baseCRUD/students/students";
import Subjects from "../timetabling-UENF/baseCRUD/subjects/subjects";
import Rooms from "../timetabling-UENF/baseCRUD/rooms/rooms";

function MyRouting() {
  const basePath = options.constantValues.routing.urlPath; //"/timetabling-uenf/";
  const pageSelection = options.constantValues.pageSelection;
  const pathMain = basePath + pageSelection.main.value;
  const pathMultiClasses = basePath + pageSelection.multiClasses.value;
  const pathClasses = basePath + pageSelection.classes.value;
  const pathStudents = basePath + pageSelection.students.value;
  const pathProfessors = basePath + pageSelection.professors.value;
  const pathSubjects = basePath + pageSelection.subjects.value;
  const pathRooms = basePath + pageSelection.classrooms.value;
  const pathNotFound = basePath + pageSelection.notFound.value;
  const pathCCtable = basePath + pageSelection.CCTable.value;

  return (
    <BrowserRouter basename="/">
      {/* <PageSelection /> */}
      {/* <Navigation /> */}
      <Routes>
        <Route element={<Main />} index />
        <Route element={<Main />} path={"/"} />
        <Route element={<Main />} path={basePath} />
        <Route element={<Main />} path={pathMain} />
        <Route element={<MultiClasses />} path={pathMultiClasses} />
        <Route element={<CCTable />} path={pathCCtable} />
        <Route element={<Classes />} path={pathClasses} />
        <Route element={<Professors />} path={pathProfessors} />
        <Route element={<Rooms />} path={pathRooms} />
        <Route element={<Subjects />} path={pathSubjects} />
        <Route element={<Students />} path={pathStudents} />
        <Route element={<NoMatch />} path={pathNotFound} />
        <Route element={<NoMatch />} path="*" />
      </Routes>
      <ToastContainer
        autoClose={options.config.toast.time}
        position={options.config.toast.position}
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
