import { getData, getEmptyData } from "..";
import { openModal } from '../hulu-originals-modal/hulu-originals-modal'

let currentShow = 0;
const modal = document.getElementById("show-modal");

//shift carousel on right/left and focus on selected show
const currentSelected = (y: number, x: number) => {
    const carousel = document.querySelectorAll('.carousel-main');
    const categoryCarousel = carousel[y];
    const carouselContent = categoryCarousel.querySelectorAll('.carousel-content')[0];
    const imageButtonToggle = carouselContent.querySelectorAll<HTMLInputElement>('.image')[x];
    currentShow = x;
    imageButtonToggle.focus();
    return x;
}

export const remote = async() => {
    const carousel = document.querySelectorAll('.carousel-main');
    const imageButton = document.querySelectorAll<HTMLInputElement>('.image');
    const subtitle = document?.querySelectorAll<HTMLInputElement>('.subtitle');
    

    //focust first element on load and show subtitle information
    imageButton[0].focus();
    subtitle[0].classList.remove('hide');
    subtitle[0].classList.add('show');

    //load data
    let data: any
    let categories: any;
    let defaultData = await getData();
    let defaultCategories = defaultData.components;

    //category for loop
    for (let x = 0; x < defaultCategories.length; x++) {
        const categoryCarousel = carousel[x];
        const carouselContent = categoryCarousel.querySelectorAll('.carousel-content')[0];

        if (defaultCategories[x].items.length !== 0) {
            //show for loop
            for(let y = 0; y < defaultCategories[x].items.length; y++) {
                const imageButtonToggle = carouselContent.querySelectorAll<HTMLInputElement>('.image')[y];

                focus(x, y);

                //navigate right/left on category carousels and up/down between category carousels
                imageButtonToggle.addEventListener("keyup", (event: any) => {
                    if (event.key == 'ArrowRight') {
                        currentSelected(x, currentShow === defaultCategories[x].items.length - 1 ? 0 : currentShow + 1);
                    }
                    if (event.key == 'ArrowLeft') {
                        currentSelected(x, (currentShow === 0 ? defaultCategories[x].items.length : currentShow) - 1);
                    }
                    if (event.key == 'ArrowDown') {
                        currentSelected(x === defaultCategories.length - 1 ? 0 : x + 1, 0);
                    }
                    if (event.key == 'ArrowUp') {
                        currentSelected((x === 0 ? defaultCategories.length : x) - 1, 0);
                    }
                });
            }
        } else {
            //when the items are empty fetch empty collection data
            data = await getEmptyData(defaultCategories[x].id);
            categories = data;
            for (let y = 0; y < categories.items.length; y++) {
                const imageButtonToggle = carouselContent.querySelectorAll<HTMLInputElement>('.image')[y];

                focus(x, y);

                //navigate right/left on category carousels and up/down between category carousels
                imageButtonToggle.addEventListener("keyup", (event: any) => {
                    if (event.key == 'ArrowRight') {
                        currentSelected(x, currentShow === categories.items.length - 1 ? 0 : currentShow + 1);
                    }
                    if (event.key == 'ArrowLeft') {
                        currentSelected(x, (currentShow === 0 ? categories.items.length : currentShow) - 1);
                    }
                    if (event.key == 'ArrowDown') {
                        currentSelected(x === defaultCategories.length - 1 ? 0 : x + 1, 0);
                    }
                    if (event.key == 'ArrowUp') {
                        currentSelected((x === 0 ? defaultCategories.length : x) - 1, 0);
                    }
                });
            }
        }
    }
}

const focus = (x: any, y: any) => {
    const carousel = document.querySelectorAll('.carousel-main');
    const categoryCarousel = carousel[x];
    const carouselContent = categoryCarousel.querySelectorAll('.carousel-content')[0];
    const imageButtonToggle = carouselContent.querySelectorAll<HTMLInputElement>('.image')[y];
    const subTitleToggle = carouselContent.querySelectorAll('.subtitle')[y];

    //open modal on enter/click
    imageButtonToggle.addEventListener('click', () => {
        currentShow = y;
        modal?.classList.add('show');
        modal?.classList.remove('hide');
        openModal(y, x);
        subTitleToggle.classList.remove('hide');
        subTitleToggle.classList.add('show');
    })
    
    //add subtitle information on focus
    imageButtonToggle.addEventListener('focus', () => {
        subTitleToggle.classList.remove('hide');
        subTitleToggle.classList.add('show');
    })

    //remove subtitle information on focus
    imageButtonToggle.addEventListener('focusout', () => {
        subTitleToggle.classList.add('hide');
        subTitleToggle.classList.remove('show');
    })
}

