(async()=>{
       
    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('user_test' , 'root' , 'ahj52777' , {
        host : '150.158.157.98',
        dialect : 'mysql'
    })
    // 定义模型 
    const Player = await sequelize.define('players' , {
        name : Sequelize.STRING
    },{
        timestamps : false
    })

    const Team =  await sequelize.define('teams' , {
        name : Sequelize.STRING
    },{
        timestamps : false
    })


    // 建立关系  

    // 1 : n    一个队员 只属于一个队
    // n : 1     一个队里面包含多个队员
    Player.belongsTo(Team)
    Team.hasMany(Player)
        await sequelize.sync({
        force : true
    })





    await Team.create({
        name : '火箭'
    })

    await Player.bulkCreate([
        {
             name : '哈登',
             teamId : 1
        },
        {
            name : '保罗',
            teamId : 1
        }
    ])
    //  关联查询 
    const players = await Player.findAll({
        include : [Team]
    })
    console.log(JSON.stringify(players , null , 2 ))


    const teams = await Team.findOne({
        where : {
            name : '火箭'
        },
        include : [Player]
    })
    console.log(JSON.stringify(teams , null , 2 ))
})()