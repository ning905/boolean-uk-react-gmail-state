import { useState } from "react";
import { Email } from "./components/Email";
import Header from "./components/header";

import initialEmails from "./data/emails";

import "./styles/app.css";

function App() {
  // Use initialEmails for state
  const [gmail, setGmail] = useState({
    allEmails: initialEmails,
    filters: [],
    filteredEmails: initialEmails,
    activeTab: "inbox",
  });

  const getUnreadEmails = (emails) => {
    const unreadEmails = emails.filter((email) => !email.read);
    return unreadEmails;
  };

  const getStarredEmails = (emails) => {
    const starredEmails = emails.filter((email) => email.starred);
    return starredEmails;
  };

  const filterEmails = () => {
    let filtered = [...gmail.allEmails];
    if (gmail.filters.includes("starred")) {
      filtered = getStarredEmails(filtered);
    }
    if (gmail.filters.includes("unread")) {
      filtered = getUnreadEmails(filtered);
    }
    console.log(filtered);
    return filtered;
  };

  const toggleRead = (id) => {
    const updatedEmails = gmail.allEmails.map((email) =>
      email.id === id ? { ...email, read: !email.read } : email
    );

    gmail.allEmails = updatedEmails;

    setGmail({
      ...gmail,
      // allEmails: updatedEmails,
      filteredEmails: filterEmails(),
    });
  };

  const toggleStar = (id) => {
    const updatedEmails = gmail.allEmails.map((email) =>
      email.id === id ? { ...email, starred: !email.starred } : email
    );

    gmail.allEmails = updatedEmails;

    setGmail({
      ...gmail,
      filteredEmails: filterEmails(),
    });
  };

  const toggleHideReadEmails = (e) => {
    const checked = e.target.checked;

    if (checked) {
      gmail.filters = [...gmail.filters, "unread"];
      setGmail({
        ...gmail,
        filteredEmails: filterEmails(),
      });
    } else {
      gmail.filters = [gmail.filters.filter((filter) => !filter === "unread")];
      setGmail({
        ...gmail,
        filteredEmails: filterEmails(),
      });
    }
    console.log("gmail", gmail);
  };

  const getInbox = (event) => {
    gmail.filters = [gmail.filters.filter((filter) => !filter === "starred")];
    setGmail({
      ...gmail,
      activeTab: "inbox",
      filteredEmails: filterEmails(),
    });
  };

  const getStarredInbox = (event) => {
    console.log(event.target.classList);
    gmail.filters = [...gmail.filters, "starred"];
    setGmail({
      ...gmail,
      activeTab: "starred",
      filteredEmails: filterEmails(),
    });
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={gmail.activeTab === "inbox" ? "item active" : "item"}
            onClick={getInbox}
          >
            <span className="label">Inbox</span>
            <span className="count">{gmail.allEmails.length}</span>
          </li>
          <li
            className={gmail.activeTab === "starred" ? "item active" : "item"}
            onClick={getStarredInbox}
          >
            <span className="label">Starred</span>
            <span className="count">
              {getStarredEmails(gmail.allEmails).length}
            </span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              onChange={toggleHideReadEmails}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {gmail.filteredEmails.map((email) => (
            <Email
              key={email.id}
              id={email.id}
              sender={email.sender}
              title={email.title}
              read={email.read}
              starred={email.starred}
              toggleRead={toggleRead}
              toggleStar={toggleStar}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
