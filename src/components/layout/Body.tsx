import { ReactNode } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

interface BodyProps {
  children: ReactNode;
}

const Body = (props: BodyProps) => {
  const { children } = props;

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CIN Validator
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {children}
    </div>
  );
};

export default Body;
