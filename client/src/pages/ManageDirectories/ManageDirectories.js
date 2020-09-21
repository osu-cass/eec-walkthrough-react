import React, {useEffect, useState} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import Button from "react-bootstrap/Button";
import "./ManageDirectories.css";

// page for viewing user  deleting files
function ManageDirectories() {

  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  // fetch directory data
  async function fetchFiles() {
    setLoading(true);

    const results = await fetch(`${API_URL}/files/directories`, {
      method: "GET",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const obj = await results.json();
      setDirectories(obj.directories);

    } else {
      console.error("Error fetching files");
    }

    setLoading(false);
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
            <th className="pl-5" style={{width: "30%"}}>
              User
            </th>
            <th style={{width: "20%"}}>
              User ID
            </th>
            <th style={{width: "25%"}}>
              Number of files
            </th>
            <th style={{width: "25%"}}>
              View Files
            </th>
          </tr>
        </thead>
        <tbody>
          {directories.map((directory) =>
            <tr key={directory.userId}>
              <td className="file-data pl-5 align-top">
                {directory.name}
              </td>
              <td className="file-data align-top">
                {directory.userId}
              </td>
              <td className="file-data-source align-top">
                {directory.fileCount}
              </td>
              <td className="file-data text-left align-top">
                <Button className="mx-1" variant="danger" onClick={() => {}}>
                  View Files
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}
export default ManageDirectories;
