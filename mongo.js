class mongoOps{
    constructor(){
        console.log('Mongo object made')
        var mongodb = require('mongodb')
        var MongoClient = mongodb.MongoClient;
        var uri = "mongodb+srv://express-auto:MsuUN9cQNABB6ey@cluster0.rl6rx.mongodb.net/testdb?retryWrites=true&w=majority";
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    async login(data){
        var q = 0
        try {
            console.log('Login called with data: ',data)
            await this.client.connect();
            console.log('Mongodb connected')
            q = await this.client.db('testdb').collection('login').findOne(data)
            console.log('Result:\n',q)
        } catch (e) {
            console.error(e);            
        } finally {
            await this.client.close();
            console.log('Login connection closed')
        }
        return q
    }
    async register(data){        
        console.log('Register called with data: ',data)
        await this.client.connect();
        console.log('Mongodb connected')
        var q = await this.client.db('testdb').collection('login').insertOne(data)
        console.log('Result:\n',q)  
        return q['ops']      
    }
}

// export {mongoOps}
module.exports = mongoOps