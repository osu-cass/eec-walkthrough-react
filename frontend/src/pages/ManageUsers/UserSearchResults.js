import React from "react";
import {withRouter} from "react-router-dom";
import {formatTime} from "../../utilities/formatTime";
import UserSelectRole from "./UserSelectRole";
import GeneratePassword from "./GeneratePassword";
import PropTypes from "prop-types";
import LoadMoreButton from "../../components/General/LoadMoreButton";
import "./UserSearchResults.css";

// search results for a user search
function UserSearchResults(props) {

  // updates the sorting order of the search results
  function changeSort(sortValue, alternateOrder) {
    if (alternateOrder) {
      props.onChangeSort(sortValue, 1 - props.searchFields.orderValue);
    } else {
      props.onChangeSort(sortValue, 1);
    }
  }

  if (props.users.length) {
    return (
      <div className="table-container">
        <table className="user-table shadow">
          <thead>
            <tr>
              {props.searchFields.sortValue === 0 ? (
                <th className="student-plans-data active-sort" onClick={() => changeSort(0, true)} style={{width: "18%"}}>
                  Username <small>{props.searchFields.orderValue ? "▲" : "▼" }</small>
                </th>
              ) : (
                <th className="student-plans-data" onClick={() => changeSort(0, false)} style={{width: "18%"}}>
                  Username <small>▼</small>
                </th>
              )}
              {props.searchFields.sortValue === 1 ? (
                <th className="student-plans-data active-sort" onClick={() => changeSort(1, true)} style={{width: "18%"}}>
                  Name <small>{props.searchFields.orderValue ? "▲" : "▼" }</small>
                </th>
              ) : (
                <th className="student-plans-data" onClick={() => changeSort(1, false)} style={{width: "18%"}}>
                  Name <small>▼</small>
                </th>
              )}
              {props.searchFields.sortValue === 2 ? (
                <th className="student-plans-data active-sort" onClick={() => changeSort(2, true)} style={{width: "10%"}}>
                  User ID <small>{props.searchFields.orderValue ? "▲" : "▼" }</small>
                </th>
              ) : (
                <th className="student-plans-data" onClick={() => changeSort(2, false)} style={{width: "8%"}}>
                  User ID <small>▼</small>
                </th>
              )}
              {props.searchFields.sortValue === 3 ? (
                <th className="student-plans-data active-sort" onClick={() => changeSort(3, true)} style={{width: "18%"}}>
                  Email <small>{props.searchFields.orderValue ? "▲" : "▼" }</small>
                </th>
              ) : (
                <th className="student-plans-data" onClick={() => changeSort(3, false)} style={{width: "18%"}}>
                  Email <small>▼</small>
                </th>
              )}
              {props.searchFields.sortValue === 4 ? (
                <th className="student-plans-data active-sort" onClick={() => changeSort(4, true)} style={{width: "18%"}}>
                  Created <small>{props.searchFields.orderValue ? "▲" : "▼" }</small>
                </th>
              ) : (
                <th className="student-plans-data" onClick={() => changeSort(4, false)} style={{width: "18%"}}>
                  Created <small>▼</small>
                </th>
              )}
              {props.searchFields.sortValue === 5 ? (
                <th className="student-plans-data active-sort" onClick={() => changeSort(5, true)} style={{width: "15%"}}>
                  Role <small>{props.searchFields.orderValue ? "▲" : "▼" }</small>
                </th>
              ) : (
                <th className="student-plans-data" onClick={() => changeSort(5, false)} style={{width: "14%"}}>
                  Role <small>▼</small>
                </th>
              )}
              <th className="student-plans-data"style={{width: "9%"}}>
                  Password
              </th>
            </tr>
          </thead>
          <tbody>
            {props.users.map((user, index) =>
              <tr key={user.userId}>
                <td className="user-data">
                  {user.username}
                </td>
                <td className="user-data">
                  {user.firstName + " " + user.lastName}
                </td>
                <td className="user-data">
                  {user.userId}
                </td>
                <td className="user-data">
                  {user.email}
                </td>
                <td className="user-data">
                  {formatTime(user.created)}
                </td>
                <td className="user-data">
                  <UserSelectRole role={user.role} userId={user.userId} index={index}
                    username={user.username} onLoading={load => props.onLoading(load)}
                  />
                </td>
                <td className="user-data">
                  <GeneratePassword role={user.role} userId={user.userId}
                    username={user.username} onLoading={load => props.onLoading(load)}
                  />
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
  searchFields: PropTypes.object,
  onLoadMore: PropTypes.func,
  onChangeSort: PropTypes.func,
  onLoading: PropTypes.func
};