import React from "react";

export default function Header({
  getSearchDetails,
  submitDetails,
  setSearchDetails,
}) {
  return (
    <div>
      <div className="navbar">
        <div className="title">
          <h1> Course Finder</h1>
        </div>
        <div className="header">
          <div className="input">
            <div>
              <i className="fas fa-book-open"></i>
              <input
                type="text"
                name="course"
                onChange={(e) => getSearchDetails(e)}
                value={setSearchDetails.course}
                placeholder="Course"
              />
            </div>
            <div>
              <i className="fas fa-chalkboard-teacher"></i>
              <input
                type="text"
                name="childsubject"
                onChange={(e) => getSearchDetails(e)}
                value={setSearchDetails.childsubject}
                placeholder="Child Subject"
              />
            </div>
            <div>
              <i className="fas fa-calendar-week"></i>
              <input
                type="date"
                name="date"
                id="date"
                onChange={(e) => {
                  getSearchDetails(e);
                }}
              />
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="isSelfPaced"
                onChange={(e) => {
                  getSearchDetails(e);

                //disabling date if self paced is selected   
                  let date = document.getElementById("date");
                  if (!setSearchDetails.isSelfPaced) {
                    date.disabled = true;
                    date.value = "";
                  } else {
                    date.disabled = false;
                  }
                }}
                checked={setSearchDetails.isSelfPaced}
              />
              <h3>Self Paced</h3>
            </div>
            <div style={{ boxShadow: "none" }}>
              <button
                onClick={(e) => {
                  submitDetails(e);
                  let date = document.getElementById("date");
                  date.value = "";
                  date.disabled = false;
                  // date.value=''
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
