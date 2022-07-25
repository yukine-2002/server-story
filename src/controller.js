const model = require('./model')
const corsAnywhere = require("cors-anywhere");
let proxy = corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: [],
    setHeaders: {
      referer: "http://www.nettruyenme.com/",
    },
  });
class Controller {
    static async getChapStoryNew (_req, res, next){
        try{
            const storyNew = await model.getChapStoryNew()
            res.json({success : true ,data :storyNew})
        }catch(err){
            next(err);
        }
    }
    static async getStoryNew (_req, res, next){
        try{
            const storyNew = await model.getStoryNew()
            res.json({success : true ,data :storyNew})
        }catch(err){
            next(err);
        }
    }
    static async getInfoStory(_req,res,next){
        const { slug } = _req.params;
        try{
            const storyNew = await model.getInfoStory(slug)
            res.json({success : true ,data :storyNew})
        }catch(err){
            next(err);
        }
    }
    static async getChapterContent(_req,res,next){
        const {slug,chap} = _req.params
        try{
            const story = await model.getChapterContent(slug,chap)
            res.json({success : true ,data :story})
        }catch(err){
            next(err)
        }
    }
    static async getStoryRecommender(_req,res,next){
        try{
            const story = await model.getStoryRecommender()
            res.json({success : true ,data :story})
        }catch(err){
            next(err)
        }
    }

    static async getStoryComplete(_req,res,next){
        const {p} = _req.query
        try{
            const story = await model.getStoryComplete(p)
            res.json({success:true,data:story})
        } catch(err){
            next(err)
        }
     }

     static async getStoryUpdate(_req,res,next){
        const {p} = _req.query
        try{
            const story = await model.getStoryUpdate(p)
            res.json({success:true,data:story})
        } catch(err){
            next(err)
        }
     }
     static async getStoryHot(_req,res,next){
        const {p} = _req.query
        try{
            const story = await model.getStoryHot(p)
            res.json({success:true,data:story})
        } catch(err){
            next(err)
        }
     }
     static async getStoryRankDay(_req,res,next){
        const {p} = _req.query
        try{
            const story = await model.getStoryRankDay(p)
            res.json({success:true,data:story})
        } catch(err){
            next(err)
        }
     }

     static async getMenu(_req,res,next){
        try{
            const story = await model.getMenu()
            res.json({success:true,data:story})
        } catch(err){
            next(err)
        }
     }

    static async corsAnywhere(req, res) {
        req.url = req.url.replace("/cors/", "/");
        proxy.emit("request", req, res);
    }
  


}

module.exports =  Controller