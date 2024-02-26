import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

interface Props {
  primary: string;
  secondary?: string;
  icon: React.ReactNode;
}
export const ListItemButtonWithIcon = ({ primary, secondary, icon }: Props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <Grid container>
          <ListItemText primary={primary} />
          {secondary && <ListItemText secondary={secondary} />}
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
