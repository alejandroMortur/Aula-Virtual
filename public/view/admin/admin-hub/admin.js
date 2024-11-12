function allUsersCardBuilder(usersList){

    $('#user_list').innerHTML = "";

    for(let x = 0; x < usersList.length; ++x){

        let userFullName = usersList[x].getName() + " " + usersList[x].getSureName();

        let user = document.createElement('div');
        let userImg = document.createElement('img');
        $(userImg).attr("src",usersList[x].getImage());

        let userFullNameP = document.createElement('p');
        userFullNameP.innerHTML = userFullName;

        let userRemoveFlag = document.createElement('p');
        userRemoveFlag.innerHTML = " . . .";

        $(user).append(userImg,userFullNameP,userRemoveFlag);
        $('#user_list').append(user);

    }

}

function allCoursesCardBuilder(coursesList){

    $('#courses_list').innerHTML = "";

    for(let x = 0; x < coursesList.length; ++x){

        let courses = document.createElement('div');

        let coursesTitle = document.createElement('p');
        coursesTitle.innerHTML = coursesList[x].getTitle();

        let coursesImg = document.createElement('img');
        $(coursesImg).attr("src",coursesList[x].getImage());

        let coursesId = document.createElement('p');
        coursesId.innerHTML ="Id: "+coursesList[x].getId();

        let coursesRemoveFlag = document.createElement('p');
        coursesRemoveFlag.innerHTML = " . . .";

        $(courses).append(coursesTitle,coursesId,coursesImg,coursesRemoveFlag);
        $('#courses_list').append(courses);

    }

}