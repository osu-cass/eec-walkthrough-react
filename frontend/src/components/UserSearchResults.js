import React from "react";
import {withRouter} from "react-router-dom";
import UserSelectRole from "./UserSelectRole";
import PropTypes from "prop-types";
import LoadMoreButton from "./LoadMoreButton";
import "./UserSearchResults.css";

// search results for a user search
function UserSearchResults(props) {

  if (props.users.length) {
    return (
      <div className="table-container">
        <table className="user-table shadow">
          <thead>
            <tr>
              <th className="user-data">username</th>
              <th className="user-data">Name</th>
              <th className="user-data">User ID</th>
              <th className="user-data">Email</th>
              <th className="user-data">Role</th>
            </tr>
          </thead>
          <tbody>
            {props.users.map((user, index) =>
              <tr key={user.userId}>
                <td className="user-data" key={user.userId + "a"}>
                  {user.username}
                </td>
                <td className="user-data" key={user.userId + "b"}>
                  {user.firstName + " " + user.lastName}
                </td>
                <td className="user-data" key={user.userId + "c"}>{user.userId}</td>
                <td className="user-data" key={user.userId + "d"}>{user.email}</td>
                <td className="user-data" key={user.userId + "e"}>
                  <UserSelectRole role={user.role} userId={user.userId} index={index}
                    username={user.firstName + " " + user.lastName} onLoading={load => props.onLoading(load)} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {props.cursor.primary === "null" ? (
          null
        ) : (
          <LoadMoreButton onUpdate={() => props.onLoadMore(props.cursor)}
            loading={props.loading} />
        )}
      </div>
    );
  } else {
    return (
      <div className="table-container">
        <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
          { props.error === "" ? (
            <h3 className="py-5 font-weight-bold">Search for users...</h3>
          ) : (
            <h3 className="py-5 font-weight-bold">{props.error}</h3>
          )}
        </div>
      </div>
    );
  }

}
export default withRouter(UserSearchResults);

UserSearchResults.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  history: PropTypes.object,
  users: PropTypes.array,
  cursor: PropTypes.object,
  onLoadMore: PropTypes.func,
  onLoading: PropTypes.func
};