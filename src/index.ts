import './style.css';
import '../public/assets/hulu-default.png'
import { main } from './hulu-originals-display/hulu-originals-display'

//all hulu originals data
 export const getData = async() => {
    const requestURL =
      "https://d1q0vy0v52gyjr.cloudfront.net/hub.json";
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    const showData = await response.json();
  
    return showData;
  }

  //hulu originals data by id
  export const getEmptyData = async(id:any) => {
    const requestURL =
      `https://d1q0vy0v52gyjr.cloudfront.net/collections/${id}.json`;
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    const emptyShowData = await response.json();
  
    return emptyShowData;
  }

main();















