
import mongoose from "mongoose"; 

const connectTodb = async () =>{

    mongoose.connection.on('connected', ()=>{
        console.log("DB Connected Successfully..")
    }) ;

    await mongoose.connect(`mongodb+srv://tt8826981_db_user:Arslan786@cluster0.pmy3k3m.mongodb.net/`) ;

}

export default connectTodb ;
