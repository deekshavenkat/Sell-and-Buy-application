

// new file -- sellAndBuy.js


const e = require("express")
const express = require("express");
const SellBuy = require("../mongoose/models/sellBuy")

// setting up the router

const sellAndBuyRouter = new express.Router();

// code goes here for routes
sellAndBuyRouter.get('/sellProduct', (req, res) => {
    if (!req.query.product && !req.query.sortBy) {
        SellBuy.find()
            .then((resp) => {
                res.status(200).json(resp)


            }).catch((error) => {
                res.status(400).json({
                    error: error
                })


            })


    }
    else if (req.query.product) {
        SellBuy.find({ productName: req.query.product })
            .then((resp) => {
                res.status(200).json(resp)
            })
            .catch((error) => {
                res.status(400).json({
                    error: error
                })
            })
    }
    else if (req.query.sortBy === "lowerCostPrice") {
        SellBuy.find().sort({ costPrice: 1 })
            .then((resp) => {
                res.status(200).json(resp)
            })
            .catch((error) => {
                res.status(400).json({
                    error: error
                })
            })
    }
    else if (req.query.sortBy === "higherCostPrice") {
        SellBuy.find().sort({ costPrice: -1 })
            .then((resp) => {
                res.status(200).json(resp)
            })
            .catch((err) => {
                res.status(400).json({
                    error: error
                })
            })
    }

    else if (req.query.sortBy === "higherSoldPrice") {
        SellBuy.find().sort({ soldPrice: -1 })
            .then((resp) => {
                res.status(200).json(resp)
            })
            .catch((err) => {
                res.status(400).json({
                    error: error
                })
            })
    }
    else if (req.query.sortBy === "lowerSoldPrice") {
        SellBuy.find().sort({ soldPrice: 1 })
            .then((resp) => {
                res.status(200).json(resp)
            })
            .catch((err) => {
                res.status(400).json({
                    error: error
                })
            })
    }


})

sellAndBuyRouter.delete("/sellProduct/:id", (req, res) => {
    SellBuy.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: "Deleted successfully"
            })
        }).catch((error) => {
            res.status(400).json({
                error: error
            })
        })
})

sellAndBuyRouter.post("/sellProduct", (req, res) => {
    const sellbuy = new SellBuy({
        productName: req.body.productName,
        costPrice: req.body.costPrice
    })
    sellbuy.save().then(() => {
        res.status(201).json({
            message: "Product Added"
        })
    })
        .catch((error) => {
            res.status(400).json({
                error: error.message
            })
        })
})


sellAndBuyRouter.patch("/sellProduct/:id", (req, res) => {
    const id = req.params.id
    SellBuy.findByIdAndUpdate(id, { soldPrice: req.body.soldPrice }, { new: true, runValidators: true })
        .then((resp) => {
            res.status(200).json({
                message: "Updated Successfully"
            })
        })
        .catch((error) => {


            res.status(400).json({
                error: error.message
            })
        })
})
// exporting the router

module.exports = sellAndBuyRouter;
