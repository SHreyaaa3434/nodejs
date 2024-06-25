let express = require("express");
let app = express();
let product = [];
require('dotenv').config()
app.use(express.json());
app.post('/createproduct', (req, res) => {
    try{
    console.log(req.body)
    let obj = req.body
    product.isdeleted = false
    obj.id = product.length + 1;
    product.push(obj)
    console.log("product", product)
    res.status(201).send({
        msg: "product added successfully",
        product: obj
    })
}catch(err){
    res.status(500).send(err)
}

})
app.get('/getProductdata', (req, res) => {
    try{
    let x = product.filter((val) => {
        if ((val.isDeleted != false)) {
            return true;
        }
    })

    res.status(404).send({ issuccess: true, data: x });
}
catch(err){
    res.status(500).send(err)
}
})

app.put('/updateProduct', (req, res) => {
    try {
        console.log(req.query);
        let obj = req.body
        let id = req.query.id;
    
        let searchpro = product.find((val) => {
            return val.id == id
        })
        if (searchpro && searchpro.isDeleted == true) {
            res.status(404).send({ isSuccess: false, msg: "Product not found" });
        } else {
            searchpro.productname = obj.productname ? obj.productname : searchpro.productname
            searchpro.cost = obj.cost ? obj.cost : searchpro.cost
            searchpro.discription = obj.discription ? obj.discription : searchpro.discription
            product.push(searchpro)
            console.log("product", product)
            res.status(200).send({
                msg: "product Update Successfully"
            })
            console.log(searchpro)
        }
    } catch (error) {
        res.status(500).send(error)
    }
   

})
app.delete('/deleteproduct', (req, res) => {
    try {
        let id = req.query.id
        let indx = product.findIndex((val) => {
            val.id == id
        })
        product.splice(indx, 1)
        console.log(product)
    } catch (error) {
        res.status(500).send(error)
    }
   

})
app.put("/softDelete", (req, res) => {
    try {
        let id = req.query.id;
        let ind = product.findIndex((fld) => {
            if (fld.id == id) {
                return true
            }
        });
        product[ind].isDeleted = true;
        res.status(200).send({ isSuccess: true, id: ind })
    } catch (error) {
        res.status(500).send(error)
        
    }
   
})



app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log("server running on "+process.env.PORT)
    }
});