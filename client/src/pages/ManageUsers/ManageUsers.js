import React, {useEffect, useState} from "react";
import UserSearchForm from "./UserSearchForm";
import UserSearchResults from "./UserSearchResults";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import Container from "react-bootstrap/Container";
import {logout} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";

// manage users page
function ManageUsers() {

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchFields, setSearchFields] = useState({
    textValue: "*",
    roleValue: 0,
    sortValue: 0,
    orderValue: 1
  });
  const [cursor, setCursor] = useState({
    primary: "null",
    secondary: "null"
  });
  const [request, setRequest] = useState ({
    primary: "null",
    secondary: "null",
    new: false
  });

  // track the loading state of multiple page components and
  // display a spinner if any part of the page is still loading
  useEffect(() => {
    if (userLoading || moreLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [userLoading, moreLoading]);

  // listen for new search requests and perform a new search when one arrives
  useEffect(() => {

    // search for users
    async function searchUsers(cursor, newSearch) {
      setErrorMessage("");
      setUserLoading(true);
      const sortValue = searchFields.sortValue;
      const orderValue = searchFields.orderValue;

      // get the search text from the search field
      let textValue = document.getElementById("input-search-user").value;

      // if search text is empty we use a special char to represent
      // any text response as valid
      if (textValue === "") {
        textValue = "*";
      }

      // get the role from the role select
      const roleSelect = document.getElementById("select-role");
      let roleValue = roleSelect.options[roleSelect.selectedIndex].value;

      // only set the search values if we are performing a new search
      if (newSearch) {

        setSearchFields({
          textValue: textValue,
          roleValue: roleValue,
          sortValue: sortValue,
          orderValue: orderValue
        });

      } else {
        textValue = searchFields.textValue;
        roleValue = searchFields.roleValue;
      }

      // construct the request url
      const getUrl = `${API_URL}/users/search/${textValue}/${roleValue}/` +
        `${sortValue}/${orderValue}/${cursor.primary}/${cursor.secondary}`;

      // get our search results
      const results = await fetch(getUrl, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
      });

      if (results.ok) {

        // if the cursor is new then we will want to relist users
        const obj = await results.json();

        if (cursor.primary === "null") {
          setUsers([...obj.users]);
        } else {
          setUsers([...users, ...obj.users]);
        }
        setCursor(obj.nextCursor);

      } else {

        const obj = await results.json();

        // there was an error while attempting to search
        if (results.status === 404) {
          setErrorMessage("No matching users found.");
          setUsers([]);
        } else if (results.status === 500 || typeof obj.error === "undefined") {
          setErrorMessage("An internal server error occurred. Please try again later.");
        } else {
          console.error(obj.error);
          setErrorMessage(obj.error);
        }

        // if the user is performing an unauthorized action
        // log them out and return them to the homepage
        if (results.status === 401) {
          logout();
          window.location.href = "/";
        }

      }
      setUserLoading(false);
    }

    // don't load search results on the initial mount
    if (mounted) {
      const newCursor = {
        primary: request.primary,
        secondary: request.secondary
      };
      searchUsers(newCursor, request.new);
    } else {
      setMounted(true);
    }

    // eslint-disable-next-line
  }, [request]);

  // initiate a new search request when the sorting order changes
  useEffect(() => {

    if (mounted) {
      setRequest({
        primary: "null",
        secondary: "null",
        new: true
      });
    }

    // eslint-disable-next-line
  }, [searchFields.orderValue, searchFields.sortValue]);

  // update the sorting rules
  function handleChangeSort(sort, order) {

    setSearchFields ({
      textValue: searchFields.textValue,
      roleValue: searchFields.roleValue,
      sortValue: sort,
      orderValue: order
    });

  }

  // initiates a new user search
  function callSearch(newCursor, newSearch) {
    setRequest({
      primary: newCursor.primary,
      secondary: newCursor.secondary,
      new: newSearch
    });
  }

  return (
    <Container>
      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Users
          </h4>
        </div>
      </div>

      <div id="user-manage-container">
        <div id="user-manage-contents-container">

          <UserSearchForm onSearch={cursor => callSearch(cursor, true)}/>

          <UserSearchResults users={users} cursor={cursor} loading={loading}
            onChangeSort={(sort, order) => handleChangeSort(sort, order)}
            onLoading={load => setMoreLoading(load)} error={errorMessage}
            onLoadMore={cursor => callSearch(cursor, false)}
            searchFields={searchFields}
          />

        </div>
      </div>
    </Container>
  );

}
export default ManageUsers;