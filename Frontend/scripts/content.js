


//let video = document.getElementById("video-content");
let left  = document.getElementById("left-side");
// let videoURL = localStorage.getItem(videoUrl);
// let videoName = localStorage.getItem(videoName);


let newData = {
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
  
  display(newData)

  function display(datas) {
    console.log(datas);
    left.innerHTML = null;
    let enterVid = document.createElement("div");
    enterVid.setAttribute("id", "video-content");
    let vid = document.createElement("video");
    vid.src = datas.content[0].videoUrl;
    vid.controls = true;
  
    let vidName = document.createElement("h3");
    let str = datas.content[0].videoName;
    const start_index = str.indexOf("/") + 1;
    const end_index = str.indexOf("-");
    let data_analyst = str.substring(start_index, end_index);
    vidName.innerText = data_analyst;
  
    let likes = document.createElement("div");
    likes.setAttribute("id", "like");
    let like_given = document.createElement("img");
    let total_Likes = document.createElement("span");
  
    // Get initial like count from localStorage or default to 0
    let likeCount = parseInt(localStorage.getItem("likeCount")) || 0;
    total_Likes.innerText = likeCount;
  
    like_given.src =
      "https://img.icons8.com/?size=1x&id=24816&format=png";
    like_given.addEventListener("click", function () {
      // Increase like count
      likeCount++;
      // Update total_Likes element
      total_Likes.innerText = likeCount;
      // Store the updated like count in localStorage
      localStorage.setItem("likeCount", likeCount);
    });
  
    likes.append(like_given, total_Likes);
    enterVid.append(vid, vidName, likes);
  
    let commentSection = document.createElement("div");
    commentSection.setAttribute("id", "commentSection");
  
    let commentInput = document.createElement("input");
    commentInput.setAttribute("type", "text");
    commentInput.setAttribute("placeholder", "Enter your comment");
  
    commentInput.addEventListener("change", function () {
      // Store the comment in localStorage
      let comment = commentInput.value;
      localStorage.setItem("userComment", comment);
  
      // Display the comment in the commentSection
      let commentDiv = document.createElement("div");
      commentDiv.innerText = comment;
      commentSection.appendChild(commentDiv);
  
      // Clear the input field
      commentInput.value = "";
    });
  
    commentSection.appendChild(commentInput);
  
    left.append(enterVid, commentSection);
  }
  



