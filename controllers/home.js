const home = function (req,res){
    const title='Welcome'
    res.render('home',{title:title});
}

module.exports={
    home
}