export default function displayCourses({ allCourses, submitFilterDetails }) {

  let filterCourses = allCourses;
  //handling filter conditions  
  if (
    submitFilterDetails.date ||
    submitFilterDetails.course ||
    submitFilterDetails.childsubject ||
    submitFilterDetails.isSelfPaced
  ) {
    if (submitFilterDetails.date) {
      filterCourses = filterCourses.filter((course) => {
        console.log(typeof course["Next Session Date"]);

        return (
          course["Next Session Date"]
            .toString()
            .indexOf(submitFilterDetails.date) !== -1
        );
      });
    }
    if (submitFilterDetails.course) {
      filterCourses = filterCourses.filter((course) => {
        return (
          course["Course Name"]
            .toString()
            .toLowerCase()
            .indexOf(submitFilterDetails.course.toLowerCase()) !== -1
        );
      });
    }

    if (submitFilterDetails.childsubject) {
      filterCourses = filterCourses.filter((childsubject) => {
        return (
          childsubject["Child Subject"]
            .toString()
            .toLowerCase()
            .indexOf(submitFilterDetails.childsubject.toLowerCase()) !== -1
        );
      });
    }

    if (submitFilterDetails.isSelfPaced) {
      filterCourses = filterCourses.filter((isSelfPaced) => {
        return (
          isSelfPaced["Next Session Date"]
            .toString()
            .toLowerCase()
            .indexOf("Self paced".toLowerCase()) !== -1
        );
      });
    }
  }

  //function to render all courses
  let renderAllCourses = () => {
    return filterCourses.map((course) => {
      return (
        <div
          className="course-card"
          onClick={() => window.open(course.Url)}
          key={course["Course Id"]}
        >
          <div className="card-body">
            <div className="card-body-title">
              <ul>
                <li>{course["Course Id"]}</li>
              </ul>
              {/* <span>Next Session Date</span> */}
              {course["Next Session Date"] && (
                <p>
                  
                  <i className="fas fa-calendar-alt"></i>
                  {course["Next Session Date"]}
                </p>
              )}
            </div>
            <span>Provider</span>
            <h3>{course.Provider}</h3>
            <span>Course Name</span>
            <h4>{course["Course Name"]}</h4>
            <div className="details">
              <span>
                {course["Universities/Institutions"]
                  ? "Universities/Institutions"
                  : ""}
              </span>
              <h4>{course["Universities/Institutions"]}</h4>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span>
                    {course["Parent Subject"] ? "Parent Subject" : ""}
                  </span>
                  <h5>{course["Parent Subject"]}</h5>
                </div>
                <div style={{ marginRight: "5px" }}>
                  <span>{course["Child Subject"] ? "Child Subject" : ""}</span>
                  <h5>{course["Child Subject"]}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {filterCourses.length !== 0 && (
        <div className="count">
          <h3>
            Courses Found : <span>{filterCourses.length} </span>
          </h3>
        </div>
      )}
      <div className="courses-container">{renderAllCourses()}</div>
      {(submitFilterDetails.date ||
        submitFilterDetails.course ||
        submitFilterDetails.childsubject ||
        submitFilterDetails.isSelfPaced) &&
        filterCourses.length === 0 && (
          <div id="loader">
            <h1>No courses found try diffrent filter....</h1>
          </div>
        )}
        {/* {console.log(submitFilterDetails)} */}
    </div>
  );
}
