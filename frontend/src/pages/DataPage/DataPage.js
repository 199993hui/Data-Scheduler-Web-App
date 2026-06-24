import jwtDecode from "jwt-decode";

import FileUploader from "./components/FileUploader/FileUploader";
import Data from "./components/Tables/data";
import AccessDeniedPage from "../ErrorPage/AccessDeny";
import Upload_Loading from "../../components/Upload_loading/Upload_Loading";
import { useState } from "react";

const DataPage = () => {
  const decodedToken = jwtDecode(localStorage.getItem("token"))["sub"];
  const role = decodedToken["role"];
  const [isUploading, setIsUploading] = useState(false);

  const toggleUpload = () => {
    setIsUploading((isUploading) => {
      return !isUploading;
    });
  };
  return (
    <>
      {role === "Root" || role === "Admin" ? (
        <>
          {isUploading ? (
            <Upload_Loading />
          ) : (
            <FileUploader toggleUpload={toggleUpload} />
          )}

          <Data />
        </>
      ) : (
        <AccessDeniedPage />
      )}
    </>
  );
};

export default DataPage;
