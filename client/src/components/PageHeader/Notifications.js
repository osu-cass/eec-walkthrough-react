import React, {useState, useEffect, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {API_URL} from "../../utilities/constants";
import "./Notifications.css";

// Displays any new notifications for the current user
function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const [jiggle, setJiggle] = useState(false);
  const TIME_BETWEEN_NOTIFICATIONS = 5000;

  // Whenever the number of notifications change, see if we should perform a 
  // jiggle animation to get the users attention
  useEffect(() => {
    if (notifications.length) {
      setJiggle(true);
    } else {
      setJiggle(false);
    }
  }, [notifications.length]);

  // Fetch new notifications when the page first loads or when enough time passes
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    // get all notifications for the current user
    async function fetchNotifications() {
      try {

        // get notifications data
        const results = await fetch(`${API_URL}/notifications`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"
      });

        // before checking the results, ensure the request was not canceled
        if (!ignore) {

          if (results.ok) {
            const obj = await results.json();
            setNotifications(obj.notifications);
          } else {
            setNotifications([]);
          }
        }

      } catch (err) {
        if (err instanceof DOMException) {
          if (process.env.NODE_ENV === "development") {
            console.log("HTTP request aborted");
          }
        } else {
          throw err;
        }
      }

      // after the notifications are returned or fail set a timer to try again
      setTimeout(fetchNotifications, TIME_BETWEEN_NOTIFICATIONS);

    }

    fetchNotifications();

    // clean up function
    return () => {
      controller.abort();
      ignore = true;
    };
  }, []);

  // clear a specific notification
  async function clearNotification(notificationId, index) {
    try {
      // delete the notification
      await fetch(`${API_URL}/notifications/${notificationId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
      });

      // delete the notification on the client-side
      const newNotifications = notifications.slice();
      newNotifications.splice(index, 1);
      setNotifications(newNotifications);

    } catch (err) {
      // log server error, if it happens while fetching notifications
      console.error("An internal server error occurred. Please try again later.");
    }
  }

  // handle clicking on a notification
  function handleClick(event, item, index) {
    // only link to another page if the notification is
    // intended to be used as a link
    if (!item.type) {
      event.preventDefault();
    }

    // remove the notification from the drop down
    // menu of unseen notifications
    clearNotification(item.notificationId, index);
  }

  return (
    <div
      className={`notification-dropdown dropdown`}
      id="user-navbar-icon-container"
      onMouseEnter={() => setJiggle(false)}
    >

      <button
        className={`btn ml-4 ${jiggle ? "jiggle" : ""} ${notifications.length ? "btn-active-note" : "btn-dark"}`}
        type="button"
        id="note-navbar-icon-drp"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >

        <div className="d-flex align-items-center font-weight-bold">
          <div className="user-icon-container text-white mx-3">
          {notifications.length ? (
            <span className="dark-note-text">{notifications.length}</span>
          ) : (
            <i className="fas fa-fw fa-bell fa-lg" />
          )}
          </div>
        </div>
      </button>

      <div
        className="note-dropdown-menu dropdown-menu dropdown-menu-left"
        aria-labelledby="dropdownMenuButton"
      >
        {notifications.length ? (
          <Fragment>
            {notifications.map((item, index) =>
              <Link
                key={item.notificationId}
                to={`/publish-requests/${item.requestId}`}
                onClick={(event) => handleClick(event, item, index)}
              >
                <div className="dropdown-item note-item">
                  {item.text}
                </div>
              </Link>
            )}
          </Fragment>
        ) : (
          <Link to={`.`} onClick={(event) => event.preventDefault()}>
            <div className="dropdown-item note-item">
              No new notifications
            </div>
          </Link>
        )}
      </div>

    </div>
  );

}
export default withRouter(Notifications);
