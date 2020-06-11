import React, {useEffect, useState} from "react";
import UserSearchForm from "../components/UserSearchForm";
import UserSearchResults from "../components/UserSearchResults";
import LoadingOverlay from "../components/LoadingOverlay";
import Container from "react-bootstrap/Container";
import {logout} from "../utilities/cookieAuth";

// manage users page
function ManageUsers(props) {

  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchFields, setSearchFields] = useState({
    textValue: "*",
    roleValue: 0
  });
  const [cursor, setCursor] = useState({
    primary: "null",
    secondary: "null"
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

  // search for users
  async function searchUsers(cursor, newSearch) {
    try {
      setErrorMessage("");
      setUserLoading(true);

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
          roleValue: roleValue
        });
      } else {
        textValue = searchFields.textValue;
        roleValue = searchFields.roleValue;
      }

      // construct the request url
      const getUrl = `/users/search/${textValue}/${roleValue}` +
        `/${cursor.primary}/${cursor.secondary}`;
      let obj = [];

      // get our search results
      const results = await fetch(getUrl);

      if (results.ok) {

        // if the cursor is new then we will want to relist users
        obj = await results.json();

        if (cursor.primary === "null") {
          setUsers([...obj.users]);
        } else {
          setUsers([...users, ...obj.users]);
        }
        setCursor(obj.nextCursor);

      } else {

        obj = await results.json();

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
    } catch (err) {
      // show error message if error while searching
      setErrorMessage("An internal server error occurred. Please try again later.");
    }
    setUserLoading(false);
  }

  return (
      <Container>
        <LoadingOverlay loading={loading} />

        <div id="user-manage-container">
          <div id="user-manage-contents-container">

            <UserSearchForm onSearch={cursor => searchUsers(cursor, true)}/>

            <UserSearchResults users={users} cursor={cursor} loading={loading}
              onLoading={load => setMoreLoading(load)} error={errorMessage}
              onLoadMore={cursor => searchUsers(cursor, false)} />

          </div>
        </div>
      </Container>
  );

}
export default ManageUsers;