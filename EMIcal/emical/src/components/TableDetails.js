import React, { useState } from 'react'
import {Table,TableCell,TableHead,TableRow} from '@material-ui/core';

const TableDetails=(props)=> {
  const {int,setInt} = props
  const inputHandler =(e)=>{
    const {name,value} = e.target
    setInt({
        ...int,
        [name]:value
    })
}

  return (
   <Table style={{width:'100%',border:'2px solid #ccc'}} arial-label="simple table">
    <TableHead>
        <TableRow>
            <TableCell className='EtableCellText'><strong>Loan Amount</strong></TableCell>
            <TableCell className='ETableCellVal'><strong>₹</strong><input name="loanAmount" value={int.loanAmount} onChange={inputHandler}/></TableCell>
        </TableRow>
        <TableRow>
            <TableCell className='EtableCellText'><strong>Interest</strong></TableCell>
            <TableCell className='ETableCellVal'><strong>₹</strong>{props.interest}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className='EtableCellText'><strong>Tenure(Months)</strong></TableCell>
            <TableCell className='ETableCellVal'>{props.duration}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className='EtableCellText'><strong>EMI(Monthly)</strong></TableCell>
            <TableCell className='ETableCellVal'><strong>₹</strong>{props.emi}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className='EtableCellText'><strong>Total Interest</strong></TableCell>
            <TableCell className='ETableCellVal'><strong>₹</strong>{props.TotalAmountOfInterest}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell className='EtableCellText'><strong>Total Payment</strong><br/>(Loan Amount + Interest)</TableCell>
            <TableCell className='ETableCellVal'><strong>₹</strong>{props.totalAmt ? props.totalAmt : 0}</TableCell>
        </TableRow>
    </TableHead>
   </Table>
  )
}

export default TableDetails;