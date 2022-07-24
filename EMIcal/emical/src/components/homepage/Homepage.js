import React,{useState} from "react"
import "./Homepage.css"
import {withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
// import { Typography } from "@material-ui/core/Typography";
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


    const [pAmount,setpAmount] = useState(2755000);
    const [interest,setinterest] = useState(7);
    const[duration,setDuration] = useState(147);
    const maxValue = 6000000;
    const intMax = 20;
    const maxDuration = 360;

    const intr = interest/1200;
    const emi = duration ? Math.round(pAmount * intr /(1-(Math.pow(1/(1+intr),duration)))) : 0;
    const totalAmt = duration * emi;
    var TotalAmountOfCredit = Math.round((emi/intr) * (1- Math.pow((1+intr), (-duration))));
    const TotalAmountOfInterest = Math.round(totalAmt - TotalAmountOfCredit);

    const [int,setInt] =useState({loanAmount:pAmount})
    return(
        <>
        <div className="homepage">
            <div className="App">
                <div className="CalApp">
                  <h2 className="CalHandling"><u>EMI Calculator</u></h2>
                  <div>
                  <h4><strong>Loan Amount</strong></h4>    
                  <PrettoSlider value={pAmount} marks={SlideMarks.marksAmt} onChange={(event,vAmt)=>{setpAmount(vAmt)}} defaultValue={pAmount} max ={maxValue}></PrettoSlider>
                  </div>
                  <div>
                    <h4><strong>Interest Rate%</strong></h4>
                    <PrettoSlider value={interest} marks={SlideMarks.marksInt} onChange={(event,vInt)=>{setinterest(vInt);}} max={intMax} defaultValue={interest}></PrettoSlider>
                  </div>
                  <div>
                    <h4><strong>Tenure (Months)</strong></h4>
                    <PrettoSlider value={duration} marks={SlideMarks.marksTenure} onChange={(event,vDur) =>{setDuration(vDur);}} max={maxDuration} defaultValue={duration}></PrettoSlider>
                  </div>
                 
                
               <Table>
                <TableRow>
                <TableCell>
                    <TableDetails int={int} setInt={setInt} pAmount={pAmount} totalAmt={totalAmt} interest={interest} duration={duration} emi={emi} TotalAmountOfInterest={TotalAmountOfInterest}></TableDetails>
                </TableCell>
                <TableCell>
                    <Pie 
                     data = {{
                        labels : ['Total Interest','Total Amount'],
                        datasets : [{
                            data : [TotalAmountOfInterest,pAmount],
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
