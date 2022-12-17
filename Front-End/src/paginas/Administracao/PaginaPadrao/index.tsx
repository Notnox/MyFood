import { AppBar, Container, Toolbar, Typography, Box, Button, Paper, TextField, Link } from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";

const PaginaPadrao = () => {
    return (
        <>
            <AppBar position='static'>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{display: 'flex', flexGrow: 1}}>
                            <Link component={RouterLink} to='/admin/restaurantes'>
                                <Button sx={{mv: 2, color: 'white'}}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/restaurantes/novo'>
                                <Button sx={{mv: 2, color: 'white'}}>
                                    Novo restaurante
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container 
                    maxWidth='lg'
                    sx={{mt: 1}}
                >
                    <Paper sx={{p:2}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                            <Outlet />
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default PaginaPadrao;