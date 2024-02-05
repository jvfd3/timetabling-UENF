import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import configInfo from "../../config/configInfo";

const { routing, pageSelection } = configInfo;

// import PageSelection from "./components/PageSelection/PageSelect";
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
import PageSelectV2 from "../../components/PageSelection/PageSelectV2";

function MyRouting() {
  const basePath = routing.urlPath; //"/timetabling-uenf/";
  const pathMain = basePath + pageSelection.main.url;
  const pathMultiClasses = basePath + pageSelection.multiClasses.url;
  const pathClasses = basePath + pageSelection.classes.url;
  const pathStudents = basePath + pageSelection.students.url;
  const pathProfessors = basePath + pageSelection.professors.url;
  const pathSubjects = basePath + pageSelection.subjects.url;
  const pathRooms = basePath + pageSelection.rooms.url;
  const pathNotFound = basePath + pageSelection.notFound.url;
  const pathCCtable = basePath + pageSelection.CCTable.url;

  return (
    <BrowserRouter basename="/">
      <PageSelectV2 />
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
      <ToastContainer {...configInfo.toast} />
    </BrowserRouter>
  );
}

export default MyRouting;
