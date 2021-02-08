import { useMemo } from 'react'
import { useState } from 'react'
import useTimestamp from '../../lib/useTimestamp'

const { getDate } = useTimestamp()

// const calledDate = called && showDate && calledAt && getDate(calledAt)
let calledDate 
let calledDates = []

let existenceDates = []
let amountDates = []
let allDates = {}

let date 

let amount

export default function Progress({numbersArr}) {

  // const [statistics, setStatistics] = useState({value: []})
 
  // numbersArr.map( row => (
    
  //   calledDate = row.calledAt && row.called &&  getDate(row.calledAt),
  //   // console.log(row.calledAt),
  //   console.log(calledDate),
  //   console.log(typeof(statistics.value)),
  //   // calledDate && setStatistics(statistics.push(calledDate)),
  //   console.log(statistics.value)
  //   // console.log(calledDate, row)
  //   // if(calledDate){

  //   //   statistics.push(calledDate)

  //   // }

  // ))
  

    // existenceDates.map( row => {   
    
      // amount = numbersArr.filter(number => number.calledAt && number.called)
      
      // for (let index = 0; index < existenceDates.length; index++) {
        
      //   const element = array[index];
        
      // }

      // amountDates.push(row)
        
    // })



    
    // array.map( row => (
    
    //   console.log(row.length)
      
    // ))

    // console.log(array)
  // const calledDate = called && showDate && calledAt && getDate(calledAt)
  // console.log(numbersArr.creatAt)
  // console.log(calledDate)

  const calledNumbers = useMemo(() => {
    return numbersArr.filter(number => number.called).length
  }, [numbersArr])

  const calledData = useMemo(() => {
    existenceDates= []
    allDates= {}
    calledDates = numbersArr.filter(number => number.calledAt && number.called)
    calledDates.map( row => {   

    date = existenceDates.indexOf( getDate(row.calledAt) )

    // allDates.push(getDate(row.calledAt))

    if( date == -1){

      existenceDates.push(getDate(row.calledAt))

      allDates[getDate(row.calledAt)]  =  1     

      // console.log( existenceDates.indexOf( getDate(row.calledAt) )
      console.log( date )

    }   else{

      allDates[getDate(row.calledAt)] =  allDates[getDate(row.calledAt)] + 1

    }
    
    console.log(allDates)      
    console.log(existenceDates)   
      
     
    })
    return {allDates,  existenceDates }
    
  }, [numbersArr])

  console.log(calledData)

  return (
    <div className="fixed w-full bottom-0 left-0">
      <div className="max-w-lg w-full mx-auto bg-blue-500 h-15 text-white flex items-center justify-center md:rounded-t-lg">
      
        Avance: {calledNumbers} de {numbersArr.length}
        
        <br />
        <br />
        Estadísticas
        
        {
            calledData.existenceDates.map( row => {                

              return <div>{row}:   {calledData.allDates[row]}</div>
                         
          })
        }

      </div>
            
    </div>
  )
  
}