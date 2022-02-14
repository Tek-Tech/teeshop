
const DeeBee = require('@tek-tech/deebee')
const path = require('path')
const classespath = path.join(__dirname,"..","classes")
const learningpath = path.join(__dirname,"..","learn")
const TeeShopObject = require(path.join(classespath,"TeeShopObject"))
const tableData = require(path.join(learningpath,'tbs'))

class TeeData extends DeeBee{

    static tableData = tableData

    static knownTables = {}


    static _n_t(){
        return this.knownTables
    }

    static _tables(){
      
        return Object.keys(this.tableData).map(
            tablename=>{
                const table = this.Builder._table(...this.tableData[tablename])
                this.knownTables[tablename] = table
                return table
            }    
        )
    } 

    configureActions(...actions){
        actions.forEach(
            ({name,cb})=>{
                this._____registerAction(
                    name,cb
                )
            }
        )
    }

    constructor(creds={},tables=[]){
        super(creds,tables.length?tables:TeeData._tables()?TeeData._tables():[])
        Object.assign(this, new TeeShopObject({},{}))
    }

}
module.exports = TeeData