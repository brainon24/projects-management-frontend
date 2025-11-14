import { Box } from '@mui/material';
import { Spinner } from './Loading';


export const Loading100p = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            <Spinner spinnerSize={25} />
        </Box>
    );
}
