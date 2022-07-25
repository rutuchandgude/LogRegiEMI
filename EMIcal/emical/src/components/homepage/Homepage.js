import React,{useState} from "react"
import "./Homepage.css"
import {withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {Table,TableCell,TableRow} from '@material-ui/core';
import {Pie} from 'react-chartjs-2';
import TableDetails from "../TableDetails"; 
import SlideMarks from "../../SlideMark";


const PrettoSlider = withStyles({
    root : {color:'MediumVioletRed',height:10},
    thumb:{height:25, width:25,backgroundColor:'white',border:'3px solid black',marginTop:-9,marginLeft:-9},
    track:{height:10,borderRadius:4},
    rail:{height:10,borderRadius:4},
})(Slider);

const Homepage = ({setLoginUser}) =>{



    const [int,setInt] =useState(
        {
            loanAmount:2755000,
            interest : 7, 
            duration : 147,
        }
    )

   
    const maxValue = 6000000;
    const intMax = 20;
    const maxDuration = 360;

  
    const intr = int.interest/1200;
    const emi = int.duration ? Math.round(int.loanAmount * intr /(1-(Math.pow(1/(1+intr),int.duration)))) : 0;
    const totalAmt = int.duration * emi;
    var TotalAmountOfCredit = Math.round((emi/intr) * (1- Math.pow((1+intr), (-int.duration))));
    const TotalAmountOfInterest = Math.round(totalAmt - TotalAmountOfCredit);

    
    return( 
        <>
        <div className="homepage">
            
            <div className="App">
            
                <div className="CalApp">
                  <h2 className="CalHandling"><u>EMI Calculator</u></h2>
                  <div>
                  <h4><strong>Loan Amount</strong></h4>    
                  <PrettoSlider value={int.loanAmount} marks={SlideMarks.marksAmt} onChange={(event,vAmt)=>{
                        setInt({
                            ...int,
                           "loanAmount":vAmt
                        })
                    }} defaultValue={int.loanAmount} max ={maxValue}></PrettoSlider>
                  </div>
                  <div>
                    <h4><strong>Interest Rate</strong></h4>
                    <PrettoSlider value={int.interest} marks={SlideMarks.marksInt} onChange={(event,vInt)=>{
                          setInt({
                            ...int,
                           "interest":vInt
                        })
                    } } max={intMax} defaultValue={int.interest}></PrettoSlider>
                  </div>
                  <div>
                    <h4><strong>Tenure (Months)</strong></h4>
                    <PrettoSlider value={int.duration} marks={SlideMarks.marksTenure} onChange={(event,vDur) =>{
                          setInt({
                            ...int,
                           "duration":vDur
                        })
                    }} max={maxDuration} defaultValue={int.duration}></PrettoSlider>
                  </div>
                 
                
               <Table>
            
                <TableRow>
                <TableCell>
                    <TableDetails int={int} setInt={setInt} loanAmount={int.loanAmount} interest={int.interest} duration={int.duration} emi={emi} TotalAmountOfInterest={TotalAmountOfInterest} totalAmt={totalAmt}></TableDetails>
                </TableCell>
                <TableCell>
                    <Pie 
                     data = {{
                        labels : ['Total interest','Total Amount'],
                        datasets : [{
                            data : [TotalAmountOfInterest,int.loanAmount],
                            backgroundColor : ['red','green']
                        }]
                     }}
                     width={20}
                     height={20}
                    />
                </TableCell>
                </TableRow>
               </Table>
               
               <div className="button" onClick={() => setLoginUser({})}>Logout</div>
            </div>
            </div>
                    
        </div>
      
        </>
    )
}

export default Homepage;
