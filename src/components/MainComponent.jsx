import React, { useEffect, useState } from "react";
import DisplayCourses from "./DisplayCoursesComponent/DisplayCourses";
import Header from "./HeaderComponent/Header";
import axios from "axios";

export default function MainComponent() {
  //state for all courses
  const [allCourses, setCourses] = useState([]);

  //state for user search inputs
  const [searchDetails, setSearchDetails] = useState({
    course: "",
    childsubject: "",
    date: "",
    isSelfPaced: false,
  });
  //state for submitting user inputs
  const [submitFilterDetails, setSubmitFilterDetails] = useState({
    course: "",
    childsubject: "",
    date: "",
    isSelfPaced: false,
  });

  //extension=th/st/nd/rd
  let extenstion = "";

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    //added proxy in json file to deal with cors error
    axios
      .get("https://nut-case.s3.amazonaws.com/coursessc.json")
      .then((res) => {
        // console.log(res.data);


        //fetching only 500 cources
        setCourses(res.data.slice(0,500));
      })
      .catch((error) => console.log(error));
  }, []);

  //function to get user search inputs

  let getSearchDetails = (e) => {
    if (e.target.name === "course") {
      setSearchDetails({
        ...searchDetails,
        course: e.target.value,
      });
    } else if (e.target.name === "childsubject") {
      setSearchDetails({
        ...searchDetails,
        childsubject: e.target.value,
      });
    } else if (e.target.name === "date") {
      setSearchDetails({
        ...searchDetails,
        date: e.target.value,
      });
    } else if (e.target.name === "isSelfPaced") {
      setSearchDetails({
        ...searchDetails,
        isSelfPaced: !searchDetails.isSelfPaced,
      });
    }
  };

  //function to submit search inputs
  let submitDetails = (e) => {
    e.preventDefault();
    let finaldate = "";
    if (searchDetails.date) {
      //to convert object date into string date
      let date = JSON.stringify(searchDetails.date);
      //regex to remove unnecessary characters
      let trimDate = date.replace(/^"(.+)"$/, "$1");
      let year = trimDate.slice(0, 4);
      let month = trimDate.slice(5, 7);
      let day = trimDate.slice(8, 10);
      if (day === "01" || day === "21" || day === "31") {
        extenstion = "st";
      } else if (day === "2" || day === "22") {
        extenstion = "nd";
      } else if (day === "3" || day === "23") {
        extenstion = "rd";
      } else {
        extenstion = "th";
      }
      finaldate =
        day.concat(extenstion) +
        " " +
        monthNames[parseInt(month - 1)] +
        "," +
        " " +
        year;
    }


    //set date to empty if self paced is selected

    if (searchDetails.isSelfPaced) {
      setSubmitFilterDetails({
        course: searchDetails.course,
        childsubject: searchDetails.childsubject,
        date: "",
        isSelfPaced: searchDetails.isSelfPaced,
      });
    } 
     //set self paced  to false if date is selected
    else {
      setSubmitFilterDetails({
        course: searchDetails.course,
        childsubject: searchDetails.childsubject,
        date: finaldate,
        isSelfPaced: searchDetails.isSelfPaced,
      });
    }
    setSearchDetails({
      course: "",
      childsubject: "",
      date: "",
      isSelfPaced: false,
    });
  };
  return (
    <div>
      <DisplayCourses
        allCourses={allCourses}
        submitFilterDetails={submitFilterDetails}
      />
      <Header
        getSearchDetails={getSearchDetails}
        submitDetails={submitDetails}
        setSearchDetails={searchDetails}
      />
      {allCourses.length === 0 && <div className="loader"></div>}
    </div>
  );
}
