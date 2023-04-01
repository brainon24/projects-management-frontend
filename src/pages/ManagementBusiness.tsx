import { useState, useEffect } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { findAllBusiness_thunk } from '../store/business/thunks';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoAddCircleOutline } from 'react-icons/io5'
import { FormModal } from '../components/FormModal';
import { openModal } from '../store/ui/uiSlice';
import { SuccessModal } from '../components/SuccessModal';
import Loading from '../components/Loading';

interface Column {
    id: 'id' | 'businessName' | 'createdAt';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
  }
  
  const columns: readonly Column[] = [
    { id: 'id', label: 'ID del Negocio', minWidth: 170 },
    { id: 'businessName', label: 'Nombre del Negocio', minWidth: 200 },
    {
      id: 'createdAt',
      label: 'Registro en la plataforma',
      minWidth: 200,
      align: 'left',
    },
  ];
  
  interface Business {
    id: string,
    businessName: string,
    createdAt: any;
  }
  
  const eventDate = (year: any, month: any, day: any) => new Date(year, month - 1, day);
  const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  function createRow(
    id: string,
    businessName: string,
    createdAt: any,
  ): Business {
        return {
            id,
            businessName,
            createdAt: eventDate(new Date(createdAt).getFullYear(), new Date(createdAt).getMonth() + 1, new Date(createdAt).getDate()).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(new Date(createdAt).getFullYear(), new Date(createdAt).getMonth() + 1, new Date(createdAt).getDate()).toLocaleDateString('es-ES', options).slice(1),
        };
  }

export const ManagementBusiness = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10); 
    
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const dispatch = useDispatch();
    const { allBusiness, isRequestSuccess, textRequestSuccess, isLoadingBusiness } = useSelector((state: any) => state.business);
    const { isOpenModal } = useSelector((state: any) => state.ui);

    useEffect(() => {
        // if( allProjectsByUserId.length > 0 ) return;

        dispatch( findAllBusiness_thunk() );
    }, [ isRequestSuccess ]);

    const rows: Business[] = allBusiness.map((business: Business) => {
        return createRow(
            business.id,
            business.businessName,
            business.createdAt,
        );
    });

    if( isLoadingBusiness ) return <Loading />

    return (
        <MainLayout>
            { isOpenModal && <FormModal /> }
            { isRequestSuccess && <SuccessModal textRequestSuccess={ textRequestSuccess } /> }
            
            <Box style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Box
                    component='section'
                    style={{
                        margin: '20px 0',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Link to='/private/administrative-managment' style={{
                        fontSize: 25, 
                        marginRight: 15, 
                        marginTop: 6
                    }}>
                        <AiOutlineArrowLeft />
                    </Link>
                    <h1>Gestionar Negocios</h1>
                </Box>

                <button 
                    style={{
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: 6,
                        cursor: 'pointer',
                        backgroundColor: '#1259c3',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10
                    }}
                    onClick={ () => dispatch(openModal()) }
                >
                    Crear Negocio
                    <IoAddCircleOutline fontSize={18} />
                </button>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        // .filter((user) => user.fullName.includes('D')) //TODO: Filters
                        .map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column: Column) => {
                                const value = row[column.id];
                                return (
                                <TableCell 
                                    key={column.id} 
                                    align={column.align} 
                                    // onClick={() => handleUserModal(row)}
                                    style={{
                                    cursor: 'pointer'
                                    }}
                                >
                                    {value}
                                </TableCell>
                                );
                            })}
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Filas por página"
                />
            </Paper>
        </MainLayout>
    );
}
