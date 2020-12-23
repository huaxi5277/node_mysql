

(async ()=>{

    const Sequelize = require('sequelize')
    const sequelize = new Sequelize("user_test" , "root" , "ahj52777" , {
        host : '150.158.157.98',
        dialect : "mysql"
    })


   // 水果
    const Fruit = await sequelize.define('fruits' , {
        name : Sequelize.STRING
    },{
        timestamps : false
    })
    // 种类 
    const Category = await sequelize.define('categories' , {
        name : Sequelize.STRING
    },{
        timestamps : false
    })
    // n:n 关系 通过  FruitCategory 建立连接 
    Fruit.FruitCategory = Fruit.belongsToMany(Category, {
        through: "FruitCategory"
    });

    await  sequelize.sync({
        force : true
    })

    await Fruit.create(
        {
            name: "香蕉",
            categories: [{ id: 1, name: "热带" }, { id: 2, name: "温带" },{id : 3  , name : '寒带'}]
        },
        {
            include: [Fruit.FruitCategory]
        }
    );
     


    await Fruit.findOne({
        where: { name: "香蕉" }, // 通过through指定条件、字段等
        // include: [{ model: Category, through: { attributes: ['id', 'name'] } }]
         include : [{model : Category}]
    }).then((result)=>{
        console.log(JSON.stringify(result , null  , 2 ))
    })


})()