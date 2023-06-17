

//let video = document.getElementById("video-content");
let left  = document.getElementById("left-side");
let videoUrl = localStorage.getItem(videoURL);
let videoName = localStorage.getItem(videoName);



  
  display(videoUrl,videoName)

  function display(videoUrl,videoName) {
  
    left.innerHTML = null;
    let enterVid = document.createElement("div");
    enterVid.setAttribute("id", "video-content");
    let vid = document.createElement("video");
    vid.src = videoUrl;
    vid.controls = true;
  
    let vidName = document.createElement("h3");
    let str = videoName;
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
  



