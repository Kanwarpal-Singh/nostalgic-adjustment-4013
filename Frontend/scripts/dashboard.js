

let data = [

    {
    "_id": "648c32bf6c3782a189731d43",
    "title": "The Complete Data Analyst Bootcamp",
    "course": "Data Analyst",
    "description": "The course provides the complete preparation you need to become a data analyst.\r\nFill up your resume with in-demand data skills: Python programming, NumPy, pandas, data preparation - data collection, data cleaning, data preprocessing, data visualization; data analysis, data analytics\r\nAcquire a big-picture understanding of the data analyst role.\r\nLearn beginner and advanced Python.\r\nStudy mathematics for Python.\r\nWe will teach you NumPy and pandas, basics, and advanced.",
    "language": "English",
    "creatorId": "641c32bf6c3782a189731d43",
    "creatorName": "dummy",
    "content": [
      {
        "videoName": "videos/Dataanalyst-Video-1.m4v",
        "videoUrl": "https://course-craft-videos.s3.ap-south-1.amazonaws.com/videos/Dataanalyst-Video-1.m4v?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATEUVAXTOSYIGSTWW%2F20230616%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230616T100031Z&X-Amz-Expires=432000&X-Amz-Signature=96bbdcba1657e72b881fff90ed0f4c33f13a9951312f2f7cc7cb23688f6c3cdd&X-Amz-SignedHeaders=host&x-id=GetObject",
        "postedAt": "2023-06-16T09:59:40.854Z",
        "shares": 0,
        "thumbnailName": "images/DataAnalyst.png",
        "thumbnailURL": "https://course-craft-videos.s3.ap-south-1.amazonaws.com/images/DataAnalyst.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATEUVAXTOSYIGSTWW%2F20230616%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230616T100031Z&X-Amz-Expires=432000&X-Amz-Signature=c08cf26abccc93ff74fe2bbe5d3ccc23c9d8d7af875d7e37b5ccaa438d903e60&X-Amz-SignedHeaders=host&x-id=GetObject",
        "_id": "648c32bf6c3782a189731d44",
        "likedBy": [
          
        ],
        "comments": [
          
        ]
      }
    ]
  } 
]
    





// window.onload("load",()=>{


    // getData()



 





// })


// async function getData(){

//     try{
//         // let data = await  fetch("http://13.233.69.180:3000/api/getcourse/641c32bf6c3782a189731d43")

//         data = await data.json();

//         // displayData(data)
//     }

//     catch(err){
//         console.log(err)
//     }
   

// }

// http://13.233.69.180:3000/api/getcourse/641c32bf6c3782a189731d43




displayData(data)

function displayData(data){
console.log(data)



document.querySelector("#main-section").innerHTML = null;

data.forEach((el)=>{

let card = document.createElement("div")
card.setAttribute("class","display-content")



let image = document.createElement("img");

image.setAttribute("src",el.content[0].thumbnailURL)

image.addEventListener("click",(e)=>{
    e.preventDefault()
    clickevent( el.content[0].videoUrl, el.content[0].videoName)
})


let title = document.createElement("h3")

title.innerText = el.title;


let owner = document.createElement("h3")
owner.innerText = el.creatorName;

let createdDate  = document.createElement("h3")
createdDate.innerText = el.content[0].postedAt;


card.append(image,title,owner,createdDate)


document.querySelector("#main-section").append(card);


})



}






function clickevent(url,name){



localStorage.setItem("videoURL",url)
localStorage.setItem("videoName",name)

window.location.href = "./content.html"


}