import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: "100%",
                    marginBottom: "10px",
                    backgroundColor: "white",
                    borderRadius: "4px"
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    width: "100%",
                    marginBottom: "10px",
                    backgroundColor: "white",
                    borderRadius: "4px"
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: "white"
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    width: "100%"
                }
            }
        }
    }
});

export default theme;