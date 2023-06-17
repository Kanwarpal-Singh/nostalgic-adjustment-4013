

let data = [

  {
    "_id": "648d9ec6c74f78569429c8ad",
    "title": "The Complete Data Analyst Course",
    "course": "Data Analyst",
    "description": "The course provides the complete preparation you need to become a data analyst.\r\nFill up your resume with in-demand data skills: Python programming, NumPy, pandas, data preparation - data collection, data cleaning, data preprocessing, data visualization; data analysis, data analytics.\r\nAcquire a big-picture understanding of the data analyst role.\r\nLearn beginner and advanced Python.",
    "language": "English",
    "creatorId": "641c32bf6c3782a189731d43",
    "creatorName": "dummy",
    "content": [
      {
        "videoName": "videos/Dataanalyst-Video-1.m4v",
        "videoUrl": "https://course-craft-videos.s3.ap-south-1.amazonaws.com/videos/Dataanalyst-Video-1.m4v?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATEUVAXTOSYIGSTWW%2F20230617%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230617T115342Z&X-Amz-Expires=432000&X-Amz-Signature=d20440fd8d05489e57db72b848e0e2fd35fdfd7a08f09e1c75fbc16f1247937a&X-Amz-SignedHeaders=host&x-id=GetObject",
        "postedAt": "2023-06-16T14:17:13.785Z",
        "shares": 0,
        "thumbnailName": "images/Data_Analytics.png",
        "thumbnailURL": "https://course-craft-videos.s3.ap-south-1.amazonaws.com/images/Data_Analytics.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATEUVAXTOSYIGSTWW%2F20230617%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230617T115342Z&X-Amz-Expires=432000&X-Amz-Signature=5807da5fd6550a493dc9b0961fe86af890ee6e2c9ca0aa7750bb48e4cffdfe2a&X-Amz-SignedHeaders=host&x-id=GetObject",
        "_id": "648d9ec6c74f78569429c8ae",
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