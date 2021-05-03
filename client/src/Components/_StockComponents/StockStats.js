/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import { loadAllMouvement } from '../../services/Stock'
import { filtercChartDataVente, filterChartDataDate } from '../../Utils/Stock'
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/grid';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);



function StockStats(props) {
  const [dates,setDates]=useState([])
  console.log(props.idP);
  const [data,setData]=useState()
  
  
  function DateFormatter(dates){
    var array=[];
    dates.forEach(element =>{
    array.push(element.toISOString().split('T')[0]);
    })
      return array;
  }

  useEffect(async () => {
      
            setDates(await filterChartDataDate())
         await   loadAllMouvement(props.idP).then( (res) =>{
              setData(res.data)
              
          }) 
        
                    
  }, [])




    return (
        <div>
      <Dialog
       fullScreen
        fullWidth={true}
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.handleOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          <Grid container>
            <Grid item xs={8}>
              <Typography style={{display:"inline"}}>Statistique : Quantité vendu</Typography> 
            </Grid>
            <Grid item xs={4}>
              <Typography style={{display:"inline", textAlign:'right'}}>{props.libelle}</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <center>
             <Bar width={100}
                  height={300}
                    data={{
                            labels: DateFormatter(dates),
                            datasets: [{
                                label: '',
                                data: filtercChartDataVente(data,dates),
                                     backgroundColor: [
                                          
                                          'rgba(54, 162, 235, 0.2)',
                                          
                                        ],
                                    borderColor: [
                                       
                                        'rgb(54, 162, 235)',
                                      
                                    ],
                            borderWidth: 1
                            }]
                    }}
	                options={{ 
                        maintainAspectRatio: false ,
                        scales: {
                            xAxes: [{
                                ticks: {
                                    autoSkip: false,
                                    maxRotation: 90,
                                    minRotation: -90,
                                }
                            }],
                            yAxes: [{
                                suggestedMin: 50,
                            
                            }]
                        }
                            }}/>
       </center>
          <br></br>
          <br></br>
          <br></br>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center", height: "5em" }}>
          <Button
            variant="contained"
            autoFocus
            onClick={props.handleClose}
            color="primary"
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}

export default StockStats
