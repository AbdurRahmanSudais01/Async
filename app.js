document.getElementById("form").addEventListener('submit' ,function (event) {
    event.preventDefault();
    const userId = event.target.userId.value;    
    const showPostBtn = document.getElementById("showPostBtn");
    if(userId < 1 || userId > 10 ){
        alert("Please enter user id Between 1 and 10!");
        return
    }   
    console.log('userId: ', userId);
    let userinfo = document.createElement('div');
    userinfo.innerHTML = "";

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((response) => response.json()).then((json) => {

        console.log('json: ', json)
    let userInfoDiv = document.getElementById("userInfo");
    
    userinfo.innerHTML = `
    <p><strong>User Id: </strong>${json.id}</p>
    <p><strong>Name: </strong>${json.name}</p>
    <p><strong>User Name: </strong>${json.username}</p>
    <p><strong>User Email: </strong>${json.email}</p>
    <p><strong>Company Name: </strong>${json.company.name}</p>
    `;
    userInfoDiv.appendChild(userinfo);
    showPostBtn.style = "display : inline";
    }

);
})

document.getElementById("showPostBtn").addEventListener('click', function (event){
    event.preventDefault();
    const userid = document.getElementById("UserId").value;
    let userPosts = document.createElement('div');

    function getPost(item){
        return `<div><p><strong>postId: </strong>${item.id}</p>
        <p><strong>title: </strong>${item.title}</p>
        <p><strong>content: </strong>${item.body}</p></div>`
    }
    fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json()).then((json) => {

        const filteredPosts = json.filter(item => item.userId == userid);
        console.log('filteredPosts: ', filteredPosts);
        filteredPosts.forEach(element => {
            let postElements = getPost(element);
            userPosts.innerHTML += postElements;
        });
        let userPostDiv = document.getElementById("userPosts");
        userPostDiv.appendChild(userPosts);
    });

})
