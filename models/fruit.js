module.exports=(sequelize,DataTypes)=>{
    const fruit=sequelize.define("fruit",{
        fruitName:{
            type:DataTypes.STRING, 
            allowNull:false,
            unique: true,
            validate:{
                notEmpty:true,
                isAlpha:true
            }
        },
        fruitImageURL:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        fruitVitamin:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        fruitAvailability:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    });
    return fruit;
}