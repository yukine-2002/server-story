const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");

const WEB_URL = "https://truyentranh24z.com"

const WEB_API = "https://truyentranh24z.com/api"

const instance = axios.create({
    baseURL: WEB_API,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Referer: "https://truyentranh24z.com/idoly-pride"
    }
  });

class Model {
 
    static async getChapStoryNew() {
        const {data} = await axios.get(`${WEB_URL}/chap-moi-nhat`)
        const {window} = new JSDOM(data)
        const { document } = window
        const itemStory = document.querySelectorAll(".item-medium")
        
        const newStory = [...itemStory].map(chaps => {
            const name = chaps.querySelector(".item-title").textContent;
            const chap = chaps.querySelector(".item-thumbnail").textContent
            const img = chaps.querySelector("img").dataset.src
            const url = chaps.querySelector("a").getAttribute("href");
            const slug =urlToSlug(url);
        
            return { name,chap,img,url, slug };
        })
        return newStory
    }
    static async getStoryNew() {
        const {data} = await axios.get(`${WEB_URL}`)
        const {window} = new JSDOM(data)
        const { document } = window
        const itemStory = document.querySelectorAll(".new .item-large")
        const newStory = [...itemStory].map(chaps => {
            const name = chaps.querySelector(".item-title").textContent;
            const img = chaps.querySelector("img").dataset.src
            const url = chaps.querySelector("a").getAttribute("href");
            const slug = url.replace("/","")
            const view  = chaps.querySelector(".item-views").textContent
            const itemChild = chaps.querySelector('.item-children')
            const dateUpdate = chaps.querySelector(".item-thumbnail").textContent           
            const itemChap = itemChild.querySelectorAll("a")
            const storyChap = [...itemChap].map(child => {
                const name = child.querySelector(".child-name").textContent
                const update = child.querySelector(".child-update").textContent
                const url = child.getAttribute("href");
                return {name,update,url}
            })
            return { name,dateUpdate,img,view,url,slug,storyChap };
        })
        return newStory
    }
    static async getChap(id){
        
        const URL = `mangas/${id}/chapters`;
        const { data } = await instance.get(URL);
        
        return data
    }
    static async getInfoStory(slug){
        const {data} = await axios.get(`${WEB_URL}/${slug}`)
        const {window} = new JSDOM(data)
        const { document } = window
        const id = document.querySelector(".manga-poster img").getAttribute("data-id")
        const poster = document.querySelector(".manga-poster img").dataset.src
        const thumbnail = document.querySelector(".manga-thumbnail img").dataset.src
        const name = document.querySelector(".manga-title").textContent
        const auth = document.querySelector('.manga-author span').textContent
        const status = document.querySelector('.manga-status span').textContent 
        const latest = document.querySelector('.manga-latest span').textContent 
        const views = document.querySelector('.manga-views span').textContent 
        const description = document.querySelector('.manga-content').textContent 
        const {chapters} = await this.getChap(id)
        return {id,name,auth,poster,thumbnail,status,latest,views,description,chapters}
    }

    static async getChapterContent(slug,chap){
        const {data} = await axios.get(`${WEB_URL}/${slug}/${chap}`)
        const {window} = new JSDOM(data)
        const {document} = window
        const ChapImg= document.querySelectorAll(".chapter-content img")
        const ChapterContent  = [...ChapImg].map(chap => {
            const alt = chap.getAttribute("alt")
            const src = chap.dataset.src
            return {alt,src}
        })
        return ChapterContent     
    }   

    static async getStoryRecommender() {
        const {data} = await axios.get(WEB_URL)
        const {window} = new JSDOM(data)
        const {document} = window

        const containerLm = document.querySelector('.container-lm')
        const section = containerLm.querySelectorAll("section")
        const itemStory = section[3].querySelectorAll(".item-medium")
      
        const StoryRecommender = [...itemStory].map(chaps => {
            const name = chaps.querySelector(".item-title").textContent;
            const img = chaps.querySelector(".item-thumbnail img").dataset.src
            const view = chaps.querySelector(".item-thumbnail span").textContent
            const url = chaps.querySelector(".item-medium a").getAttribute("href");
            const slug = url.replace("/","");
  
            return { name,view,img,url, slug };
        })

        return StoryRecommender
    }

    static async getStoryComplete (page = 1){
        const {data} = await axios.get(`${WEB_URL}/truyen-da-hoan-thanh?p=${page}`)
        return convetDOMToJson(data)
    }
    static async getStoryUpdate (page = 1){
        const {data} = await axios.get(`${WEB_URL}/truyen-dang-cap-nhat?p=${page}`)
        return convetDOMToJson(data)
    }
    static async getStoryHot (page = 1){
        const {data} = await axios.get(`${WEB_URL}/truyen-hot?p=${page}`)
        return convetDOMToJson(data)
    }
    static async getStoryRankDay(page = 1){
        const {data} = await axios.get(`${WEB_URL}/top-ngay?p=${page}`)
       return convetDOMToJson(data)
    }
    static async getMenu(){
        const {data} = await axios.get(`${WEB_URL}`)
        const {window} = new JSDOM(data)
        const {document} = window
        const menuContry = document.querySelectorAll('.menu-country li a')
        const menuGenres = document.querySelectorAll('.menu-genre li a')

        const GMenuContry = [...menuContry].map(mn => {
            const slug = mn.getAttribute("href").replace("/","")
            const name = mn.textContent
            return {slug,name}
        })
        const GMenuGenres = [...menuGenres].map(mn => {
            const slug = mn.getAttribute("href").replace("/","")
            const name = mn.textContent
            return {slug,name}
        })
        return [...GMenuContry,...GMenuGenres]
    }
    
}
const urlToSlug = url => {
    const parts = url.split("/");
    return parts[parts.length-2];
};
const convetDOMToJson = (data) => {
    const {window} = new JSDOM(data)
    const {document} = window

    const section = document.querySelector('section')
    const itemStory = section.querySelectorAll(".item-medium")

    const Story = [...itemStory].map(chaps => {
        const name = chaps.querySelector(".item-title").textContent;
        const img = chaps.querySelector(".item-thumbnail img").dataset.src
        const view = chaps.querySelector(".item-thumbnail span").textContent
        const url = chaps.querySelector(".item-medium a").getAttribute("href");
        const slug = url.replace("/","");
        return { name,view,img,url, slug };
    })

    return Story
}
module.exports = Model