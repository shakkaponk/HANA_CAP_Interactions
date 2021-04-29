const cds = require('@sap/cds')
module.exports = cds.service.impl(function () {
   this.on('sleep', async () => {
       try {
            const db = await cds.connect.to('db')
            const dbClass = require("sap-hdbext-promisfied")
            let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials))
            const hdbext = require("@sap/hdbext")
            const sp = await dbConn.loadProcedurePromisified(hdbext, null, 'sleep')
            const output = await dbConn.callProcedurePromisified(sp, [])
            console.log(output.results)
            return true
       } catch (error) {
            console.error(error)
            return false
       }
    })
})