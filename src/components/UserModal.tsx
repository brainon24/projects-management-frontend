import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, Slide, MenuItem } from '@mui/material';
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { clearUserReducer } from "../store/users/usersSlice";

// export default function UserModal({ user }: any) {
//   const [open, setOpen] = useState(true);

//     const typeDocuments = [
//         "USER",
//         "CLIENT",
//         "EMPLOYEE",
//         "ADMIN",
//     ];

//     const [typeDoc, setTypeDoc] = useState(user.role);

//     const onTypeDocumentChanged = (event: any) => { 
//         setTypeDoc(event.target.value);
//     };
        
//     const dispatch = useDispatch();

//     const handleClose = () => {
//         setOpen(false);
        
//         dispatch( clearUserReducer() );
//     };

//     console.log(user)

//     return (
//         <div 
//             style={{
//                 paddingTop: 15
//             }}
//         >
//             <Dialog 
//                 open={open} 
//                 onClose={handleClose} 
//                 sx={{ backdropFilter: 'blur(3px)', bgcolor: 'rgba(0,0,0, 0.2)', paddingX: 100 }}
//             >
//                 <Box 
//                     sx={{ 
//                         textAlign: 'center', 
//                     }}
//                 >
//                     <DialogTitle>Actualizar Rol del Usuario</DialogTitle>
//                     <DialogContent sx={{ 
//                             padding: '20px 100px', 
//                         }}>
//                         <DialogContentText>
//                             {user.fullName} - {user.businessName}
//                         </DialogContentText>

//                         <Grid item xs={12} style={{
//                             width: '100%',
//                             paddingTop: 15
//                         }}>
//                             <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
//                                 <InputLabel id="demo-simple-select-label">{ typeDoc }</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={typeDoc}
//                                     label="Tipo documento"
//                                     onChange={onTypeDocumentChanged}
//                                     color='info'
                                    
//                                 >
//                                     {
//                                         typeDocuments.map(typeDocument => (
//                                             <MenuItem
//                                                 key={typeDocument}
//                                                 value={typeDocument}
//                                             >
//                                                 {typeDocument}
//                                             </MenuItem>
//                                         ))
//                                     }
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleClose}>Cancelar</Button>
//                         <Button onClick={handleClose}>Guardar</Button>
//                     </DialogActions>
//                 </Box>
//             </Dialog>
//         </div>
//     );
// }

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  
export const UserModal = ({ user }: any) => {
  
    const [open, setOpen] = React.useState(true);

    const typeDocuments = [
        "USER",
        "CLIENT",
        "EMPLOYEE",
        "ADMIN",
    ];

    const [typeDoc, setTypeDoc] = React.useState(user.role);

    const onTypeDocumentChanged = (event: any) => { 
        setTypeDoc(event.target.value);
    };
        
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        
        dispatch( clearUserReducer() );
    };

    console.log(user)
  
      const eventDate = (year: any, month: any, day: any) => new Date(Date.UTC(year, month - 1, day));
      const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
      // console.log(eventDate(2022, 12, 21).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(2022, 12, 21).toLocaleDateString('es-ES', options).slice(1));
  
      const { createdAt } = user;
      const year = new Date(createdAt).getFullYear();
      const month = new Date(createdAt).getMonth() + 1;
      const day = new Date(createdAt).getDate();
      // console.log(day + ' ' + month + ' ' + year)
  
      // console.log(eventDate(year, month, day).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(year, month, day).toLocaleDateString('es-ES', options).slice(1));
  
      return (
          <div>
              <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                  sx={{ backdropFilter: 'blur(3px)', bgcolor: 'rgba(0,0,0, 0.2)' }}
              >
                  <Box
                      sx={{ 
                          textAlign: 'center', 
                          margin: '10px 30px' 
                      }}
                  >
                      {/* <Box style={{
                          backgroundColor: 'var(--green)',
                          borderRadius: '100%',
                          width: 35,
                          height: 35,
                          margin: '30px auto 10px',
                          display: 'flex',                        
                      }}>
                          <Box style={{
                              margin: '8.5px auto',
                          }}>
                              <FiCheck style={{
                                  color: '#fff',
                              }} />
                          </Box>
                      </Box> */}
                      <DialogTitle
                          sx={{
                              color: 'var(--dark)',
                              fontWeight: 600
                          }}
                      >
                          { user.fullName }
                      </DialogTitle>
  
                      <DialogContent
                          sx={{ 
                              margin: '20px 0', 
                          }}
                      >
                          <DialogContentText
                              id="alert-dialog-slide-description"
                              style={{
                                  textAlign: 'center',
                                  fontSize: 13,
                                  paddingBottom: 15
                              }}
                          >
                              Rol Actual.
                          </DialogContentText>
                          <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                 <InputLabel id="demo-simple-select-label">{ typeDoc }</InputLabel>
                                 <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={typeDoc}
                                    label="Tipo documento"
                                    onChange={onTypeDocumentChanged}
                                    color='info'
                                    
                                >
                                    {
                                        typeDocuments.map(typeDocument => (
                                            <MenuItem
                                                key={typeDocument}
                                                value={typeDocument}
                                            >
                                                {typeDocument}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                      </DialogContent>
  
                      <DialogActions>
                          <button 
                              onClick={handleClose}
                              style={{
                                  padding: '8px 20px',
                                  borderRadius: 6,
                                  border: 'none',
                                  backgroundColor: 'var(--blue)',
                                  color: 'var(--white)',
                                  cursor: 'pointer',
                              }}
                          >
                              Continuar
                          </button>
                      </DialogActions>
                  </Box>
              </Dialog>
          </div>
      );
  }