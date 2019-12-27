window.onload = function(){
/////////////////////// nav
    // при наведенні мишки на блок навігації, відпрацьовує ф. 'addTriagle'
    document.getElementsByClassName("nav")[0].addEventListener("mouseover", addTriagle);
    // мишка залишає блок навігації - відпрацьовує ф. 'removeTriagle'
    document.getElementsByClassName("nav")[0].addEventListener("mouseout", remTriagle);

    //показує і ховає трикутнички
    function addTriagle(event){
        // умовою відкидаємо всі непотрібні відпрацьовування коду при наведенні
        if(event.target.className == "nav_item"){
            // отримуємо номер елемента на який навели
            let indexOfItem = event.target.getAttribute("data-navI");

            // отримуємо масив наших трикутничків
            let arrTriagle = document.getElementsByClassName("nav_item_triagle");

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
        }
    }

    //приховує трикутнички
    function remTriagle(){
        // отримуємо всі трикутнички в змінну-масив 'remTriagle'
        let arrTriagle = document.getElementsByClassName("nav_item_triagle");

        // перебираючи, ховаємо всі трикутнички
        for(let i=0; i<arrTriagle.length; i++){
            arrTriagle[i].classList.remove("active");
        }
    }



/////////////////////// header social
    // при кліці на елменті з контактами, спрацьовує анонімна функція
    document.querySelector(".header_right_social").onclick = function(event){
        // функція буде працювати тільки при кліці на іконки
        if(event.target.tagName == "I"){
            //отримуємо номер іконки для встановлення зв'язку з хмаринками
            let numItem = event.target.getAttribute("data-mail");

            // отримуємо масив хмаринок
            let arrMail = document.querySelectorAll(".header_right_mail");

            // до відповідної іконки підбираєм хмаринку з індексом такимб як у іконки дані атрибута 'data-mail'
            for(let i=0; i<arrMail.length; ++i){
                if(i == numItem){
                    arrMail[i].style.display = "block";
                }
                else{
                    arrMail[i].style.display = "none";
                }
            }
        }
    }




}
