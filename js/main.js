let searchKey = "";
let studentTotal = $('.student-list li').length;

//adds or resets pagination based on student count
const pagination = () => {
    const pagesTotal = Math.ceil(studentTotal / 10);
    
    //adds pagination div if does not exist, else clears li elements
    if($('.pagination').length == 0){
       $('.page').append("<div class=\"pagination\"><ul></ul></div>");        
    }else{
        $('.pagination ul').empty();
    }
    
    //adds li elements based on how many students total
    for (let i = 1; i <= pagesTotal; i++){
            $('.pagination ul').append("<li><a href=\"#\">" + i + "</a></li>");
        }
        
    $('.pagination ul li:first a').addClass('active');
    
    $('.pagination a').on('click', (event) => {
    $('.pagination ul li a[class="active"]').removeClass("active");
    $(event.target).addClass("active");
    showStudents($(event.target).text());
});
}

const showStudents = (page) => {
    //resets pagination
    if(page == 1){
    $('.pagination ul li a[class="active"]').removeClass("active");
    $('.pagination ul li:first a').addClass("active"); 
    }
    
    console.log(page);

    //if key is empty (no search) show 10 at a time, else uses searchKey for search functionality
    if (searchKey == ""){
        $('.student-list li').each(function(index, value){
            if ((index + 1) <= (page*10) && (index + 1) >= ((page*10)-9)){
                $(value).show();
            }else{
                $(value).hide();
            }
        });

    }else{
        let stuCount = 0;
        
        $('.student-list li').each(function(index, value){
            if(($(value).find('h3').text()).includes(searchKey)){
                stuCount++;
                if ((stuCount) <= (page*10) && (stuCount) >= ((page*10)-9)){
                    $(value).show();
                }else{
                    $(value).hide();
                }
            }else{
                $(value).hide();                       
            }
        });
    }
}

//search function, if empty then resets list, else assigns new searchKey and reloads list
const search = () => {
    searchKey = $('#input-search').val();
    if (searchKey == ""){
        studentTotal = $('.student-list li').length;
        //console.log(studentTotal);
        pagination();
        showStudents(1);
        return;   
    }

    studentTotal = 0;
    $('.student-list li').each(function(index, value){
            if(($(value).find('h3').text()).includes(searchKey)){
                studentTotal++;
            }
    });
    
    pagination();
    showStudents(1);
}

// Methods to run when page first loads
const initPage = () => {
    pagination();
    showStudents(1);
    
    //add search
    $('.page-header').append("<div class=\"student-search\"><input id=\"input-search\" placeholder=\"Search for students\"><button id=\"search-button\">Search</button></div>");
    
    
    //adds search function to search button
    $('#search-button').on('click', (event) => {
        search();
    });
}


//method call to load page
initPage();