import React, { } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; 
import {  Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useLeads } from "../hooks/adminPage/useLeads"; 

const internalLeadsPage: React.FC = () => {

  const {
    leads,
    search,
    statusFilter,
    handleSearch,
    handleStatusFilter,
    updateLeadState,
  } = useLeads();

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#fff" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          background: "linear-gradient(137deg, #ecfea1 0%, #fff 30%)",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid #eaeaea",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 10, color: "#000"}}
          >

          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, mt: 2 ,fontFamily:"sans-serif"}}>
            almǎ
          </Typography>
            
          </Typography>
          <Button
            variant="text"
            sx={{
              display: "block",
              mb: 1,
              color: "#000",
              justifyContent: "flex-start",
            }}
          >
           <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2,textTransform: "none"  }}>
          Leads
        </Typography>

          </Button>
          <Button
            variant="text"
            sx={{
              display: "block",
              color: "#000",
              justifyContent: "flex-start",
              textTransform: "none" ,
              fontSize: "17px",
              fontFamily: 'Noto Sans, sans-serif'
            }}
          >
            Settings
          </Button>
        </Box>
              <Box sx={{ display: "flex", alignItems: "center",position: "fixed", bottom: 20, left: 20,  }}>
        <Avatar sx={{ bgcolor: "#f0f0f0", color: "#000", width: 40, height: 40, fontSize: 16,mb:2,ml:1 }}>
          A
        </Avatar>
        <Button 
          variant="text" 
          sx={{ color: "#000", fontWeight: "bold", fontSize: "17px", ml:1,mb:2 ,textTransform: "none",fontFamily: 'Poppins, sans-serif' }}
              >
                Admin
            </Button>
         </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3, backgroundColor: "#fff" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2,mt: 2,fontFamily: 'Poppins, sans-serif' }}>
          Leads
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            alignItems: "center",
            maxWidth: 500,
          }}
        >
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearch}
            sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px', color: 'grey' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#bbb' }} />
                      </InputAdornment>
                    ),
                  }}

          />
          <Select
            value={statusFilter}
            onChange={handleStatusFilter}
            displayEmpty
            size="small"
            sx={{ minWidth: 120, color:'#bbb' }}
          >
            
            <MenuItem value="">Status</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="REACHED_OUT">Reached Out</MenuItem>
            
          </Select>

        </Box>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                
                <TableCell sx={{ fontWeight: "normal",fontSize:"17px" }}>
                  <Box sx={{ display: "inline-flex", alignItems: "center", color:'#bbb'}}>
                    Name <ArrowDropDownIcon fontSize="small" />
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: "normal",fontSize:"17px"  }}>
                  <Box sx={{ display: "inline-flex", alignItems: "center", color:'#bbb' }}>
                    Submitted <ArrowDropDownIcon fontSize="small" />
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: "normal",fontSize:"17px"  }}>
                  <Box sx={{ display: "inline-flex", alignItems: "center" , color:'#bbb'}}>
                    Status <ArrowDropDownIcon fontSize="small" />
                  </Box>
                </TableCell>
                <TableCell sx={{fontWeight: "normal",fontSize:"17px"  }}>
                  <Box sx={{ display: "inline-flex", alignItems: "center", color:'#bbb' }}>
                    Country <ArrowDropDownIcon fontSize="small" />
                  </Box>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} hover>
                <TableCell>{`${lead.firstName} ${lead.lastName}`}</TableCell>
                <TableCell>{lead.submittedAt}</TableCell>
                <TableCell>{lead.state}</TableCell>
                <TableCell>{lead.countryOfCitizenship}</TableCell>
                <TableCell>
                  {lead.state === "PENDING" && (
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                      }}
                      size="small"
                      onClick={() => updateLeadState(lead.id)}
                    >
                      Mark as Reached Out
                    </Button>
                  )}
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      
                <Box sx={{ display: "flex", justifyContent: "flex-end ", mt: 2, alignItems: "center",   position: "fixed", bottom: 40, right: 40, }}>
          <IconButton size="small" disabled>
            <NavigateBeforeIcon />
          </IconButton>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" size="small" sx={{ fontWeight: "bold", border: "1px solid black" ,color:"black"}}>
              1
            </Button>
            <Button variant="text" size="small" sx={{ color: "black" }}>
              2
            </Button>
            <Button variant="text" size="small" sx={{ color: "black" }}>
              3
            </Button>
          </Box>

          <IconButton size="small">
            <NavigateNextIcon />
          </IconButton>
          </Box>
      </Box>
    </Box>
  );
};

export default internalLeadsPage;
