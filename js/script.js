window.onload = function(){
/////////////////////// nav
    let indexOfItem;
    let arrTriagle;

    let navByTopics = document.getElementsByClassName("nav_by-topics")[0];
    // при наведенні мишки на блок навігації, відпрацьовує ф. 'addTriagle'
    navByTopics.addEventListener("mouseover", addTriagle);
    // мишка залишає блок навігації - відпрацьовує ф. 'removeTriagle'
    navByTopics.addEventListener("mouseout", remTriagle);
    //




    //показує і ховає трикутнички
    function addTriagle(event){
        // умовою відкидаємо всі непотрібні відпрацьовування коду при наведенні
        if(event.target.className == "nav_item"){
            // отримуємо номер елемента на який навели
            indexOfItem = event.target.getAttribute("data-navI");

            // отримуємо масив наших трикутничків
            arrTriagle = document.getElementsByClassName("nav_item_triagle");

            //пребираємо масив наших трикутників
            //Якщо індекс трикутника збігається з номером елемента над яким мишка, то показуєм його, а якщо ні - ховаємо
            for(let i=0; i<arrTriagle.length; ++i){
                if(i == indexOfItem){
                    arrTriagle[i].classList.add("active");
                }
                else{
                    arrTriagle[i].classList.remove("active");
                }
            }

            // наведення мишки на трикутник
            document.getElementsByClassName("nav_item_triagle")[indexOfItem].addEventListener("mouseover", addTriagleFromTriagle);
        }
    }

    //приховує трикутник
    function remTriagle(event){
        if(event.target.className == "nav_item"){
            // отримуємо всі трикутнички в змінну-масив 'remTriagle'
            arrTriagle = document.getElementsByClassName("nav_item_triagle");

            // видаляємо клас показу трикутника
            arrTriagle[indexOfItem].classList.remove("active");// this short way cuse one time error during first transition mouse throught borders of 'nav' and nav_item, but it is does not effect on quality of work
        }
    }

    //показує трикутник
    function addTriagleFromTriagle(event){
        arrTriagle[indexOfItem].classList.add("active");
    }



/////////////////////// header social
    // при клікі на елмент зі списком контактів, спрацьовує анонімна функція
    document.querySelector(".header_right_social").onclick = function(event){
        // функція буде працювати тільки при кліці на іконки
        if(event.target.tagName == "I"){
            //отримуємо номер іконки для встановлення зв'язку з хмаринками
            let numItem = event.target.getAttribute("data-mail");

            // отримуємо масив хмаринок
            let arrMail = document.querySelectorAll(".header_right_mail");

            // до відповідної іконки підбираєм хмаринку з індексом таким, як у іконки дані атрибута 'data-mail'
            for(let i=0; i<arrMail.length; ++i){
                if(i == numItem){
                    arrMail[i].classList.add("active");
                }
                else{
                    arrMail[i].classList.remove("active");
                }
            }
        }
    }



/////////////////////// drop-down list
    // отримуємо основний блок випадаючого списка
    let showI = document.getElementsByClassName("sel_selected-item")[0];
    // отримуємо перший блок випадаючого списка
    let arrSelItems = document.getElementsByClassName("sel_item");
    //по замовчюванню вибирається перша мова у списку
    showI.innerHTML = arrSelItems[0].innerHTML;


    // при нажатті на список с якому містяться пункти, спрацьовує функція
    let listSelItems = document.getElementsByClassName("sel_dropping-list");
    listSelItems[0].onclick = chooseSelItem;
    function chooseSelItem(event){
        // визначаємо  на який пункт клацнули
        let chosenI = event.target.closest("div");
        //в основний блок записуємо вміст блока по якому клацнули(мову)
        showI.innerHTML = chosenI.innerHTML;

        //ховаємо список з мовами
        listSelItems[0].classList.remove("active");
        //повертаємо в початкове положення стрілочку
        selArrow.classList.remove("rotate-180-degrees");
        //у нас в каунтері непарне числоб, щоб 2 рази потім не клацати записуємо парне

        counterOpenList = 0;
    }

    let counterOpenList = 0;
    // при клікі на стрілоку ...
    let selArrow = document.getElementById("sel_arrow");
    selArrow.onclick = openList;
    function openList(){
        // ... розгортаємо список і повертаємо стрілочку в іншу сторону
        if(counterOpenList % 2 == 0){
            listSelItems[0].classList.add("active");
            selArrow.classList.add("rotate-180-degrees");
            ++counterOpenList;
        }
        // ... згортаємо список і повертаємо стрілку в початкове положення
        else{
            listSelItems[0].classList.remove("active");
            selArrow.classList.remove("rotate-180-degrees");
            ++counterOpenList;
        }
    }
    // баг #1: при виділенні декількох елементів  неаадекватно себе поводить



/////////////////////// burger
    let burger = document.querySelector("#nav_burger");
    let counterNav = 0;

    burger.addEventListener("click", function(){
        if(counterNav%2 == 0){
            navByTopics.classList.add("active-flex");
            counterNav++;
        }
        else if(counterNav%2 == 1){
            navByTopics.classList.remove("active-flex");
            counterNav++;
        }
    });

    navByTopics.addEventListener("click",function(){
        navByTopics.classList.remove("active-flex");
    });



/////////////////////// nav scroll
    let nav = document.getElementsByClassName("nav")[0];

    let box = nav.getBoundingClientRect();
    let navAbsoluteTopCord = pageYOffset + box.y;
    let navAbsoluteBottomCord = navAbsoluteTopCord + nav.offsetHeight;

    window.addEventListener("scroll", toggleFixed);
    window.onload = toggleFixed();


    function toggleFixed(){
        if(pageYOffset >= navAbsoluteBottomCord){
            nav.classList.add("position-fixed");

        }
        else if(pageYOffset <= navAbsoluteBottomCord){
            nav.classList.remove("position-fixed");
        }
    }
}





































