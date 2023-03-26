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
import {UserModal} from '../components/UserModal';
import { userFoundedReducer } from '../store/users/usersSlice';
import Loading from '../components/Loading';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface Column {
  id: '_id' | 'fullName' | 'phone' | 'role' | 'email' | 'businessName' | 'businessId' | 'createdAt';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
  { id: '_id', label: 'ID del Usuario', minWidth: 170 },
  { id: 'fullName', label: 'Nombre Completo', minWidth: 100 },
  {
    id: 'phone',
    label: 'Celular',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'email',
    label: 'Correo Electrónico',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'role',
    label: 'Rol',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'businessName',
    label: 'Nombre de la Empresa',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'businessId',
    label: 'ID de la Empresa',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'createdAt',
    label: 'Fecha de Registro',
    minWidth: 170,
    align: 'left',
  },
];

interface User {
  _id: string;
  fullName: string;
  phone: number;
  email: string;
  role: string;
  businessName: string,
  businessId: string,
  // profilePicture: string;
  // businessId: {
  //   businessName: string,
  //   createdAt: Date,
  //   updatedAt: Date,
  //   id: string
  // }
  createdAt: any;
}

const eventDate = (year: any, month: any, day: any) => new Date(year, month - 1, day);
const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function createRow(
  _id: string,
  fullName: string,
  phone: number,
  email: string,
  role: string,
  // profilePicture: string,
  businessName: string,
  businessId: any,
  createdAt: Date, 
): User {
  return {
    _id,
    fullName,
    phone,
    email,
    role,
    // profilePicture,
    businessName: businessId.businessName,
    businessId: businessId.id,
    createdAt: eventDate(new Date(createdAt).getFullYear(), new Date(createdAt).getMonth() + 1, new Date(createdAt).getDate()).toLocaleDateString('es-ES', options).slice(0, 1).toUpperCase() + eventDate(new Date(createdAt).getFullYear(), new Date(createdAt).getMonth() + 1, new Date(createdAt).getDate()).toLocaleDateString('es-ES', options).slice(1),
  };
}

export const ManagementAccounts = () => {
  
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
  const { mUsers, mUser, isLoadingUsers } = useSelector((state: any) => state.users);

  const handleUserModal = (user: any) => {
    dispatch( userFoundedReducer(user) );
  }

  useEffect(() => {
    // if( allProjectsByUserId.length > 0 ) return;

    dispatch( findAllClients_thunk() );
  }, []);

  const rows: User[] = mUsers.map((user: User) => {
    return createRow(
      user._id,
      user.fullName,
      user.phone,
      user.email,
      user.role,
      // user.profilePicture,
      user.businessName,
      user.businessId,
      user.createdAt,
    );
  });
  // console.log(rows)
  // console.log('mUser: ', mUser)

  return (
    <MainLayout>
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
        <h1>Gestion de Usuarios</h1>
      </Box>

      {
        mUser && <UserModal user={ mUser } />
      }
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column: Column) => {
                        const value = row[column.id];
                        return (
                          <TableCell 
                            key={column.id} 
                            align={column.align} 
                            onClick={() => handleUserModal(row)}
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
          labelRowsPerPage='Filas por página'
          rowsPerPageOptions={[5, 10, 25, 50,]}
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
