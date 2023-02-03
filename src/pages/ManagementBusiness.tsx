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
import { findAllClients_thunk } from '../store/users/thunks';
import { userFoundedReducer } from '../store/users/usersSlice';
import { findAllBusiness_thunk } from '../store/business/thunks';

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
    const { user } = useSelector((state: any) => state.auth);
    const { allBusiness } = useSelector((state: any) => state.business);

    useEffect(() => {
        // if( allProjectsByUserId.length > 0 ) return;

        dispatch( findAllBusiness_thunk() );
    }, []);

    const rows: Business[] = allBusiness.map((business: Business) => {
        return createRow(
            business.id,
            business.businessName,
            business.createdAt,
        );
    });
    // console.log(rows)
    console.log('business: ', allBusiness)

    return (
        <MainLayout>
            <h1>Gestionar Negocios</h1>

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
                rowsPerPageOptions={[5, 15, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </MainLayout>
    );
}
