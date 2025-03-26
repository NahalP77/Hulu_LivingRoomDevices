import { getData, getEmptyData } from "..";
import { remote } from '../hulu-originals-display/remote-control'

//category carousels
export const main = async() => {
    let data: any
    let categories: any;
    let defaultData = await getData();
    let defaultCategories = defaultData.components;
    let body = document.querySelectorAll("#body")[0];
    let huluOriginalDisplay = "";

    //category for loop
    for (let x = 0; x < defaultCategories.length; x++) {
        //if the shows are empty fetch the id specific url
        if (defaultCategories[x].items.length == 0) {
            data = await getEmptyData(defaultCategories[x].id);
            categories = data;
        } else {
            data = await getData();
            categories = data.components[x];
        }

        //category title
        huluOriginalDisplay += ` 
                <div class="carousel-main">
                    <h3 class="category-title">
                        ${categories.name}
                    </h3>
                    <div class="carousel-content" id="shows">
            `
        //show for loop
        for (let y = 0; y < categories.items.length; y++) {
            let carouselContents = categories.items[y];

            //get only the year from the date
            let myDate = new Date(carouselContents.entity_metadata.premiere_date)
            let newDate = myDate.getFullYear();
        
            huluOriginalDisplay +=`
                <div class="show-content">
                    <button class="image" style="background-image:url(${carouselContents.visuals.artwork.horizontal_tile.image.path}&size=300x150&format=jpeg), url('../public/assets/hulu-default.png')"></button>
                    <div class="show-title">${carouselContents.visuals.headline}</div>
                    <ul class="subtitle hide">
                        <li class="text">${newDate}</li>`
            if(carouselContents.entity_metadata.rating.code !== undefined){
                huluOriginalDisplay += `<li class="text text-small">${carouselContents.entity_metadata.rating.code}</li>`
            }
            huluOriginalDisplay +=`
                        <li class="text">${carouselContents.entity_metadata.genre_names[0]}</li>
                    </ul>
                </div>
            `
        }

        huluOriginalDisplay += `
                    </div>
                </div>
        `
    }
    body.innerHTML = huluOriginalDisplay;
    //call the event listeners function
    remote();
}






