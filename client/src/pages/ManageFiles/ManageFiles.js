import React, {useEffect, useState} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import "./ManageFiles.css";

// page for viewing and deleting files
function ManageFiles() {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  // fetch file data
  async function fetchFiles() {
    setLoading(true);

    const results = await fetch(`${API_URL}/files`, {
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

  return (
    <div className="container file-page-container">

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Uploads
          </h4>
        </div>
      </div>

      <LoadingOverlay loading={loading} />

      <table className="file-table shadow">
        <thead>
          <tr>
            <th className="pl-5" style={{width: "10%"}}>
              Image
            </th>
            <th style={{width: "10%"}}>
              File Name
            </th>
            <th style={{width: "15%"}}>
              Source
            </th>
            <th style={{width: "20%"}}>
              Used on Website
            </th>
            <th style={{width: "15%"}}>
              User ID
            </th>
          </tr>
        </thead>
        <tbody>
          {icons.map((icon) =>
            <tr key={icon.iconType}>
              <td className="file-data pl-5">
                <i className={`fas fa-fw fa-${icon.typeName} mr-2`} style={{color: icon.color}}/>
              </td>
              <td className="file-data">
                {icon.iconType}
              </td>
              <td className="file-data">
                {icon.typeKeyword}
              </td>
              <td className="file-data">
                {icon.typeName}
              </td>
              <td className="file-data">
                {groupName(icon.groupIndex)}
              </td>
              <td className="file-data">
                {icon.color}
              </td>
              <td className="file-data text-left">
                [DELETE FILE]
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}
export default ManageFiles;
