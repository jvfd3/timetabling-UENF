import "react-toastify/dist/ReactToastify.css";
import configInfo from "../../config/configInfo";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const { routing, pageSelection } = configInfo;

// import PageSelection from "./components/PageSelection/PageSelect";
// Page imports
/* Isso poderia ser trocado pro valor do options */

import myStyles from "../../config/myStyles";
import Main from "../timetabling-UENF/main/main";
import Classes from "../timetabling-UENF/classes/classes";
import CCTable from "../timetabling-UENF//cctable/ccTable";
import Rooms from "../timetabling-UENF/baseCRUD/rooms/rooms";
import NoMatch from "../timetabling-UENF//notFound/notFound";
import Students from "../timetabling-UENF/baseCRUD/students/students";
import Subjects from "../timetabling-UENF/baseCRUD/subjects/subjects";
import MultiClasses from "../timetabling-UENF/multiClasses/MultiClasses";
import PageSelection from "../../components/PageSelection/PageSelection";
import Professors from "../timetabling-UENF//baseCRUD/professors/professors";

function MyRouting() {
  const basePath = routing.urlPath; //"/timetabling-uenf/";
  const pathMain = basePath + pageSelection.main.url;
  const pathRooms = basePath + pageSelection.rooms.url;
  const pathClasses = basePath + pageSelection.classes.url;
  const pathCCtable = basePath + pageSelection.CCTable.url;
  const pathSubjects = basePath + pageSelection.subjects.url;
  const pathNotFound = basePath + pageSelection.notFound.url;
  const pathStudents = basePath + pageSelection.students.url;
  const pathProfessors = basePath + pageSelection.professors.url;
  const pathMultiClasses = basePath + pageSelection.multiClasses.url;

  const defaultClassNames = myStyles.classNames.default;

  return (
    <div className={defaultClassNames.background}>
      <BrowserRouter basename="/" future={{ v7_startTransition: true }}>
        <PageSelection />
        <Routes>
          <Route element={<Main />} index />
          <Route element={<Main />} path="/" />
          <Route element={<NoMatch />} path="*" />
          <Route element={<Main />} path={basePath} />
          <Route element={<Main />} path={pathMain} />
          <Route element={<Rooms />} path={pathRooms} />
          <Route element={<CCTable />} path={pathCCtable} />
          <Route element={<Classes />} path={pathClasses} />
          <Route element={<NoMatch />} path={pathNotFound} />
          <Route element={<Subjects />} path={pathSubjects} />
          <Route element={<Students />} path={pathStudents} />
          <Route element={<Professors />} path={pathProfessors} />
          <Route element={<MultiClasses />} path={pathMultiClasses} />
        </Routes>
        <ToastContainer {...configInfo.toast} />
      </BrowserRouter>
    </div>
  );
}

export default MyRouting;
