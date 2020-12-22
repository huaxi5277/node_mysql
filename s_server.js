// sequelize 练习 

const { where } = require('sequelize');

(async ()=>{
    const Sequelize = require('sequelize')

    // 建立连接 
    
    const sequelize = new Sequelize("user_test" , 'root' , 'ahj52777', {
        host : '150.158.157.98',
        dialect : 'mysql', // 方言
    })

    // 定义模型
    const Fruit = sequelize.define('Fruit' , {
        id : {
           type : Sequelize.DataTypes.UUID,
           defaultValue : Sequelize.DataTypes.UUIDV1,
           primaryKey : true
        },
        name : {
            type : Sequelize.STRING(20) , allowNull : false,
             get() {     // 类似与对象set 和 get 
                const fname = this.getDataValue("name");
                const price = this.getDataValue("price");
                const stock = this.getDataValue("stock");
                return `${fname}(价格：￥${price} 库存：${stock}kg)`;
            }
        },
        price : {
            type : Sequelize.FLOAT , allowNull : false,
            validate : {
                isFloat : {
                    msg : '价格字段请输入浮点数'
                },
                min : {
                    args : [0],
                    msg : '价格字段必须大于0'
                }
            }
        },
        stock : {
            type : Sequelize.INTEGER, defaultValue : 0
        }
    } , {
        timestamps : false,    // 避免自动生成时间戳
        tableName : 'fruits',
        getterMethods : {
            amount(){
                return this.getDataValue("stock") + "kg"
            }
        },
        setterMethods : {
            amount(val){
            const index = val.indexOf('kg')
            const v = val.slice(0,index)
            this.setDataValue('stock' , v)
            }
        }
    })


    // 定义模型 同步数据库 
    // 创建表会自动创建主键，默认为 id
    // 强制同步 创建表之前 先删除存在的表
    let ret = await Fruit.sync({force : true}) 
     
    // 添加一条数据
    ret = await Fruit.create({
        name : '香蕉',
        price : 3.5
    })
    ret = await Fruit.create({
        name : '苹果',
        price : 10
    })
    ret = await Fruit.create({
        name : '鸭梨',
        price : 2
    })
        await Fruit.update({
        price : 5
    }, {where : {name : '香蕉'}})
    // 查找全部数据
    // ret = await Fruit.findAll()
    // console.log(ret)
    // Fruit.findAll().then((ret)=>{
    //     const [fruit] = ret
    //     fruit.amount = '150kg'
    //     fruit.save()
    // })
    // Fruit.findOne({where : {name : '香蕉'}}).then((result)=>{
    //     console.log(result.get())     // 拿出当前的对象 
    // })
    
    // 查询操作符
    const Op = Sequelize.Op
    Fruit.findAll({
        where : {
            price : {
                [Op.or] : [{[Op.lt] : 6} , {[Op.gt] : 1}]
            }
        }
    }).then((result)=>{
        console.log(result)
    })
})()