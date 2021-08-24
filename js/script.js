"use strict"
document.addEventListener('DOMContentLoaded', () => {

    // Loader----------------------------------------------

    const loader = document.querySelector('.loader')

    setTimeout(function () {
        loader.style.opacity = '0'
        setTimeout(() => {
            loader.style.display = 'none'
        }, 800)
    }, 1200)


    //Tabs----------------------------------------------------


    const tabcontent = document.querySelectorAll('.tabcontent'),
        buttons = document.querySelectorAll('.tabheader__item'),
        parentBtn = document.querySelector('.tabheader__items')

    // Tabni yashirish

    function hideTabContent() {
        tabcontent.forEach(item => {
            item.style.display = 'none'
        })
        buttons.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }


    // Tabni chiqarish

    function showTabContent(i = 0) {
        tabcontent[i].style.display = 'block'
        buttons[i].classList.add('tabheader__item_active')
    }

    hideTabContent()
    showTabContent()


    //Click hodisa

    parentBtn.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('tabheader__item')) {
            buttons.forEach((item, i) => {
                if (event.target == item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })


    //Modal ----------------------------------------------------

    const modal = document.querySelector('.modal'),
        closeBtn = document.querySelector('.modal__close'),
        modalBtn = document.querySelectorAll('[data-btn]')


    // openModal
    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimer)
    }

    //closeModal

    function closeModal() {
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow = ''

    }


    modalBtn.forEach(item => {
        item.addEventListener('click', openModal)
    })


    closeBtn.addEventListener('click', closeModal)

    const modalTimer = setTimeout(openModal, 5000)


    function showMyModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal()
            window.removeEventListener('scroll', showMyModalByScroll)
        }
    }

    window.addEventListener('scroll', showMyModalByScroll)


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal()
        }
    })

    // Date ----------------------------------------------------------------

    const deadline = '2022-01-01'

    // 3 ta funcsiya yozamizz

    // 1. Vaqtni qaytar getTime()

    function getTime(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date()),
            day = Math.floor(total / (1000 * 60 * 60 * 24)),
            hour = Math.floor((total / (1000 * 60 * 60)) % 24),
            minut = Math.floor((total / (1000 * 60)) % 60),
            second = Math.floor(total / 1000 % 60);

        return {
            total: total,
            day: day,
            hour: hour,
            minut: minut,
            second: second
        }
    }


    // 2. Nol qo`shish f-ya. getZero()

    function getZero(num) {
        if (num >= 0 && num<10) {
            return '0'+num
        }else {
            return num
        }
    }

    // 3. Vatqni o`rnat setClock() 

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeIntervel = setInterval(updateClock, 1000)

        updateClock()
        //3.1 Vaqtni yangila f-ya. updateClock()

        function updateClock() {
            const time = getTime(endtime);

            days.innerHTML = getZero(time.day);
            hours.innerHTML = getZero(time.hour);
            minutes.innerHTML = getZero(time.minut);
            seconds.innerHTML = getZero(time.second);
            if (total<=0) {
                clearInterval(timeIntervel)
            }
        
        }

    }


    setClock('.timer', deadline)









})