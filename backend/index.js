import myapp from "./app.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 5000;
const connection_string =
  "mongodb+srv://waqar:1234@form-validation-cluster.xlc7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connection_string,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>
{
    myapp.listen(PORT,()=>
    {
        console.log(`server is runnning on port ${PORT}`)
    })
}).catch((error)=>
{
    console.log(error.message);
});
