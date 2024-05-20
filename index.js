let testEmployee = ["Gray", "Worm", "Security", 1];

function createEmployeeRecord(details) {
  let employeeDetails = new Object();
  employeeDetails.firstName = details[0];
  employeeDetails.familyName = details[1];
  employeeDetails.title = details[2];
  employeeDetails.payPerHour = details[3];
  employeeDetails.timeInEvents = [];
  employeeDetails.timeOutEvents =[];
  //console.log(employeeDetails)  
  return employeeDetails
}

function createEmployeeRecords(testEmployees){
    let testEmployeesCount = testEmployees.length
    let fullRecords =[]
    for(let i=0; i<testEmployeesCount; i++){
        let employeeRecord = createEmployeeRecord(testEmployees[i])
       fullRecords.push(employeeRecord)
                
    }
    return fullRecords
};

function createTimeInEvent(record, date){
    let clockIn = new Object();
    clockIn.type = "TimeIn"
    let tempDate = Array.from(date)
    let splitDate = [...tempDate]
    clockIn.hour = parseInt(splitDate.slice(11,15).join(""))
    clockIn.date = (splitDate.slice(0,10).join(""))
    record.timeInEvents.push(clockIn)
    return record
}
function createTimeOutEvent(record, date){
    let clockOut = new Object();
    clockOut.type = "TimeOut"
    let tempDate = Array.from(date)
    let splitDate = [...tempDate]
    clockOut.hour = parseInt(splitDate.slice(11,15).join(""))
    clockOut.date = (splitDate.slice(0,10).join(""))
    record.timeOutEvents.push(clockOut)
    return record
    
}

function hoursWorkedOnDate(record, date) {
    let hoursWorked = 0;
    let timeInDate = record.timeInEvents.find(obj => obj.date === date);
    let timeOutDate = record.timeOutEvents.find(obj => obj.date === date);
    let timeInHour = 0
    let timeOutHour = 0
  
    if (timeInDate && timeOutDate) {
      timeOutHour = parseInt(timeOutDate.hour.toString().replace(/0+$/, ''));
      timeInHour = parseInt(timeInDate.hour.toString().replace(/0+$/, ''));
      hoursWorked = timeOutHour - timeInHour ;
      return hoursWorked;
    }
  
    return hoursWorked;
  }

function wagesEarnedOnDate(record, date) {
    let hoursWorked  = hoursWorkedOnDate(record, date)
    let dailyPay = 0
    dailyPay = hoursWorked * record.payPerHour
    
    return dailyPay

}


function allWagesFor(record){
    let allWagesTotal = 0 
    
    for (let i=0; i<record.timeInEvents.length; i++){
        let date = record.timeInEvents[i].date
        let allWages = wagesEarnedOnDate(record, date)
        allWagesTotal += allWages                
    }
    return allWagesTotal


}

function calculatePayroll(records) {
    let allWagesTotal = 0 
    //iterate over each employee
    for (let i=0; i<records.length; i++){
        let employee = records[i]
        //iterate over that employees timeStamps
        for(let j = 0; j<employee.timeInEvents.length; j++){
        let date = employee.timeInEvents[j].date
        let allWages = wagesEarnedOnDate(employee,date)
        allWagesTotal += allWages
        console.log(allWagesTotal)
        console.log(i)
        console.log(j)
        debugger                 
        }
    
    }
    return allWagesTotal
   

}

const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

  
  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-01 2300", "2018-01-02 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ]


  


        let employeeRecords = createEmployeeRecords(csvDataEmployees)
        employeeRecords.forEach(function (rec) {
          let timesInRecordRow = csvTimesIn.find(function (row) {
            return rec.firstName === row[0]
          })

          let timesOutRecordRow = csvTimesOut.find(function (row) {
            return rec.firstName === row[0]
          })

          timesInRecordRow[1].forEach(function(timeInStamp){
            createTimeInEvent(rec, timeInStamp)
          })

          timesOutRecordRow[1].forEach(function(timeOutStamp){
            createTimeOutEvent(rec, timeOutStamp)
          })
        })
        calculatePayroll(employeeRecords)
   