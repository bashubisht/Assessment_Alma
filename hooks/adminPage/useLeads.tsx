import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material/Select";

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  submittedAt: string;
  state: string;
  countryOfCitizenship: string;
}

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Fetch leads on component mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get<Lead[]>("api/leads");
        setLeads(response.data);
        setFilteredLeads(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchLeads();
  }, []);

  // Handle input changes for searching
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    filterLeads(query, statusFilter);
  };

  // Handle select changes for filtering by status
  const handleStatusFilter = (e: SelectChangeEvent<string>) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterLeads(search, status);
  };

  // Filter leads whenever search or status changes
  const filterLeads = (searchQuery: string, status: string) => {
    let newFilteredLeads = leads;

    // Filter by search query
    if (searchQuery) {
      newFilteredLeads = newFilteredLeads.filter(
        (lead) =>
          lead.firstName.toLowerCase().includes(searchQuery) ||
          lead.lastName.toLowerCase().includes(searchQuery)
      );
    }

    // Filter by status
    if (status) {
      newFilteredLeads = newFilteredLeads.filter(
        (lead) => lead.state === status
      );
    }

    setFilteredLeads(newFilteredLeads);
  };

  // Update a lead's state 
  const updateLeadState = async (id: string) => {
    try {
 
      const response = await axios.put<{ state: string }>("api/leads", {
        id,
        state: "REACHED_OUT",
      });

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === id ? { ...lead, state: response.data.state } : lead
        )
      );

      setFilteredLeads((prevFiltered) =>
        prevFiltered.map((lead) =>
          lead.id === id ? { ...lead, state: response.data.state } : lead
        )
      );
    } catch (error) {
      console.error("Error updating lead state:", error);
    }
  };

  return {
    leads: filteredLeads,
    allLeads: leads,     
    search,
    statusFilter,
    handleSearch,
    handleStatusFilter,
    updateLeadState,
    
  };
};
