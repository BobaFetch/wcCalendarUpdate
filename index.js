const sql = require('mssql')
const config = require('./config')

const wcArray = require('./wcData')

async function updateWcCalendar(wc) {
    let startDate = new Date('2022-04-20');
    const endDate = new Date('2025-01-01');

    await sql.connect(config).then(() => console.log(`Starting ${wc}`))

    while (startDate < endDate) {
        if (startDate.getDay() === 0 || startDate.getDay() === 6) {
            await sql.query(`UPDATE WcclTable 
            SET 
              WCCSHH1=0, 
              WCCSHH2=0, 
              WCCSHR1=0, 
              WCCSHR2=0 
            FROM WcclTable JOIN WcntTable t2 ON WCNREF=WCCCENTER WHERE WCCCENTER = '${wc}' AND WCCDATE = CAST('${startDate.toLocaleDateString()}' AS smalldatetime)`)
        } else {
            await sql.query(`
            UPDATE WcclTable 
            SET 
            WCCSHH1=t2.WCNMONHR1, 
            WCCSHH2=t2.WCNMONHR2, 
            WCCSHR1=t2.WCNMONMU1, 
            WCCSHR2=t2.WCNMONMU2 
            FROM WcclTable JOIN WcntTable t2 ON WCNREF=WCCCENTER WHERE WCCCENTER = '${wc}' AND WCCDATE = CAST('${startDate.toLocaleDateString()}' AS smalldatetime)`)
        }
        startDate.setDate(startDate.getDate() + 1);
    }
    console.log(`${wc} done...`)
} 

async function updateAll() {
    for(let i = 0; i < wcArray.length; i++) {
        await(updateWcCalendar(wcArray[i]))
    }
    console.log('Done')
}

updateAll()