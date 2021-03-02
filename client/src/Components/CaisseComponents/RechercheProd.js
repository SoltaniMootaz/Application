import React from 'react'
import { Image} from 'react-bootstrap'
import def from './img/def.jpg'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
function RechercheProd(props) {
  const article = props.chercherDans.filter(
    (art) =>
      art.libelle.toLowerCase().indexOf(props.value) > -1  );
  console.log(article);
  const classes = useStyles();
  var src = def;

  const isSRC = (data) => {
    if (data == null) {
      return true;
    } else return false;
  };
  const handleClick=(a)=>
  {
      //if(!array.includes(a)) {
          props.handleTicketClick(a);
      //}
  }

    return (
        <>   <div className={classes.root} style={{marginLeft:'3em'}}>
        <Grid container spacing={3}>
                    {article.map((data1,index)=>{
                           return( 
                            <div key={index} >                    
                            <Grid item xs={6} sm={3} style={{padding:'1em'}}>
                        
                                     <div>
                                           
       
                                     <div className="card"  style={{ width: '14rem' ,border:'0px'}} onClick={()=>handleClick(article[index],index)}>
                                    <img alt="Avatar"  as={Image} variant="top" src={isSRC(data1.image) ? src: data1.image} className='border-bottom border-dark'  style={{height:'150px'}} />
                                    <div className="container">
                                        <h4><b><center>{data1.libelle}</center></b></h4> 
                                       
                                    </div>
                                    </div>
               
                                    </div> 
                
                        
                     </Grid></div>
                      )
                          }
                 )         
            } 
            </Grid>
        </div>
        </>
    )
}

export default RechercheProd;
