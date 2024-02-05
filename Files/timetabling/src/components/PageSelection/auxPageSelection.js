import configInfo from "../../config/configInfo";
import { useLocation } from "react-router-dom";

function getCurrentPage() {
  const pageObjectList = configInfo.pageSelection;
  const pagesList = Object.values(pageObjectList);

  const location = useLocation().pathname.split("/");
  const thisPage = location[location.length - 1];
  const currentPageObject = pagesList.find((page) => page.url === thisPage);

  const mainPaths = ["", "/", "/timetabling-UENF/", "/timetabling-UENF/main"];

  const mainPage = pageObjectList.main;
  const notFoundPage = pageObjectList.notFound;

  if (mainPaths.includes(thisPage)) {
    return mainPage;
  }

  return currentPageObject ?? notFoundPage;
}

export default getCurrentPage;
