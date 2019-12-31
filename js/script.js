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
    // отримуємо значок бургер меню
    let burger = document.querySelector("#nav_burger");
    // лічильник для двох станів навігації
    let counterNav = 0;

    // при клікі на бургер меню ...
    burger.addEventListener("click", function(){
        // якщо лічильник парний, то показуємо навігацію та робимо лічильник непарним
        // якщо непарний, то ховаємо навігацію та робимо лячильник парним
        if(counterNav%2 == 0){
            navByTopics.classList.add("active-flex");
            counterNav++;
        }
        else if(counterNav%2 == 1){
            navByTopics.classList.remove("active-flex");
            counterNav++;
        }
    });

    // при кліці на будь яке місце навігації, вона приховується, а лічильник стає парним
    navByTopics.addEventListener("click",function(){
        navByTopics.classList.remove("active-flex");
        counterNav++;
    });



/////////////////////// nav fixed
    let nav = document.getElementsByClassName("nav")[0];

    // отримуємо метод об'єкта для отримання позиці відносно початку вікна перегляду
    let box = nav.getBoundingClientRect();
    // отримуємо кординати верхньої частини блока навігації відносно проекта
    let navAbsoluteTopCord = pageYOffset + box.y;
    // отримуємо кординати нижноЇ частини блока надавігації відносно проекта
    let navAbsoluteBottomCord = navAbsoluteTopCord + nav.offsetHeight;

    // при скролі і перезавантаженні сторінки викликаємо функцію 'toggleFixed'
    window.addEventListener("scroll", toggleFixed);
    window.onload = toggleFixed();

    // якщо вікно прокручене далі нижньої границі блока навігаціїб то позиціонуємо навігацію відносно вікна браузера; якщо вище, то позиціонуюмо відносно проекта
    function toggleFixed(){
        if(pageYOffset >= navAbsoluteBottomCord){
            nav.classList.add("position-fixed");
        }
        else if(pageYOffset <= navAbsoluteBottomCord){
            nav.classList.remove("position-fixed");
        }
    }



/////////////////////// nav scroll to ...
    // при клаці на блок з навігацією визветься функція 'scrollTo'
    navByTopics.addEventListener("click", scrollTo);

    function scrollTo(event){
        event.preventDefault();
        // цікавлять тільки кліки на кнопки
        if(event.target.className == "nav_item" || avent.target.className == "nav_item_triagle"){
            // отримуємо  ідентифікатори елемента до якого потрібно скролить
            let idOfScroll = event.target.getAttribute("data-scroll");
            // ініціалізуємо змінну елементом до якого потрібно скролить
            let elementOfScroll = document.getElementById(idOfScroll);

            // отримуємо кординати початку елемента скрола
            let yOfScroll = elementOfScroll.getBoundingClientRect().y + pageYOffset;
            // для кращоЇ видимості елемента після скролу
            yOfScroll -= 100;

            //скролим
            window.scrollTo(0, yOfScroll);
        }
    }



/////////////////////// intro slider ...
    // отримуємо кнопку перемикання слайдів
    let btnToLeft = document.querySelector(".next");
    let btnToTop = document.querySelector(".next");
    // отримуємо полосу прокрутки
    let polosa = document.querySelector(".slider_polosa");
    // ініціалізуємо масив із слайдів
    let arrSliderItems = document.querySelectorAll(".slider_item");
    // для визначення скролу зараз
    let sliderCurrentScroll = 0;
    // для визначення, коли потрібно повернутись на початок(таким чином ми створюємо безкінечний слайдер)
    let sliderBreakPoint = 0;

    //визначаємо, чи слайдер є горизонтальний, чи вертикальний
    if(window.screen.availWidth > 870){
        //задаємо значення відката до першого слайда(кінця слайдера)
        sliderBreakPoint = (arrSliderItems.length - 1) * (-328);

        // при кліці на кнопку ...
        btnToLeft.onclick = function(){
            // зменшуємо правий відступ (вдовблюємо далі в мінус)
            sliderCurrentScroll -= 328;

            // коли доходимо кінеця слайдера, скролимо до першого слайда
            if(sliderCurrentScroll <= sliderBreakPoint){
                sliderCurrentScroll = 0;
            }

            // за допомогою зміни правого відступа полоси прокрутки реалізовуємо все те, що я описав в цій функції
            polosa.style.right = sliderCurrentScroll + "px";
        }
    }
    else if(window.screen.availWidth <= 870){
        sliderBreakPoint = (arrSliderItems.length - 1) * -245;

        btnToTop.onclick = function(){
            sliderCurrentScroll -= 245;

            if(sliderCurrentScroll <= sliderBreakPoint){
                sliderCurrentScroll = 0;
            }

            polosa.style.bottom = sliderCurrentScroll + "px";
        }
    }



/////////////////////// projects sorting
    // при клікі на навігацію сортування спрацбовує функція 'sortProject'
    document.getElementsByClassName("projects_nav")[0].addEventListener("click", sortProjects);

    // отримуємо масив постерів проектів
    let arrProjects = document.getElementsByClassName("projects_card");

    function sortProjects(event){
        // якщо клікнули по кнопці
        if(event.target.className == "projects_nav_item"){
            // первіряємо, чи ми сортуємо за категоріями, ідентичністю, чи просто показуємо всі проекти
            if(event.target.hasAttribute("data-cat")){
                toggleProjects("data-cat", event.target.getAttribute("data-cat"));
            }
            else if(event.target.hasAttribute("data-identities")){
                toggleProjects("data-identities", event.target.getAttribute("data-identities"));
            }
            else{
                showAllProjects();
            }
        }
    }

    function toggleProjects(nameAttribute, dataAttribute){
        // превряємо весь масив проектів
        for(let i=0; i < arrProjects.length; ++i){
            //якщо дані атрибута проекта збігається з даними атрибута кнопки, то показуюмо проект; якщо ны - ховаємо
            if(arrProjects[i].getAttribute(nameAttribute) == dataAttribute){
                arrProjects[i].style.display = "block";

            }
            else if(arrProjects[i].getAttribute(nameAttribute) != dataAttribute){
                arrProjects[i].style.display = "none";
            }
        }
    }

    function showAllProjects(){
        for(let i=0; i<arrProjects.length; ++i){
            arrProjects[i].style.display = "block";
        }
    }



/////////////////////// projects scroll up
    document.getElementById("projects_up").onclick = function(){
        window.scrollTo(0,0);
    }



/////////////////////// contacts
    // ініціалізуємо масив повідомленнями
    let arrContactsInfo = document.getElementsByClassName("contacts_notice");

    // при кліці на блок навігації визвеці ця анонімна функція
    document.querySelector(".contacts_items").addEventListener("click", function(event){
        //цікавить клік по кнопкам
        if(event.target.className == "contacts_item" || event.target.tagName == "I"){

            // номер кнопки або іконки по якій клікнули
            let numberOfButton = event.target.getAttribute("data-notice");

            // цикл перебирає масив з повідомленнямиб якщо номер кнопки по якій клацнули співпадає з індексом повідомлення, то це показуємо повідомлення, а якщо ні приховуємо
            for(let i=0; i < arrContactsInfo.length; i++){
                if(i == numberOfButton){
                    arrContactsInfo[i].classList.add("active");
                }
                else{
                    arrContactsInfo[i].classList.remove("active");
                }
            }
        }
    })

}





































