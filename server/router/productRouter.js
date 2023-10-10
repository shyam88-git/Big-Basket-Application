const express=require('express');

const router=express.Router();
const Product=require('../models/Product');
/*USAGE:GET ALL THE PRODUCTS
  URL:http://127.0.0.1:5000/api/products
  REQUEST:GET
  METHOD:router.get()
  FIELDS:no-fields*/

  router.get('/products',async(request,response)=>{

    try{

        let products=await Product.find();
        response.status(200).json(products);

    }
    catch(error){

        console.error(error);
        response.status(500).json({

            error :error.message
        });
    }

});

       


  /** USAGE:GET SINGLE PRODUCTS
   * URL:http://127.0.0.1:5000/api/products/:id
   * REQUEST:GET
   * METHOD:router.get()
   */

  router.get('/products/:id',async(request,response)=>{

    let productId=request.params.id;
    try{

        let products=await Product.findById(productId);
        response.status(200).json(products);
    }
    catch(error){
        console.error(error);
        response.status(500).json({

            error:error.message
        });
    }
    
  });

  /** USAGE:CREATE A PRODUCT
   *  URL:http://127.0.0.1:5000/api/products
   *  REQUEST:POST
   *  METHOD:router.post()
   * FIELDS:name,image,price,qty,info
   */
   router.post('/products',async(request,response)=>{
    let newProduct={
        name:request.body.name,
        image:request.body.image,
        price:request.body.price,
        qty:request.body.qty,
        info:request.body.info


    };
    try{
        //if already exits
        let product=await Product.findOne({name:newProduct.name});
        if(product){
            return response.status(401).json({
                msg:'Product is alredy exits'
            });


        }

        //save to database
        product=new Product(newProduct);
        product=await product.save();

        response.status(200).json({

            result:'Product Creation Success',
            product:product
        });

        
    }
    catch(error){

        console.error(error);
        response.status(500).json({

            error:  error.message
        });


    }

   });

   /**USAGE:UPDATE A PRODUCT
    * URL:htpp://127.0.0.1:5000/api/products:/id
    * REQUEST:PUT
    * METHOD:router.put()
    * FIELDS:name,image,price,qty,info
    */
    router.put('/products/:id',async(request,response)=>{

        let productId=request.params.id;
        let updateProduct={
            name:request.body.name,
            image:request.body.image,
            price:request.body.price,
            qty:request.body.qty,
            info:request.body.info

        };

        try{
            //aready exits
            let product=await Product.findById(productId);
            if(!product){

                return response.status(401).json({
                    msg:'Product is not available'
                });
            }
            //update to database
            product =await Product.findByIdAndUpdate(productId,{

                $set: updateProduct
            },{new:true});

            response.status(200).json({

                result:'Product update is success',
                product:product

            })

        }
       catch(error){

        console.error(error);
        response.status(500).json({
            error:error.message
        });
       }

    });

    /**
     * USAGE:DELETE A PRODUCT
     * URL:http:/127.0.0.1:5000/api/products:/id
     * REQUEST:delete
     * METHOD:router.delete()
     * FIELDS:no-fields
     */

     router.delete('/products/:id',async(request,response)=>{

        let productId=request.params.id;
        try{

            //product is already exits

            let product=await Product.findById(productId);
            if(!product){

                return response.status(401).json({

                    msg:'Product is not exits',
                    
                });
            }
            //delete the database
            product=await Product.findByIdAndDelete(productId);
            response.status(200).json({
                result:'Product Deletion is success',
                product:product
            });
        }
        catch(error){

            console.error(error);
            response.status(500).json({
                error: error.message
            });

        }
        
     });



  module.exports=router;