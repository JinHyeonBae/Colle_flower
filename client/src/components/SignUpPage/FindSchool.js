import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

export default function FindSchool(props){
  const schools = [
    {
      "code" : "pknu",
      "name_kr" : "부경대학교",
      "name_en" : "pukyong national university"
    },
    {
      "code" : "pnu",
      "name_kr" : "부산대학교",
      "name_en" : "pusan national university"
    },
    {
      "code" : "ks",
      "name_kr" : "경성대학교",
      "name_en" : "kyungsung university"
    }
  ];
  const [schoolList, setSchoolList] = useState(schools);
  const [searchingName, setSearchingName] = useState('');
  
/*   //get All School Lists
  useEffect(()=>{
    //for test
    const schools = [
      {
        "code" : "pknu",
        "name_kr" : "부경대학교",
        "name_en" : "Pukyong National University"
      },
      {
        "code" : "pnu",
        "name_kr" : "부산대학교",
        "name_en" : "Pusan National University"
      },
      {
        "code" : "ks",
        "name_kr" : "경성대학교",
        "name_en" : "Kyungsung University"
      }
    ];
    setSchoolList(schools);
  },[]) */

  const onChangeHandler = (e) => {
    setSearchingName(e.target.value);
  }
  return(
    <div>
      <p>Finding School</p>
      <input
        placeholder="School Name" 
        value={searchingName}
        onChange={onChangeHandler}
      />
      <div id="schoolLists">
        <SchoolLists schoolList={schoolList} searchingName={searchingName} onClose={props.onClose}/>
      </div>
    </div>
  )
}

function SchoolLists(props){
  let lists=[];
  props.schoolList.forEach((school)=>{
      if(school.name_kr.indexOf(props.searchingName) !== -1 || school.name_en.indexOf(props.searchingName) !== -1){
        lists.push(<SchoolList key={school.code} school={school} onClose={props.onClose}/>)
      }
  })
  return lists;
}

function SchoolList(props) {
  const dispatch = useDispatch();
  const onClickHandler = (name) => {
    console.log(name);
    //dispatch selectSchool - Not Working!!!!!!!!!!!!
    /* dispatch(setUserSchool(name)); */
    props.onClose();
  }
  return(
      <div onClick={()=>onClickHandler(props.school.name_en)}>
        <p>{props.school.name_kr}</p>
        <p>{props.school.name_en}</p>
      </div>
  )
}