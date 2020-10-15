import React, {useEffect, useState} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import EditIcons from "./EditIcons";
import CreateIcon from "./CreateIcon";
import "./ManageIcons.css";

// page for viewing, editing, and creating icons to be used with items
function ManageIcons() {

  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [iconsChanged, setIconsChanged] = useState(false);

  // get icon data when the page loads or when a change is made
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchIcons() {
      try {

        setLoading(true);

        // Fetch all icons
        const results = await fetch(`${API_URL}/icons/all`, {
          signal: controller.signal,
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {

          const obj = await results.json();

          obj.icons.sort((a, b) => a.iconType - b.iconType);

          setIcons(obj.icons);

        } else {
          console.error("Error fetching icon list");
        }

        setLoading(false);

      } catch (err) {
        if (err instanceof DOMException) {
          if (process.env.NODE_ENV === "development") {
            console.log("HTTP request aborted");
          }
        } else {
          throw err;
        }
      }
    }

    fetchIcons();

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [iconsChanged]);

  // convert icon group number to string
  function groupName(category) {
    if (category === 1) {
      return "Item";
    } else if (category === 2) {
      return "Graphic";
    } else if (category === 3) {
      return "Site Resource";
    } else {
      return "Inactive";
    }
  }

  return (
    <div className="container icon-page-container">

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Icons
          </h4>
        </div>
      </div>

      <LoadingOverlay loading={loading} />

      <table className="icon-table shadow">
        <thead>
          <tr>
            <th className="pl-5" style={{width: "10%"}}>
              Icon
            </th>
            <th style={{width: "10%"}}>
              ID
            </th>
            <th style={{width: "15%"}}>
              Name
            </th>
            <th style={{width: "20%"}}>
              Font Awesome Name
            </th>
            <th style={{width: "15%"}}>
              Category
            </th>
            <th style={{width: "15%"}}>
              Color Code
            </th>
            <th style={{width: "15%"}}>
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {icons.map((icon) =>
            <tr key={icon.iconType}>
              <td className="icon-data pl-5">
                <i className={`fas fa-fw fa-${icon.typeName} mr-2`} style={{color: icon.color}}/>
              </td>
              <td className="icon-data">
                {icon.iconType}
              </td>
              <td className="icon-data">
                {icon.typeKeyword}
              </td>
              <td className="icon-data">
                {icon.typeName}
              </td>
              <td className="icon-data">
                {groupName(icon.groupIndex)}
              </td>
              <td className="icon-data">
                {icon.color}
              </td>
              <td className="icon-data text-left">
                <EditIcons icon={icon} handleUpdate={() => setIconsChanged(!iconsChanged)} />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <CreateIcon handleUpdate={() => setIconsChanged(!iconsChanged)} />

    </div>
  );
}
export default ManageIcons;
