import React, {useEffect, useState} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import Sanitized from "../../components/General/Sanitized";
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom";
import "./ManageFiles.css";

// page for viewing and deleting files
function ManageFiles() {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userId} = useParams();

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line
  }, []);

  // fetch file data
  async function fetchFiles() {
    setLoading(true);

    const results = await fetch(`${API_URL}/files/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const obj = await results.json();
      setFiles(obj.files);

    } else {
      console.error("Error fetching files");
    }

    setLoading(false);
  }

  // delete a file
  async function deleteFile(name) {
    if (!window.confirm("Are you sure you want to delete this file?")) {
      return;
    }

    // attempt to delete the file
    const results = await fetch(`${API_URL}/files/${userId}/${name}`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {
      // refresh the page
      window.location.reload();
    } else {
      alert("Error deleting file. Please try again later.");
    }

  }

  return (
    <div className="container file-page-container mb-5">

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Images
          </h4>
        </div>
      </div>

      <LoadingOverlay loading={loading} />

      <table className="file-table shadow">
        <thead>
          <tr>
            <th className="pl-5" style={{width: "15%"}}>
              Image
            </th>
            <th style={{width: "30%"}}>
              File Name
            </th>
            <th style={{width: "30%"}}>
              Source
            </th>
            <th style={{width: "5%"}}>
              Used on Website
            </th>
            <th style={{width: "5%"}}>
              User ID
            </th>
            <th style={{width: "15%"}}>
              Delete File
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) =>
            <tr key={file.userId + file.name}>
              <td className="file-data pl-5 align-top">
                <img className="file-thumb" src={file.url} alt="uploaded file" />
              </td>
              <td className="file-data align-top">
                {file.name}
              </td>
              <td className="file-data-source align-top">
                <Sanitized html={file.source} />
              </td>
              <td className="file-data align-top">
                {file.used}
              </td>
              <td className="file-data align-top">
                {file.userId}
              </td>
              <td className="file-data text-left align-top">
                <Button className="mx-1" variant="danger" onClick={() => deleteFile(file.name)}>
                  Delete File
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}
export default ManageFiles;
