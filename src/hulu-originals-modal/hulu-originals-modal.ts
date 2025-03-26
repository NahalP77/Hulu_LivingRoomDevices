import { getData, getEmptyData } from "..";

let modal = document.getElementById("show-modal");
let closeButton = document.getElementsByClassName("close")[0] as HTMLElement;

//open show modal
export const openModal = async(i:any, x:any) => {
    const carousel = document.querySelectorAll('.carousel-main');
    const categoryCarousel = carousel[x];
    const carouselContent = categoryCarousel.querySelectorAll('.carousel-content')[0];
    const imageButtonToggle = carouselContent.querySelectorAll<HTMLInputElement>('.image')[i];

    let data: any
    let items: any;
    let defaultData = await getData();
    let defaultItems = defaultData.components[x].items;
    let modalContent = document.querySelectorAll(".popup")[0];
    let output = "";

    if (defaultItems.length == 0) {
        data = await getEmptyData(defaultData.components[x].id);
        items = data.items[i];
    } else {
        data = await getData();
        items = data.components[x].items[i];
    }

    if (closeButton!=undefined) {
        closeButton.focus();
    }

    let myDate = new Date(items.entity_metadata.premiere_date);
    let newDate = myDate.getFullYear();
    let genre = (items.entity_metadata.genre_names).join(', ');

    //modal contents
        output += `
            <img class="image-center" src="${items.visuals.artwork.horizontal_tile.image.path}&size=400x250&format=jpeg" onerror="this.onerror=null;this.src='../public/assets/hulu-default.png';"/>
            <div class="text modal-text">${items.visuals.headline}</div>
            <ul>
                <li class="text text-small">${newDate}</li>`
            if(items.entity_metadata.rating.code !== undefined){
                output += ` <li class="text text-small">${items.entity_metadata.rating.code}</li>`
            }
        output += `<li class="text text-small">${genre}</li>
            </ul>
            <div class="text sub-text">${items.visuals.body}</div>
        `;

    modalContent.innerHTML = output;

  //close modal
  closeButton?.addEventListener('click', () => {
    modal?.classList.add('hide');
    modal?.classList.remove('show');    
    imageButtonToggle.focus();
 });

 //close modal on escape
 window.addEventListener("keyup", (event: any) => {
    if (event.key == 'Escape') {
        modal?.classList.add('hide');
        modal?.classList.remove('show');    
        imageButtonToggle.focus();
    }
 });
}