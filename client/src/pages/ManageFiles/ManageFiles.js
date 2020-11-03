import React, {useEffect, useState, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import Sanitized from "../../components/General/Sanitized";
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom";
import Image from "../../components/General/Image";
import LoadMoreButton from "../../components/General/LoadMoreButton";
import "./ManageFiles.css";

// page for viewing and deleting files
function ManageFiles() {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userId} = useParams();
  const [cursor, setCursor] = useState("null");
  const [changeLoadMore, setChangeLoadMore] = useState(false);
  const [searchFields, setSearchFields] = useState({
    sortValue: 0,
    orderValue: 1
  });

  // get all of the file information when the page loads,
  // when a change is made, or when the user scrolls to the bottom of the screen
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchFiles(cursor) {
      try {

        setLoading(true);
        const sortValue = searchFields.sortValue;
        const orderValue = searchFields.orderValue;

        // construct the request body
        const postObj = {
          sort: sortValue,
          order: orderValue,
          cursor: cursor,
        };

        const results = await fetch(`${API_URL}/files/${userId}`, {
          signal: controller.signal,
          method: "POST",
          credentials: "include",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(postObj)
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {

          const obj = await results.json();

          if (cursor === "null") {
            setFiles([...obj.files]);
          } else {
            setFiles([...files, ...obj.files]);
          }
          setCursor(obj.nextCursor);

        } else {
          setFiles([]);
          console.error("Error fetching files");
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

    fetchFiles(cursor);

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
    // eslint-disable-next-line
  }, [searchFields.orderValue, searchFields.sortValue, changeLoadMore]);

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

  // updates the sorting order of the table columns
  function changeSort(sortValue, alternateOrder) {
    if (alternateOrder) {
      setCursor("null");
      setSearchFields({
        sortValue: sortValue,
        orderValue: 1 - searchFields.orderValue
      });
    } else {
      setCursor("null");
      setSearchFields({
        sortValue: sortValue,
        orderValue: 1
      });
    }
  }

  return (
    <div className="container file-page-container text-center my-5">

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Images
          </h4>
        </div>
      </div>

      <LoadingOverlay loading={loading} />

      {files.length ? (
        <Fragment>
          <table className="file-table shadow text-left">
            <thead>
              <tr>
                <th className="pl-5" style={{width: "15%"}}>
                  Image
                </th>
                {searchFields.sortValue === 0 ? (
                  <th className="active-sort" style={{width: "30%"}} onClick={() => changeSort(0, true)}>
                    File Name <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                  </th>
                ) : (
                  <th style={{width: "30%"}} onClick={() => changeSort(0, false)}>
                    File Name <small>▼</small>
                  </th>
                )}
                {searchFields.sortValue === 1 ? (
                  <th className="active-sort" style={{width: "30%"}} onClick={() => changeSort(1, true)}>
                    Source <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                  </th>
                ) : (
                  <th style={{width: "30%"}} onClick={() => changeSort(1, false)}>
                    Source <small>▼</small>
                  </th>
                )}
                {searchFields.sortValue === 2 ? (
                  <th className="active-sort" style={{width: "5%"}} onClick={() => changeSort(2, true)}>
                    Used on Website <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                  </th>
                ) : (
                  <th style={{width: "5%"}} onClick={() => changeSort(2, false)}>
                    Used on Website <small>▼</small>
                  </th>
                )}
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
                    <Image
                      url={file.url}
                      title={file.name}
                      thumbnail={false}
                      header={true}
                    />
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
          {cursor === "null" ? (
            null
          ) : (
            <LoadMoreButton
              onUpdate={() => setChangeLoadMore(!changeLoadMore)}
              loading={loading}
            />
          )}
        </Fragment>
      ) : (
        <div className="table-container">
          <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
            <h3 className="py-5 font-weight-bold">This user has not uploaded any images</h3>
          </div>
        </div>
      )}
    </div>
  );
}
export default ManageFiles;
